import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../Styles/Blog/Post.css";
function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const serverURL = process.env.REACT_APP_SERVER_URL;
  function cleanHtml(html) {
    return html?.replace(/\u00A0/g, " ");
  }
  useEffect(() => {
    fetch(`${serverURL}/api/posts/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.content = cleanHtml(data.content);
        setPost(data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id, serverURL]);

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
