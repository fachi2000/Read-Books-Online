import React from "react";

const Pagination = ({ requestsPerPage, totalRequests, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalRequests / requestsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div class="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          {pageNumber.map((number) => (
            <li key={number} active={number} className="page-item">
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
