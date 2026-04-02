import { useState } from "react";
import "../../Styles/Contact/Contact.css";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [Message, setMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [captchaToken, setCaptchaToken] = useState(null);
  const serverURL = process.env.REACT_APP_SERVER_URL;

  const onChange = (value) => {
    setCaptchaToken(value);
  };

  const onSubmit = async (data) => {
    if (!captchaToken) {
      setMessage(
        " Por favor, completa el reCAPTCHA antes de enviar el formulario.",
      );
      return;
    }
    const formData = { ...data, recaptchaToken: captchaToken };
    try {
      const res = await fetch(`${serverURL}/api/contact`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const { message } = res.json();
        reset();
        setMessage(message);
        setValidationErrors([]);
      } else {
        const { message, errors } = res.json();
        setMessage(message);
        setValidationErrors(errors || []);
      }
    } catch (error) {
      setMessage(
        " Error al enviar el formulario. Por favor, intenta de nuevo.",
      );
    }
  };

  return (
    <section className="Contact">
      <main className="contact_panel">
        <header className="contact-header">
          <h1>
            Obtén un Analisis de <br />
            Marketing Gratis
          </h1>
          <p>
            ¿Quieres saber qué podemos hacer por ti?
            <br />
            <br />
            Rellena el siguiente formulario y nos pondremos en contacto contigo
            en un <br />
            plazo de 48 horas para realizar un análisis gratuito.
            <br />
            <br />
            Sin costos, sin obligaciones, sin molestos argumentos de venta.
            <br />
            Garantizado.
          </p>
        </header>

        {(Message || validationErrors.length > 0) && (
          <aside className="messages">
            {Message && <p className="submit_message">{Message}</p>}
            {validationErrors.map((error, index) => (
              <p key={index} className="error">
                {error}
              </p>
            ))}
          </aside>
        )}

        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="personal-info-container">
            <legend>Información personal</legend>

            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                {...register("nombre", {
                  required: "This field is required",
                  minLength: {
                    value: 5,
                    message: "El nombre debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 25,
                    message: "El nombre debe tener como maximo 25 caracteres",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/i,
                    message: "El nombre solo puede contener letras y espacios",
                  },
                })}
                type="text"
              />
              {errors.nombre && (
                <span className="error">{errors.nombre.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                {...register("email", {
                  required: "This field is required",
                  maxLength: {
                    value: 60,
                    message: "El email debe tener como maximo 60 caracteres",
                  },
                })}
                type="email"
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="empresa">Empresa</label>
              <input
                id="empresa"
                {...register("empresa", {
                  required: "This field is required",
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 25,
                    message: "El nombre debe tener como maximo 25 caracteres",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
                    message:
                      "El nombre de la empresa solo puede contener letras, numeros y espacios",
                  },
                })}
                type="text"
              />
              {errors.empresa && (
                <span className="error">{errors.empresa.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="telefono">Teléfono</label>
              <input
                id="telefono"
                {...register("telefono", {
                  required: "This field is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message:
                      "El telefono requiere tener 10 digitos y solo puede contener numeros",
                  },
                })}
                type="tel"
                imputMode="numeric"
              />
              {errors.telefono && (
                <span className="error">{errors.telefono.message}</span>
              )}
            </div>
          </fieldset>

          <fieldset className="marketing-info">
            <legend className="sr-only">Datos de marketing</legend>

            <div>
              <label htmlFor="comoNosEncontraste">¿Cómo nos encontraste?</label>
              <input
                id="comoNosEncontraste"
                {...register("comoNosEncontraste", {
                  required: "This field is required",
                  minLength: {
                    value: 5,
                    message: "Debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 40,
                    message: "Debe tener como maximo 40 caracteres",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
                    message: "Solo puede contener letras, numeros y espacios",
                  },
                })}
                type="text"
              />
              {errors.comoNosEncontraste && (
                <span className="error">
                  {errors.comoNosEncontraste.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="gastoMarketing">
                ¿Cuánto gastas en marketing al mes?
              </label>
              <input
                id="gastoMarketing"
                {...register("gastoMarketing", {
                  required: "This field is required",
                  minLength: {
                    value: 5,
                    message: "Debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 15,
                    message: "Debe tener como maximo 15 caracteres",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
                    message: "Solo puede contener letras, numeros y espacios",
                  },
                })}
                type="text"
              />
              {errors.gastoMarketing && (
                <span className="error">{errors.gastoMarketing.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="sitioWebRedesSociales">
                ¿Cuál es tu sitio web/redes sociales? (Link)
              </label>
              <input
                id="sitioWebRedesSociales"
                {...register("sitioWebRedesSociales", {
                  required: "This field is required",
                  minLength: {
                    value: 5,
                    message: "Debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 2048,
                    message: "Debe tener como maximo 2048 caracteres",
                  },
                })}
                type="url"
              />
              {errors.sitioWebRedesSociales && (
                <span className="error">
                  {errors.sitioWebRedesSociales.message}
                </span>
              )}
            </div>
          </fieldset>

          <fieldset className="select_time">
            <legend>Horario de comunicación</legend>
            <label htmlFor="horarioComunicacion">
              ¿En qué horario nos podemos comunicar?
            </label>
            <select
              id="horarioComunicacion"
              {...register("horarioComunicacion", {
                required: "This field is required",
              })}
            >
              <option value="8:00 Am">8:00 Am</option>
              <option value="8:30 Am">8:30 Am</option>
              <option value="9:00 Am">9:00 Am</option>
              <option value="9:30 Am">9:30 Am</option>
              <option value="10:00 Am">10:00 Am</option>
              <option value="10:30 Am">10:30 Am</option>
              <option value="11:00 Am">11:00 Am</option>
              <option value="11:30 Am">11:30 Am</option>
              <option value="12:00 Pm">12:00 Pm</option>
              <option value="12:30 Pm">12:30 Pm</option>
              <option value="01:00 Pm">1:00 Pm</option>
              <option value="01:30 Pm">1:30 Pm</option>
              <option value="02:00 Pm">2:00 Pm</option>
              <option value="02:30 Pm">2:30 Pm</option>
              <option value="03:00 Pm">3:00 Pm</option>
              <option value="03:30 Pm">3:30 Pm</option>
              <option value="04:00 Pm">4:00 Pm</option>
              <option value="04:30 Pm">4:30 Pm</option>
              <option value="05:00 Pm">5:00 Pm</option>
              <option value="05:30 Pm">5:30 Pm</option>
              <option value="06:00 Pm">6:00 Pm</option>
              <option value="06:30 Pm">6:30 Pm</option>
            </select>
            {errors.horarioComunicacion && (
              <span className="error">
                {errors.horarioComunicacion.message}
              </span>
            )}
          </fieldset>

          <div className="FormSubmitSection">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              Enviar
            </button>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={onChange}
              className="captcha"
            />
          </div>
        </form>
      </main>
    </section>
  );
}

export default Contact;
