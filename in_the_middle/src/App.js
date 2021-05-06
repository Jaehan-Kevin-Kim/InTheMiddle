import React, { useEffect, useState } from "react";
// import Shop from './components/shop/Shop';
import Main from "./components/main/Main";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Shop from "./components/shop/Shop";
import ShopDetail from "./components/shopDetail/ShopDetail";
import UploadItem from "./components/uploadItem/UploadItem";
import { auth } from "./firebase";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    console.log(isLoggedIn);
  });
  return (
    <>
      {/* <Shop /> */}
      <Router>
        <Route exact path='/' component={Main}>
          <Main />
        </Route>
        {/* {isLoggedIn ? (
          <Route exact path='/' component={Main}>
            <Main />
          </Route>
        ) : (
          <Route path='/login' component={Login}>
            <Login />
          </Route>
        )} */}
        <Route path='/login' component={Login}>
          <Login />
        </Route>

        {/*<Route exact path='/main' component={Main}>
          <Main />
        </Route>*/}
        {/* <Link to='/shop'>Shop</Link> */}
        <Route path='/shop' component={Shop}>
          <Shop />
        </Route>
        <Route path='/shopDetail' component={ShopDetail}>
          <ShopDetail />
        </Route>
        <Route path='/uploadItem' component={UploadItem}>
          <UploadItem />
        </Route>
      </Router>

      {/* <Router>
        <Route path='/' component={Login} />
        <Route path='/main' component={Main} />
        <Route path='/Shop' component={Shop} />
        <Route path='/ShopDetail' component={ShopDetail} />
      </Router>
    </Shop> */}
    </>
  );
};

export default App;
