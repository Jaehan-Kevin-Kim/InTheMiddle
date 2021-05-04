import React from 'react';
// import Shop from './components/shop/Shop';
import Main from './components/main/Main';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/login/Login';
import Shop from './components/shop/Shop';

function App() {
  return (
    <>
      <Shop />
      {/* <Router>
        <Route path='/' component={Login} />
        <Route path='/main' component={Main} />
        <Route path='/Shop' component={Shop} />
      </Router>
    </Shop> */}
    </>
  );
}

export default App;
