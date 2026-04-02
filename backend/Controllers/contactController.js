import createTransporter from "../Config/emailConfig.js";
import axios from "axios";

const SendContactEmail = async (req, res) => {
  try {
    const {
      nombre,
      email,
      empresa,
      telefono,
      comoNosEncontraste,
      gastoMarketing,
      sitioWebRedesSociales,
      horarioComunicacion,
      recaptchaToken,
    } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({ message: " reCAPTCHA es requerido" });
    }

    const recaptchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      },
    );

    if (!recaptchaResponse.data.success) {
      return res
        .status(400)
        .json({ message: " Verificación de reCAPTCHA fallida" });
    }
    const transporter = createTransporter();

    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New client BirdCrew Website",
      html: `
            <h1><strong>Datos de nuevo cliente</strong></h1>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Empresa:</strong> ${empresa}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>¿Cómo nos encontraste?:</strong> ${comoNosEncontraste}</p>
            <p><strong>Gasto en Marketing Mensual:</strong> ${gastoMarketing}</p>
            <p><strong>Sitio Web y Redes Sociales:</strong> ${sitioWebRedesSociales}</p>
            <p><strong>Horario de Comunicación:</strong> ${horarioComunicacion}</p>
        `,
    };

    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Formulario de contacto recibido - Bird Crew",
      html: `
            <h2>Hola ${nombre},</h2>
            <p>Gracias por contactarnos. Hemos recibido tu información y nos pondremos en contacto contigo pronto.</p>
            <p>Nuestro equipo revisará tu solicitud y te responderá en un plazo de 48 horas.</p>
            <br>
            <p>Saludos cordiales,<br><strong>El equipo de Bird Crew</strong></p>
         `,
    };
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(clientMailOptions);

    res.status(200).json({ message: "✅ Mensaje enviado exitosamente" });
  } catch (e) {
    res.status(500).json({ message: "❌ Error al enviar el mensaje" });
  }
};
export default SendContactEmail;
