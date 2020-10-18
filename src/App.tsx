import React from "react";
import { Button } from "antd-mobile";

function App(props: {
  store: any;
  addNumber: any;
  asyncAddNumber: (dispatch?: any) => any;
  minusNumber: () => any;
}) {
  const store = props.store;
  let init = store.getState();
  return (
    <div className="App">
      {init}
      <Button
        type="primary"
        onClick={() => {
          store.dispatch(props.addNumber());
        }}
      >
        add
      </Button>
      <Button
        type="primary"
        onClick={() => {
          store.dispatch(props.minusNumber());
        }}
      >
        remove
      </Button>
      <Button
        type="primary"
        onClick={() => {
          store.dispatch(props.asyncAddNumber());
        }}
      >
        async add
      </Button>
    </div>
  );
}

export default App;
