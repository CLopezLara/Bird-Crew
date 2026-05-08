import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import "../../Styles/Blog/CreatePost.css";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

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
import { useNavigate, useParams } from "react-router";
import {
  deleteImage,
  getDeletePresignedUrl,
  getPostById,
  getPutPresignedUrl,
  updatePost,
  uploadImage,
} from "../Services/postServices";

function EditPost() {
  const { id } = useParams();
  const editor = useRef(null);
  const quill = useRef(null);
  const [oldPost, setOldPost] = useState({});
  const [content, setContent] = useState("");
  const [delta, setDelta] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const update = {};

    if (data.image && data.image.length > 0) {
      try {
        const res = await getPutPresignedUrl(data.image[0]);
        await uploadImage(res.presignedUrl, data.image[0]);
        update.image_url = res.publicUrl;
        update.image_key = res.key;
      } catch (error) {
        setError(error.errors);
        return;
      }

      try {
        if (oldPost.image_url && oldPost.image_key) {
          const res = await getDeletePresignedUrl(oldPost.image_key);
          await deleteImage(res.presignedUrl);
        }
      } catch (error) {
        console.warn(error.errors);
      }
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
    const editedPost = {
      ...data,
      content,
      delta: JSON.stringify(delta),
    };

      ["clean"],
    ];
    if (editedPost.delta !== oldPost.delta) {
      update.content = editedPost.content;
      update.delta = editedPost.delta;
    }

    if (!editor.current || quill.current) {
    for (const key in editedPost) {
      if (key === "delta" || key === "content" || key === "image") continue;
      if (editedPost[key] !== oldPost[key] && editedPost[key]) {
        update[key] = editedPost[key];
      }
    }
    if (Object.keys(update).length === 0) {
      setError(["No se han detectado cambios"]);
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
    try {
      const res = await updatePost(id, update);
      setMessage(res.message);
      setTimeout(() => {
        setMessage("");
        navigate("/blog");
      }, 8000);
    } catch (error) {
      setError(error.errors);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    getPostById(id)
      .then((data) => {
        setOldPost(data);
        reset({
          title: data.title,
          author: data.author,
        });
        if (data.delta) {
          quill.current.setContents(JSON.parse(data.delta));
        }
      })
      .catch((error) => {
        setError(error.errors);
      });
  }, [id, quill, reset]);

  return (
    <main className="edit-post-page">
      <header>
        <h1 className="title">Editar publicación</h1>
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
              {...register("image")}
            />
          </div>
        </section>

        <section className="form-section">
          <label className="content_label">Contenido:</label>
          <div ref={editor} className="editor" />
        </section>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          Guardar cambios
        </button>
      </form>
    </main>
  );
}

export default EditPost;
