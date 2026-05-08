import validator from "validator";
export const UpdatePostValidationSchema = {
  title: {
    optional: true,
    isLength: {
      options: { max: 150 },
      errorMessage: "El título no puede exceder 150 caracteres",
    },
    matches: {
      options: [/^[-A-Za-záéíóúüÁÉÍÓÚÜñÑ0-9\s,.:;?¡!¿]+$/],
      errorMessage:
        "El título solo puede contener letras, números, espacios y signos de puntuación",
    },
    trim: true,
  },
  author: {
    optional: true,
    isLength: {
      options: { max: 50 },
      errorMessage: "El autor no puede exceder 50 caracteres",
    },
    matches: {
      options: [/^[-A-Za-záéíóúüÁÉÍÓÚÜñÑ\s]+$/],
      errorMessage: "El autor solo puede contener letras y espacios",
    },
    trim: true,
  },
  content: {
    optional: true,
    custom: {
      options: (_, { req }) => {
        if (!req.body.delta) {
          throw new Error("Delta es obligatorio");
        }
        const delta = JSON.parse(req.body.delta);
        return delta.ops && delta.ops.some((op) => op.insert.trim() !== "");
      },
      errorMessage: "El contenido es obligatorio",
    },
  },
  image_url: {
    optional: true,
    isURL: {
      options: {
        protocols: ["http", "https"],
        require_protocol: true,
      },
      errorMessage: "La URL de la imagen no es válida",
    },
    custom: {
      options: (value) => {
        try {
          const url = new URL(value);
          const host = new URL(process.env.R2_PUBLIC_URL);
          if (url.origin !== host.origin) return false;

          const regex = /^\/posts\/[a-f0-9-]+\.(jpe?g|png|webp)$/;
          return regex.test(url.pathname);
        } catch (error) {
          return false;
        }
      },
      errorMessage: "La URL no es valida o no pertenece al bucket permitido",
    },
    trim: true,
  },
  image_key: {
    optional: true,
    isString: {
      errorMessage: "La clave de la imagen debe ser una cadena de texto",
    },
    matches: {
      options: [/^posts\/(.+)\.(jpe?g|png|webp)$/],
      errorMessage: "La clave de la imagen no es válida",
    },

    isLength: {
      options: { max: 255 },
      errorMessage: "La clave de la imagen no puede exceder 255 caracteres",
    },
    custom: {
      options: (value) => {
        const [, key] = value.split("/");
        const [uuid] = key.split(".");

        if (!validator.isUUID(uuid, 4)) {
          throw new Error("El UUID en la clave no es válido");
        }
        return true;
      },
    },
    trim: true,
  },
};
