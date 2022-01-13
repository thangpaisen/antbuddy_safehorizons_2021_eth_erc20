import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DashBoard,
  DetailProductPage,
  ListOrderPage,
  LoginPage,
  RegisterPage,
  ListAllorderPage, ListUserPage, AddProductPage, ListProductPage
} from "../page";
import { HomePage } from "../page/Home";

export default function RouterApp() {
  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            component={HomePage}
          />
          <Route
            path="/list-order"
            exact
            component={ListOrderPage}
          />
          <Route
            path="/detail-product/:slug.:id"
            exact
            component={DetailProductPage}
          />
          <Route
            path="/register"
            exact
            component={RegisterPage}
          />
          <Route
            path="/admin"
            exact
            component={DashBoard}
          />
          <Route
            path="/admin/login"
            exact
            component={LoginPage}
          />
          <Route
            path="/admin/User"
            exact
            component={ListUserPage}
          />
          <Route
            path="/admin/Order"
            exact
            component={ListAllorderPage}
          />
          <Route
            path="/admin/listProduct"
            exact
            component={ListProductPage}
          />
          <Route
            path="/admin/addProduct"
            exact
            component={AddProductPage}
          />
          <Route
            path="/login"
            exact
            component={LoginPage}
          />
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}