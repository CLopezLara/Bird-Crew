import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../../Styles/Blog/CreatePost.css";
import { useForm } from "react-hook-form";

const SizeStyle = Quill.import("attributors/style/size");
const Custom_Font_Sizes = [
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "34px",
  "36px",
];

SizeStyle.whitelist = Custom_Font_Sizes;
Quill.register(SizeStyle, true);

function CreatePost() {
  const editor = useRef(null);
  const quill = useRef(null);
  const [content, setContent] = useState("");
  const [delta, setDelta] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const serverURL = process.env.REACT_APP_SERVER_URL;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = { ...data, content, delta: JSON.stringify(delta) };

    try {
      const res = await fetch(`${serverURL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const { message } = await res.json();
        setMessage(message);
        reset();
        quill.current.setContents([]);
        setError([]);
        setTimeout(() => {
          setMessage("");
        }, 8000);
      } else {
        const { errors } = await res.json();
        setError(errors);
      }
    } catch (error) {
      setError(["Error al crear la publicación. Inténtalo de nuevo."]);
    }
  };

  useEffect(() => {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "formula"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ size: Custom_Font_Sizes }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ];

    if (!editor.current || quill.current) {
      return;
    }

    quill.current = new Quill(editor.current, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "Escribe tu publicación aquí",
    });

    quill.current.on("text-change", () => {
      setContent(quill.current.getSemanticHTML());
      setDelta(quill.current.getContents());
    });
  }, []);

  return (
    <div className="create-post-page">
      <h1 className="title">Crear publicación</h1>
      {message && <span className="success-message">{message}</span>}
      {error &&
        error.map((e, i) => (
          <span key={i} className="validationerror">
            {e}
          </span>
        ))}
      <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="title_label" htmlFor="title">
          Título:
        </label>
        <div>
          <input
            id="title"
            type="text"
            placeholder="Escribe el título"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="error">El título es requerido</span>
          )}
        </div>
        <label className="author_label" htmlFor="author">
          Autor:
        </label>
        <div>
          <input
            id="author"
            type="text"
            placeholder="Escribe el autor"
            {...register("author", { required: true })}
          />
          {errors.author && (
            <span className="error">El autor es requerido</span>
          )}
        </div>

        {/*   <label className="image_label" htmlFor="image">
          Imagen:
        </label>
        <div>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <span className="error">La imagen es requerida</span>
          )}
        </div> */}

        <div>
          <div ref={editor} className="editor" />
        </div>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          Publicar
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
