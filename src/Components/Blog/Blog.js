import React, { useContext, useEffect, useState } from "react";
import "../../Styles/Blog/Blog.css";
import { Link } from "react-router";
import Posts from "./Posts";
import BlogPagination from "../Utils/BlogPagination";
import { AuthContext } from "../../Context/Context";
function Blog() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const serverURL = process.env.REACT_APP_SERVER_URL;

  const postsPerPage = 3;
  const firstPost = (currentPage - 1) * postsPerPage;
  const lastPost = firstPost + postsPerPage;

  const handleDelete = (id) => {
    setPosts((OldPosts) => OldPosts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    fetch(`${serverURL}/api/posts`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [serverURL]);
  return (
    <div className="blog">
      <div className="header-container">
        <h1 className="title">Publicaciones</h1>
        {user?.role === "admin" && (
          <Link to="/crear-publicacion" className="create-post-button">
            Crear nueva publicación
          </Link>
        )}
      </div>

      <div className="posts-container">
        {posts.slice(firstPost, lastPost).map((post) => (
          <Posts key={post.id} posts={post} onDelete={handleDelete} />
        ))}
      </div>
      <BlogPagination
        posts={posts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Blog;
