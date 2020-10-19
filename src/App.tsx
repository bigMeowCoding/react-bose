import React from "react";
import { Button } from "antd-mobile";
import { connect } from "react-redux";
import { addNumber, asyncAddNumber, minusNumber } from "./redux/action";
import { StoreState } from "../libs/interface";

function App(props: {
  num?: number;
  addNumber?: any;
  asyncAddNumber?: (dispatch?: any) => any;
  minusNumber?: () => any;
}) {
  return (
    <div className="App">
      {props.num}
      <Button type="primary" onClick={props.addNumber}>
        add
      </Button>
      <Button type="primary" onClick={props.minusNumber}>
        remove
      </Button>
      <Button type="primary" onClick={props.asyncAddNumber}>
        async add
      </Button>
    </div>
  );
}
function mapStateToProps(state: StoreState) {
  return { num: state.counter };
}
const actionCreators = {
  addNumber,
  asyncAddNumber,
  minusNumber,
};
export default connect(mapStateToProps, actionCreators)(App);
