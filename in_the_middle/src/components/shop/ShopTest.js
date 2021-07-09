import React, { useEffect, useState } from "react";

const ShopTest = () => {
  const [searchedItemActive, setSearchedItemActive] = useState(false);
  console.log(searchedItemActive);
  useEffect(() => {
    console.log("hello");
    setSearchedItemActive(true);
    console.log(searchedItemActive);
  }, []);
  return <div>Hi</div>;
};

export default ShopTest;
