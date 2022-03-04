import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({
  requestsPerPage,
  totalRequests,
  paginate,
  currentPage,
}) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalRequests / requestsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div class="d-flex justify-content-center">
      <Pagination>
        {pageNumber.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
