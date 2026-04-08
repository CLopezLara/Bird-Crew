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

function Posts({ posts, onDelete }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { title, author, content, id } = posts;
  const summary = getSummaryTextFromHtml(content, 28);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeletePost = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete post: ${res.status}`);
        }

        return res.json();
      })
      .then(() => {
        setShowConfirm(false);
        onDelete(id);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        alert("No se pudo eliminar la publicación. Inténtalo de nuevo.");
      });
  };

  return (
    <div className="posts-section">
      <div className="posts">
        <div className="post-image">
          <img src={posts.image} alt={title} />
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
          onConfirm={handleDeletePost}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default Posts;
