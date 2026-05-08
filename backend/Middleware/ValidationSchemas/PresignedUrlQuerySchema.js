export const PresignedUrlQuerySchema = {
  trim: true,
  contentType: {
    in: ["query"],
    notEmpty: {
      errorMessage: "El contentType es obligatorio",
    },
    isIn: {
      options: [["image/jpeg", "image/png", "image/webp"]],
      errorMessage:
        "El contentType debe ser image/jpeg, image/png o image/webp",
    },
  },
};
