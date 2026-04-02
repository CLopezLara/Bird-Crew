export const PostValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "El título es obligatorio",
    },
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
    notEmpty: {
      errorMessage: "El autor es obligatorio",
    },
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
    custom: {
      options: (_, { req }) => {
        const delta = JSON.parse(req.body.delta || "{}");
        return delta.ops && delta.ops.some((op) => op.insert.trim() !== "");
      },
      errorMessage: "El contenido es obligatorio",
    },
  },
};
