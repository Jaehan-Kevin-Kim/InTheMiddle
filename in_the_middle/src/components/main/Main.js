import React from "react";
import "./Main.css";
import Header from "../header/Header";
import Shop from "../shop/Shop";
import { BrowserRouter, Route } from "react-router-dom";

function Main({ onShopClick }) {
  // const onClick = () => {
  //   <Shop />;
  // };
  return (
    <>
      <Header />
      <BrowserRouter>
        <Route path='/shop' component={Shop}>
          Home
        </Route>
      </BrowserRouter>
      <div className='main__main'>
        <div className='main__bennerImg'>
          <img src='' alt='' />
        </div>
        <div className='main__selectBox'>
          <div className='selectBox'>
            <button onClick={onShopClick}>Shop</button>

            {/* </div>
          <div className='selectBox'> */}
            <button>Feed</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
