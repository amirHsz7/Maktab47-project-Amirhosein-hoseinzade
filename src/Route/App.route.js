import { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { AdminPanel } from "../pages/AdminPanel/AdminPanel";
import SignIn from "../pages/SigninPage/Signin";
import {Main, signinLayout} from '../layout';
import {Home} from '../pages/HomePage/Home'
import PrivateRoute from './Component/PrivateRoute'
import { PanelProducts } from "../pages/PanelProducts/PanelProducts";
import {PanelPrices} from '../pages/PanelPrices/PanelPrices';
import { PanelOrders } from "../pages/PanelOrders/PanelOrders";
import  Categories  from "../pages/categories/Categories";
import Cart from './../pages/Cart/Cart'
// import Product from "../pages/Product/Product";
import ProductPage from "../pages/Product/Product";
import Shipping from "../pages/Shipping/Shipping";
import { Failed } from "../pages/Finish/Failed";
import { Succeed } from "../pages/Finish/Succeed";

class AppRoute extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
          <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <Main>
                <Home />
            </Main>
          </Route>
          <Route path="/groceries" exact>
            <Main>
              <Categories />
            </Main>
          </Route>
          <Route path="/dairy" exact>
            <Main>
            <Categories/>
            </Main>
          </Route>
          <Route path="/protein-foods" exact>
            <Main>
            <Categories/>
            </Main>
          </Route>
          <Route path="/beverages" exact>
            <Main>
            <Categories/>
            </Main>
          </Route>
          <Route path="/product">
            <Main>
                <ProductPage />
            </Main>
          </Route>
          <Route path="/cart" exact>  
            <Main>
                <Cart />
            </Main>
          </Route>
          <Route path="/shipping" exact>
            <Main>
                <Shipping />
            </Main>
          </Route>
          <Route path="/failed" exact>
            <Main>
                <Failed />
            </Main>
          </Route>
          <Route path="/succeed" exact>
            <Main>
                <Succeed />
            </Main>
          </Route>
          <Route path="/signin" exact>
            <signinLayout>
                <SignIn />
            </signinLayout>
          </Route>
          <Route path="/not-found" exact>
            <h1>Not Found Page</h1>
          </Route>
          <Route path="/admin-panel" exact>
          <Redirect to="/admin-panel-products" />
          </Route>
          <PrivateRoute  path="/admin-panel-products" component={PanelProducts} exact ></PrivateRoute>
          <PrivateRoute  path="/admin-panel-prices" component={PanelPrices} exact ></PrivateRoute>
          <PrivateRoute  path="/admin-panel-orders" component={PanelOrders} exact ></PrivateRoute>
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    )
  }
}
// cart = sabade kharid
// shipping = nahayi kardan kharid


export default AppRoute;