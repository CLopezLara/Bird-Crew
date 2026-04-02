export const FormValidationSchema = {
  nombre: {
    notEmpty: {
      errorMessage: "El nombre es obligatorio",
    },
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: "El nombre debe tener entre 5 y 25 caracteres",
    },
    matches: {
      options: [/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "i"],
      errorMessage: "El nombre solo puede contener letras y espacios",
    },
    trim: true,
  },
  email: {
    notEmpty: {
      errorMessage: "El email es obligatorio",
    },
    isEmail: {
      options: {
        allow_underscores: true,
      },
      errorMessage: "Debe ser un email válido",
    },
    isLength: {
      options: { max: 60 },
      errorMessage: "El email no puede exceder 60 caracteres",
    },
    toLowerCase: true,
    normalizeEmail: true,
    trim: true,
  },
  empresa: {
    notEmpty: {
      errorMessage: "La empresa es obligatoria",
    },
    isLength: {
      options: { min: 2, max: 25 },
      errorMessage: "La empresa debe tener entre 2 y 25 caracteres",
    },
    matches: {
      options: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
      errorMessage: "La empresa solo puede contener letras, números y espacios",
    },
    trim: true,
  },
  telefono: {
    notEmpty: {
      errorMessage: "El teléfono es obligatorio",
    },
    isLength: {
      options: { min: 10, max: 10 },
      errorMessage: "El teléfono debe tener exactamente 10 dígitos",
    },
    matches: {
      options: /^\d{10}$/,
      errorMessage: "El teléfono solo puede contener números (10 dígitos)",
    },
    trim: true,
  },
  comoNosEncontraste: {
    notEmpty: {
      errorMessage: "Este campo es obligatorio",
    },
    isLength: {
      options: { min: 5, max: 40 },
      errorMessage: "Debe tener entre 5 y 40 caracteres",
    },
    matches: {
      options: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      errorMessage: "Solo puede contener letras y espacios",
    },
    trim: true,
  },
  gastoMarketing: {
    notEmpty: {
      errorMessage: "El gasto en marketing es obligatorio",
    },
    isLength: {
      options: { min: 5, max: 15 },
      errorMessage: "Debe tener entre 5 y 15 caracteres",
    },
    matches: {
      options: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
      errorMessage: "Solo puede contener letras, números y espacios",
    },
    trim: true,
  },
  sitioWebRedesSociales: {
    notEmpty: {
      errorMessage: "La URL del sitio web es obligatoria",
    },
    isURL: {
      options: {
        protocols: ["http", "https"],
        require_protocol: true,
        allow_underscores: true,
        allow_trailing_dot: false,
        require_tld: true,
        allow_query_components: true,
        allow_fragments: true,
      },
      errorMessage: "Debe ser una URL válida (http/https, con dominio completo, sin punto al final)",
    },
    isLength: {
      options: { min: 5, max: 2048 },
      errorMessage: "La URL debe tener entre 5 y 2048 caracteres",
    },
    trim: true,
  },
  horarioComunicacion: {
    notEmpty: {
      errorMessage: "El horario de comunicación es obligatorio",
    },
    isIn: {
      options: [
        [
          "8:00 Am",
          "8:30 Am",
          "9:00 Am",
          "9:30 Am",
          "10:00 Am",
          "10:30 Am",
          "11:00 Am",
          "11:30 Am",
          "12:00 Pm",
          "12:30 Pm",
          "01:00 Pm",
          "01:30 Pm",
          "02:00 Pm",
          "02:30 Pm",
          "03:00 Pm",
          "03:30 Pm",
          "04:00 Pm",
          "04:30 Pm",
          "05:00 Pm",
          "05:30 Pm",
          "06:00 Pm",
          "06:30 Pm",
        ],
      ],
      errorMessage: "Debe seleccionar un horario válido de la lista",
    },
  },
};
