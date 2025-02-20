import { useState } from "react";
import ReactPaginate from "react-paginate";

function Pagination({ itemsPerPage, items,totalPages }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`LOADING ITEMS FROM ${itemOffset} to ${endOffset}`);
  // console.log( "array in pagination--> ",items);

  const currentItems = items.slice(itemOffset, endOffset);

  console.log("currentitems: ",currentItems);
  

  const handlePageChange = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log("itemoffset: ",itemOffset);
    console.log("endoffset: ",endOffset);

    
    
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< prev"
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        renderOnZeroPageCount={null}
        pageCount={totalPages}
      />
    </>
  );
}

export default Pagination;
