export const ParamsIDValidator = {
  id: {
    in: ["params"],
    isInt: {
      options: { min: 1 },
      errorMessage: "ID debe ser un entero",
    },
    toInt: true,
  },
};
