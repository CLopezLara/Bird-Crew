import { useContext, useState } from "react";
import "../../Styles/Blog/Posts.css";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/Context";
import ConfirmWindow from "../Utils/ConfirmWindow";

function getSummaryTextFromHtml(html, numWords = 30) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const text = doc.body.textContent || "";
  const words = text.split(/\s+/).filter(Boolean);
  return (
    words.slice(0, numWords).join(" ") + (words.length > numWords ? "..." : "")
  );
}

import {
  deleteImage,
  deletePost,
  getDeletePresignedUrl,
} from "../Services/postServices.js";
function Posts({ posts, onDelete }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { title, author, content, id, image_url, image_key } = posts;
  const summary = getSummaryTextFromHtml(content, 28);
  const [showConfirm, setShowConfirm] = useState(false);

  const DeletePostHandler = async () => {
    try {
      setShowConfirm(false);
      if (image_url && image_key) {
        const res = await getDeletePresignedUrl(image_key);
        await deleteImage(res.presignedUrl);
      }

      await deletePost(id);

      onDelete(id);
    } catch (err) {
      console.error(err.errors);
    }
  };

  return (
    <div className="posts-section">
      <div className="posts">
        <div className="post-image">
          <img src={posts.image} alt={title} />
          <img src={image_url} alt={title} className="post-image" />
        </div>
        <div className="post-body">
          <h2 className="post-title">{title}</h2>
          <div className="post-content">{summary}</div>
          <div className="post-footer">
            <Link to={`/post/${id}`} className="read-more-button">
              Leer más
            </Link>
            <p className="author">Autor: {author}</p>
          </div>
        </div>
      </div>
      {user?.role === "admin" && (
        <div className="admin-options">
          <button
            className="edit-post-button"
            onClick={() => navigate(`/edit-post/${id}`)}
          >
            Editar
          </button>
          <button
            className="delete-post-button"
            onClick={() => setShowConfirm(true)}
          >
            Eliminar
          </button>
        </div>
      )}
      {showConfirm && (
        <ConfirmWindow
          message="¿Seguro que deseas eliminar esta publicación?"
          onConfirm={DeletePostHandler}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default Posts;
