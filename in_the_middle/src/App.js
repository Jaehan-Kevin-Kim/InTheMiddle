import React, { useEffect, useState } from "react";
// import Shop from './components/shop/Shop';
import Main from "./components/main/Main";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Shop from "./components/shop/Shop";
import Feed from "./feed/Feed";
import ShopDetail from "./components/shopDetail/ShopDetail";
import UploadItem from "./components/uploadItem/UploadItem";
import { auth } from "./firebase";
import ManageItem from "./components/manageItem/ManageItem";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log(user.uid);
      // console.log(user);
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
        setUser(user);
        setUserEmail(userEmail);
        // console.log(user);
      } else {
        setIsLoggedIn(false);
      }
    });
    console.log(isLoggedIn);
  }, [user]);
  return (
    <>
      {/* <Shop /> */}

      <Router>
        <Switch>
          {isLoggedIn ? (
            <Route exact path="/" component={Main}>
              <Main />
            </Route>
          ) : (
            <Route exact path="/" component={Login}>
              <Login />
            </Route>
          )}

          <Route exact path="/shopDetail" component={ShopDetail}>
            <ShopDetail />
          </Route>

          <Route path="/shop" component={Shop}>
            <Shop />
          </Route>

          <Route path="/feed" component={Feed}>
            <Feed userId={userId} user={user} userEmail={userEmail} />
          </Route>

          <Route path="/uploadItem" component={UploadItem}>
            <UploadItem userId={userId} />
          </Route>
          <Route path="/manageItem" component={ManageItem}>
            <ManageItem userId={userId} />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
