import React from "react";
import "../../Styles/Blog/Posts.css";
import { Link } from "react-router";

function getSummaryTextFromHtml(html, numWords = 30) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const text = doc.body.textContent || "";
  const words = text.split(/\s+/).filter(Boolean);
  return (
    words.slice(0, numWords).join(" ") + (words.length > numWords ? "..." : "")
  );
}

function Posts({ posts }) {
  const { title, author, content, id } = posts;
  const summary = getSummaryTextFromHtml(content, 28);
  return (
    <div className="posts">
      <div className="post-image">
        <img src={posts.image} alt={title} />
      </div>
      <div className="post-body">
        <h2 className="post-title">{title}</h2>
        <div className="post-content">{summary}</div>
        <div className="post-footer">
          <Link to={`/post/${id}`} className="read-more">
            Leer más
          </Link>
          <p className="author">Autor: {author}</p>
        </div>
      </div>
    </div>
  );
}

export default Posts;
