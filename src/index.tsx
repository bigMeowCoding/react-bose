import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { counter } from "./redux/reduce";
import { Provider } from "react-redux";

import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  BrowserRouter,
  Link,
  Route,
  useParams,
  Switch,
  Redirect,
} from "react-router-dom";
import { auth } from "./redux/auth.reduce";
import Login from "./login";
import  Dashboard  from "./dashboard";
const devTool = (window as any).devToolsExtension
  ? (window as any).devToolsExtension()
  : () => {};
const store = createStore(
  combineReducers({ counter, auth }),
  compose(applyMiddleware(thunk), devTool)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Redirect to="/login"></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
