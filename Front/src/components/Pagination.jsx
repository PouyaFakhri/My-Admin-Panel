import ReactPaginate from "react-paginate";
import "./pagination.css";

function Pagination({ value }) {
  const {page , setPage, totalPage } = value;

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="بعدی"
        previousLabel="قبلی"
        onPageChange={handlePageClick}
        pageCount={totalPage}
        forcePage={page - 1} 
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        containerClassName="pagination"
        activeClassName="active"
        disabledClassName="disabled"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        breakClassName="page-item"
      />
    </>
  );
}

export default Pagination;
