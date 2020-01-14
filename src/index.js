import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./index.scss";
import App from "./components/homepage";
import Navbar from "./components/navbar";
import NotFound from "./components/notfound";
import Contact from "./components/contact";
import UserDetails from "./components/userdetails";
import AboutUs from "./components/about";

import Login from "./components/login";
import configureStore from "./store";
import * as serviceWorker from "./serviceWorker";
import Archive from "./components/archive";

let store = configureStore();
window.localStorage.setItem("userPassword", "test");

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={AboutUs} />
        <Route path="/userdetails/:userId" component={UserDetails} />
        <Route path="/archive" component={Archive} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
