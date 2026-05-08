import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../Styles/Blog/Post.css";
import { getPostById } from "../Services/postServices";
function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  function cleanHtml(html) {
    return html?.replace(/\u00A0/g, " ");
  }
  useEffect(() => {
    getPostById(id)
      .then(setPost)
      .catch((err) => {
        alert(err.errors);
      });
  }, [id]);

  return (
    <div className="post-container">
      <div className="post">
        <h1 className="post-title">{post?.title}</h1>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: cleanHtml(post?.content) }}
        />
        <p className="post-author">Autor: {post?.author}</p>
        {post?.created_at && (
          <div className="post-date">
            Fecha de publicación:{" "}
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
