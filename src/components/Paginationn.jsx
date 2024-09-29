import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

const Paginationn = ({ getPage, pageCount, currentPage }) => {
  const handlePageClick = (data) => {
    getPage(data.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      marginPagesDisplayed={4}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      previousLabel="< previous"
      containerClassName={"pagination flex gap-4 justify-content-center p-3"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={`page-item ${currentPage === 1 ? "disabled" : ""}`}
      nextClassName={`page-item ${currentPage === pageCount ? "disabled" : ""}`}
      previousLinkClassName={"page-link"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
      forcePage={currentPage - 1} // Ensure the current page is highlighted
    />
  );
};

Paginationn.propTypes = {
  getPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Paginationn;