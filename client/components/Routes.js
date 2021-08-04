import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar'
import AllProducts from './AllProducts';
import SingleUser from './SingleUser';
import SingleProduct from './SingleProduct';
import EditUser from './EditUser';
import EditProduct from './EditProduct';
//import ErrorHandler from './ErrorHandler';

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users/:userId" component={SingleUser} />
            <Route exact path="/users/edit/:userId" component={EditUser} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:productId" component={SingleProduct} />
            <Route exact path="/products/edit/:productId" component={EditProduct} />
            {/* <Route component={ErrorHandler} /> */}
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
