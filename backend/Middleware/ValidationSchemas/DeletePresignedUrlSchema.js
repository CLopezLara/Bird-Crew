import validator from "validator";
export const DeletePresignedUrlQuerySchema = {
  key: {
    in: ["query"],
    trim: true,
    notEmpty: {
      errorMessage: "El key es obligatorio",
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
  },
};
