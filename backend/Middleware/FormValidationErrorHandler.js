import { validationResult } from "express-validator";

export const ErrorHandler = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);
  if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped();
    const errorArray = Object.values(mappedErrors);
    return res.status(400).json({
      success: false,
      message: "Errores de validación",
      errors: errorArray,
    });
  }
  next();
};
