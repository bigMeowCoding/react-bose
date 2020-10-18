import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { counter } from "./redux/reduce";
import { Provider } from "react-redux";

import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Link, Route, useParams, Switch } from "react-router-dom";
const devTool = (window as any).devToolsExtension
  ? (window as any).devToolsExtension()
  : () => {};
const store = createStore(counter, compose(applyMiddleware(thunk), devTool));

render();
function About() {
  return <div>about</div>;
}
function Dashboard() {
  return <div>dashboard</div>;
}

function TestParam() {
  let { param } = useParams();
  return <div>test {param}</div>;
}
function render() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact>
            <App />
          </Route>
          <Route path="/about">
            <About />
          </Route>{" "}
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/:param">
            <TestParam />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
}

store.subscribe(() => {
  render();
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
