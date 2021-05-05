import React from "react";
// import Shop from './components/shop/Shop';
import Main from "./components/main/Main";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login/Login";
import Shop from "./components/shop/Shop";
import ShopDetail from "./components/shopDetail/ShopDetail";

function App() {
  return (
    <>
      {/* <Shop /> */}
      <Main />
      {/* <Router>
        <Route path='/' component={Login} />
        <Route path='/main' component={Main} />
        <Route path='/Shop' component={Shop} />
        <Route path='/ShopDetail' component={ShopDetail} />
      </Router>
    </Shop> */}
    </>
  );
}

export default App;
