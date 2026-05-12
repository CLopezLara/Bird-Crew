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

  
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY no configurado");
      return res
        .status(500)
        .json({ message: "❌ Error de configuración del servidor" });
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
        .json({ message: "❌ Verificación de reCAPTCHA fallida" });
    }

    
    let transporter;
    try {
      transporter = createTransporter();
    } catch (Error) {
      console.error("Error al crear transporter:", Error.message);
      return res
        .status(500)
        .json({ message: "❌ Error de configuración del servidor de email" });
    }

    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Nuevo cliente de BirdCrew Website",
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


    try {
      await transporter.sendMail(ownerMailOptions);
      console.log("Email enviado al propietario exitosamente");
    } catch (Error) {
      console.error("Error enviando email al propietario:", Error.message);
      throw new Error(
        `Error al enviar email al propietario: ${Error.message}`,
      );
    }

    try {
      await transporter.sendMail(clientMailOptions);
      console.log("Email enviado al cliente exitosamente");
    } catch (Error) {
      console.error("Error enviando email al cliente:", Error.message);
      throw new Error(
        `Error al enviar email al cliente: ${Error.message}`,
      );
    }

    res.status(200).json({ message: "✅ Mensaje enviado exitosamente" });
  } catch (error) {
    console.error("Error en SendContactEmail:", error.message || error);
    res.status(500).json({ message: "❌ Error al enviar el mensaje" });
  }
};
export default SendContactEmail;
