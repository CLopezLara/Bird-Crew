import {
  config,
  buildAuthParams,
  getTokenParams,
  generateState,
  getCookieOptions,
  generateCSRFToken,
  getcsrfCookieOptions,
} from "../Config/Config.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import {
  generateRefreshToken,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
} from "../Models/RefreshTokenModel.js";
import { getUserById, upsertUser } from "../Models/UsersModel.js";

const client = new OAuth2Client(config.clientId);

export const authUrl = (req, res) => {
  const state = generateState();
  const stateToken = jwt.sign({ state }, config.tokenSecret, {
    expiresIn: 1000 * 60,
  });

  const authParams = buildAuthParams(stateToken);

  res.json({
    url: `${config.authUrl}?${authParams}`,
  });
};

export const authToken = async (req, res) => {
  const csrfToken = generateCSRFToken();
  const { code, state } = req.query;
  if (!code)
    return res
      .status(400)
      .json({ message: "Se debe proporcionar un codigo de autorizacion " });

  if (!state) {
    return res
      .status(400)
      .json({ message: "Parametro de estado no encontrado" });
  }

  try {
    jwt.verify(state, config.tokenSecret);
  } catch (err) {
    return res.status(400).json({ message: "Estado invalido o expirado" });
  }

  try {
    const tokenParam = getTokenParams(code);
    const {
      data: { id_token },
    } = await axios.post(config.tokenUrl, tokenParam, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!id_token)
      return res.status(400).json({ message: "ID token no encontrado" });

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: config.clientId,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    const dbUser = await upsertUser(email, name);

    const accessToken = jwt.sign(
      { userId: dbUser.id, email: dbUser.email, role: dbUser.role },
      config.tokenSecret,
      { expiresIn: config.accessTokenExpiration },
    );

    const refreshToken = generateRefreshToken();
    await saveRefreshToken(
      dbUser.id,
      refreshToken,
      config.refreshTokenExpiration,
    );

    res.cookie(
      "accessToken",
      accessToken,
      getCookieOptions(config.accessTokenExpiration),
    );
    res.cookie(
      "refreshToken",
      refreshToken,
      getCookieOptions(config.refreshTokenExpiration * 24 * 60 * 60 * 1000),
    );
    res.cookie("csrfToken", csrfToken, getcsrfCookieOptions());

    res.json({
      user: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        subscribed: dbUser.subscribed,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Fallo de autenticacion" });
  }
};

export const loggedIn = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    const csrfToken = generateCSRFToken();

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, config.tokenSecret);
        const user = await getUserById(decoded.userId);
        return res.json({
          loggedIn: true,
          user,
        });
      } catch (err) {
        console.warn("Token de acceso invalido o expirado");
      }
    }

    if (refreshToken) {
      const tokenData = await findRefreshToken(refreshToken);

      if (tokenData) {
        const newAccessToken = jwt.sign(
          {
            userId: tokenData.user_id,
            email: tokenData.email,
            role: tokenData.role,
          },
          config.tokenSecret,
          { expiresIn: config.accessTokenExpiration },
        );

        const newRefreshToken = generateRefreshToken();

        await deleteRefreshToken(refreshToken);

        await saveRefreshToken(
          tokenData.user_id,
          newRefreshToken,
          config.refreshTokenExpiration,
        );

        res.cookie(
          "accessToken",
          newAccessToken,
          getCookieOptions(config.accessTokenExpiration),
        );
        res.cookie(
          "refreshToken",
          newRefreshToken,
          getCookieOptions(config.refreshTokenExpiration * 24 * 60 * 60 * 1000),
        );
        res.cookie("csrfToken", csrfToken, getcsrfCookieOptions());

        return res.json({
          loggedIn: true,
          user: {
            id: tokenData.user_id,
            email: tokenData.email,
            name: tokenData.name,
            role: tokenData.role,
            subscribed: tokenData.subscribed,
          },
        });
      }
    }

    res.json({ loggedIn: false });
  } catch (err) {
    res.json({ loggedIn: false });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const csrfToken = generateCSRFToken();
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token no encontrado" });
    }

    const tokenData = await findRefreshToken(refreshToken);

    if (!tokenData) {
      return res.status(401).json({ message: "Refresh token no encontrado" });
    }

    const newAccessToken = jwt.sign(
      {
        userId: tokenData.user_id,
        email: tokenData.email,
        role: tokenData.role,
      },
      config.tokenSecret,
      { expiresIn: config.accessTokenExpiration },
    );

    const newRefreshToken = generateRefreshToken();

    await deleteRefreshToken(refreshToken);

    await saveRefreshToken(
      tokenData.user_id,
      newRefreshToken,
      config.refreshTokenExpiration,
    );

    res.cookie(
      "accessToken",
      newAccessToken,
      getCookieOptions(config.accessTokenExpiration),
    );
    res.cookie(
      "refreshToken",
      newRefreshToken,
      getCookieOptions(config.refreshTokenExpiration * 24 * 60 * 60 * 1000),
    );
    res.cookie("csrfToken", csrfToken, getcsrfCookieOptions());
    res.json({
      user: {
        id: tokenData.user_id,
        email: tokenData.email,
        name: tokenData.name,
        role: tokenData.role,
        subscribed: tokenData.subscribed,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener nuevo token" });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await deleteRefreshToken(refreshToken);
    }

    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      })
      .clearCookie("csrfToken", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      })
      .json({ message: "Sesion cerrada" });
  } catch (err) {
    res.status(500).json({ message: "Error al cerrar sesion" });
  }
};
