import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

const Paginationn = ({ getPage, pageCount, currentPage }) => {
  const handlePageClick = (data) => {
    getPage(data.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      onPageChange={handlePageClick}
      marginPagesDisplayed={1}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      previousLabel={"Previous"}
      containerClassName={"pagination flex gap-4 justify-content-center p-3"}
      pageClassName={"page-item btn bg-buttonColor text-white hover:bg-hoverButton"}
      pageLinkClassName={"page-link"}
      previousClassName={`page-item btn bg-buttonColor text-white hover:bg-hoverButton ${currentPage === 1 ? " hidden" : ""}`}
      nextClassName={`page-item btn bg-buttonColor text-white hover:bg-hoverButton ${currentPage === pageCount ? "hidden" : ""}`}
      previousLinkClassName={"page-link "}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active bg-textColor"}
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