import React from "react";
import Shop from "../shop/Shop";

const SearchResult = ({ searchBtnClicked, searchName, searchCategory, searchLocation }) => {
  console.log(searchName, searchCategory, searchLocation);
  return (
    <>
      <Shop searchBtnClicked={searchBtnClicked} />
    </>
  );
};

export default SearchResult;
