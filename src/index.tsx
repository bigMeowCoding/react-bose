import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import "./index.scss";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./container/login/login";
import Register from "./container/register/register";
import reducer from "./reducer";
import AuthRoute from "./component/auth-route/auth-auth";
import BossInfo from "./container/bossinfo/bossinfo";
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import { Switch } from "react-router-dom";
import Dashboard from "./component/dashboard/dashboard";
const devTool = (window as any).devToolsExtension
  ? (window as any).devToolsExtension()
  : () => {};
const store = createStore(reducer, compose(applyMiddleware(thunk), devTool));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthRoute></AuthRoute>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/bossinfo" component={BossInfo}></Route>
        <Route path="/geniusinfo" component={GeniusInfo}></Route>
        <Route component={Dashboard}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
