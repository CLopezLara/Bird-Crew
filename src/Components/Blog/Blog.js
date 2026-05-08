import React, { useContext, useEffect, useState } from "react";
import "../../Styles/Blog/Blog.css";
import { Link } from "react-router";
import Posts from "./Posts";
import BlogPagination from "../Utils/BlogPagination";
import { AuthContext } from "../../Context/Context";
import { getAllPosts } from "../Services/postServices";
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
    getAllPosts()
      .then(setPosts)
      .catch((err) => alert(err.message));
  }, [serverURL]);

  return (
    <main className="blog">
      <header className="header-container">
        <h1 className="title">Publicaciones</h1>
        {user?.role === "admin" && (
          <Link to="/crear-publicacion" className="create-post-button">
            Crear nueva publicación
          </Link>
        )}
      </header>

      <section className="posts-container">
        {posts.slice(firstPost, lastPost).map((post) => (
          <Posts key={post.id} posts={post} onDelete={handleDelete} />
        ))}
      </section>
      <nav>
        <BlogPagination
          posts={posts.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </nav>
    </main>
  );
}

export default Blog;
