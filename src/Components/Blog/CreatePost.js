import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import "../../Styles/Blog/CreatePost.css";
import { useForm } from "react-hook-form";
import {
  getPutPresignedUrl,
  savePost,
  uploadImage,
} from "../Services/postServices";
import { useQuill } from "../Hooks/useQuill";
function CreatePost() {
  const [content, setContent] = useState("");
  const [delta, setDelta] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const { editor, quill } = useQuill({
    onChange: ({ html, delta }) => {
      setContent(html);
      setDelta(delta);
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await getPutPresignedUrl(data.image[0]);
      await uploadImage(res.presignedUrl, data.image[0]);
      const formData = {
        ...data,
        content,
        delta: JSON.stringify(delta),
        image_url: res.publicUrl,
        image_key: res.key,
      };

      const postRes = await savePost(formData);
      setMessage(postRes.message);
      reset();
      quill.current.setContents([]);
      setError([]);
      setTimeout(() => {
        setMessage("");
      }, 8000);
    } catch (error) {
      setError(error.errors);
    }
  };

  return (
    <main className="create-post-page">
      <header>
        <h1 className="title">Crear publicación</h1>
      </header>
      {message && <span className="success-message">{message}</span>}
      {error &&
        error.map((e, i) => (
          <span key={i} className="validationerror">
            {e}
          </span>
        ))}
      <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
        <section className="form-section">
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
        </section>

        <section className="form-section">
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
        </section>

        <section className="form-section">
          <label className="image_label" htmlFor="image">
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
          </div>
        </section>

        <section className="form-section">
          <label className="content_label">Contenido:</label>
          <div ref={editor} className="editor" />
        </section>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          Publicar
        </button>
      </form>
    </main>
  );
}

export default CreatePost;
