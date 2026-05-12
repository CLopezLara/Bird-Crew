import { getSubscribedUsers } from "../Models/SubscribeModel.js";
import sgMail from "@sendgrid/mail";
export const SendNotificationToSubscribers = async (title, id) => {
  try {
    const result = await getSubscribedUsers();

    const users = result;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await Promise.all(
      users.map((user) =>
        sgMail
          .send({
            from: { email: process.env.EMAIL_USER, name: "Bird Crew" },
            to: user.email,
            subject: "Nuevo post",
            html: `<h2> Acabamos de publicar un  nuevo post: ${title}</h2> 
                <p> Lee nuestro nuevo post haciendo click en el siguiente enlace : </p>
                <a href="${process.env.CLIENT_URL}/post/${id}" 
                style="
                  display: inline-block;
                  padding: 10px 16px;
                  background-color: #1a73e8;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: bold;
                "> Leer post</a>`,
          })
          .catch((err) => {
            console.warn("Error al mandar correo");
          }),
      ),
    );
  } catch (error) {
    console.warn("Error enviando notificaciones ");
  }
};
