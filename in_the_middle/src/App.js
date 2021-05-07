import React, { useEffect, useState } from "react";
// import Shop from './components/shop/Shop';
import Main from "./components/main/Main";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Shop from "./components/shop/Shop";
import ShopDetail from "./components/shopDetail/ShopDetail";
import UploadItem from "./components/uploadItem/UploadItem";
import { auth } from "./firebase";
import ManageItem from "./components/manageItem/ManageItem";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user.uid);
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
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
        <Switch>
          {isLoggedIn ? (
            <Route exact path='/' component={Main}>
              <Main />
            </Route>
          ) : (
            <Route exact path='/' component={Login}>
              <Login />
            </Route>
          )}
        </Switch>
        <Route path='/shop' component={Shop}>
          <Shop />
        </Route>
        <Route path='/shopDetail' component={ShopDetail}>
          <ShopDetail />
        </Route>
        <Route path='/uploadItem' component={UploadItem}>
          <UploadItem userId={userId} />
        </Route>
        <Route path='/manageItem' component={ManageItem}>
          <ManageItem userId={userId} />
        </Route>
      </Router>
    </>
  );
};

export default App;
