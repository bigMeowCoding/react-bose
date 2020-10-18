import React, { useState } from "react";
import { Button } from "antd-mobile";
import { createStore } from "redux";
import { counter } from "./redux/reduce";
import { addNumber, minusNumber } from "./redux/action"; // or 'antd-mobile/dist/antd-mobile.less'

const store = createStore(counter);
let init = store.getState();
console.log(init);
function App() {
  const [data, setData] = useState(init);
  store.subscribe(() => {
    init = store.getState();
    setData(init);
  });
  return (
    <div className="App">
      {data}
      <Button
        type="primary"
        onClick={() => {
          store.dispatch(addNumber());
        }}
      >
        add
      </Button>
      <Button
        type="primary"
        onClick={() => {
          store.dispatch(minusNumber());
        }}
      >
        remove
      </Button>
    </div>
  );
}

export default App;
