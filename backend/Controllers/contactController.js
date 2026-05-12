import axios from "axios";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    const ownerMailOptions = {
      to: process.env.EMAIL_USER,
      from: { email: process.env.EMAIL_USER, name: "Bird Crew" },
      subject: "Nuevo cliente de BirdCrew Website",
      replyTo: email,
      html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h1>Nuevo cliente potencial</h1>

                <hr />

                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Empresa:</strong> ${empresa}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>¿Cómo nos encontraste?:</strong> ${comoNosEncontraste}</p>
                <p><strong>Gasto en Marketing Mensual:</strong> ${gastoMarketing}</p>
                <p><strong>Sitio Web y Redes Sociales:</strong> ${sitioWebRedesSociales}</p>
                <p><strong>Horario de Comunicación:</strong> ${horarioComunicacion}</p>

                <hr />

                <p>Formulario enviado desde Bird Crew Website.</p>
              </div>
              `,
    };

    const clientMailOptions = {
      to: email,
      from: { email: process.env.EMAIL_USER, name: "Bird Crew" },
      replyTo: process.env.EMAIL_USER,
      subject: "Formulario de contacto recibido - Bird Crew",
      html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Hola ${nombre},</h2>
              <p>Gracias por contactarnos. Hemos recibido tu información y nos pondremos en contacto contigo pronto.</p>
              <p>Nuestro equipo revisará tu solicitud y te responderá en un plazo de 48 horas.</p>
              <br>
              <p>Saludos cordiales,<br><strong>El equipo de Bird Crew</strong></p>
            </div>
         `,
    };

    (async () => {
      try {
        await sgMail.send(ownerMailOptions);
        await sgMail.send(clientMailOptions);
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    })();

    res.status(200).json({ message: "✅ Mensaje enviado exitosamente" });
  } catch (error) {
    console.error("Error en SendContactEmail:", error.message || error);
    res.status(500).json({ message: "❌ Error al enviar el mensaje" });
  }
};
export default SendContactEmail;
