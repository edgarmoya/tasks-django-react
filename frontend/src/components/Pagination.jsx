import React from "react";

function Pagination({ totalTasks, currentPage, onPageChange }) {
  const MAX_PAGES_SHOWN = 5;
  const totalPages = Math.ceil(totalTasks / 9);
  const range = (from, to) => {
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPaginationItems = () => {
    const halfMaxPages = Math.floor(MAX_PAGES_SHOWN / 2);
    const startPage = Math.max(1, currentPage - halfMaxPages);
    const endPage = Math.min(totalPages, currentPage + halfMaxPages);

    const paginationItems = range(startPage, endPage).map((page) => (
      <li
        key={page}
        className={`page-item ${page === currentPage ? "active" : ""}`}
      >
        <a className="page-link" onClick={() => handlePageChange(page)}>
          {page}
        </a>
      </li>
    ));

    if (startPage > 1) {
      paginationItems.unshift(
        <li key={1} className={`page-item`}>
          <a className="page-link" onClick={() => handlePageChange(1)}>
            1
          </a>
        </li>
      );
      if (startPage > 2) {
        paginationItems.unshift(
          <li key="dots-start" className={`page-item disabled`}>
            <a className="page-link">...</a>
          </li>
        );
      }
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationItems.push(
          <li key="dots-end" className={`page-item disabled`}>
            <a className="page-link">...</a>
          </li>
        );
      }
      paginationItems.push(
        <li key={totalPages} className={`page-item`}>
          <a className="page-link" onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </a>
        </li>
      );
    }

    return paginationItems;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        {renderPaginationItems()}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
