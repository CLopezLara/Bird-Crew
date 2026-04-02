import React from "react";
import "../../Styles/Blog/BlogPagination.css";
function BlogPagination({ posts, postsPerPage, setCurrentPage, currentPage }) {
  const totalPages = Math.ceil(posts / postsPerPage);

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
      {pages.map((page) => (
        <button
          className={`pagination-button ${page === currentPage ? "active" : ""}`}
          key={page}
          onClick={() => {
            setCurrentPage(page);
            window.scrollTo(0, 0);
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default BlogPagination;
