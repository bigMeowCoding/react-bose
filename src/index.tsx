import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { counter } from "./redux/reduce";
import { applyMiddleware, compose, createStore } from "redux";
import { addNumber, asyncAddNumber, minusNumber } from "./redux/action";
import thunk from "redux-thunk";
// @ts-ignore
const devTool = window.devToolsExtension ? window.devToolsExtension() : () => {};
const store = createStore(counter, compose(applyMiddleware(thunk), devTool));

render();
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App
        store={store}
        asyncAddNumber={asyncAddNumber}
        minusNumber={minusNumber}
        addNumber={addNumber}
      />
    </React.StrictMode>,
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
