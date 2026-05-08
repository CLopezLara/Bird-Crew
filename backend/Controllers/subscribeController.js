import { subscribeUser, unsubscribeUser } from "../Models/SubscribeModel.js";

export const subscribe = async (req, res) => {
  const { id } = req.body;

  const result = await subscribeUser(id);
  if (!result) {
    return res.status(200).json({ message: "Ya estaba suscrito" });
  }

  return res.status(201).json({ message: "Suscrito correctamente" });
};

export const unsubscribe = async (req, res) => {
  const { id } = req.body;

  const result = await unsubscribeUser(id);
  if (!result) {
    res.status(200).json({ message: "Usuario ya estaba desuscrito" });
  }
  res.status(201).json({ message: "Desuscrito correctamente" });
};
