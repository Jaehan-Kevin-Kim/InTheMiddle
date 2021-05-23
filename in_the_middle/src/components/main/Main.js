import React from "react";
import "./Main.css";
import Header from "../header/Header";
import Shop from "../shop/Shop";
import { BrowserRouter, Link, Route } from "react-router-dom";

// function Main({ onShopClick }) {
function Main() {
  // const onClick = () => {
  //   <Shop />;
  // };
  // const toShop = () => {
  //   <BrowserRouter>
  //     <Route path='/shop' component={Shop}>
  //       <Shop />
  //     </Route>
  //   </BrowserRouter>;
  // };
  return (
    <>
      <Header />
      <div className='main__main'>
        <div className='main__bennerImg'>
          <img src='' alt='' />
        </div>
        <div className='main__selectBox'>
          <div className='selectBox'>
            {/* <button onClick={onShopClick}>Shop</button> */}
            <Link to='/shop'>
              <button>Shop</button>
            </Link>

            {/* </div>
          <div className='selectBox'> */}
            <Link to='/feed'>
              <button>Feed</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
