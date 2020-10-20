import { Redirect, Route, useParams } from "react-router-dom";
import App from "./App";
import React from "react";
import { connect } from "react-redux";
import { Button } from "antd-mobile";
import { StoreState } from "../libs/interface";
function About() {
  return <div>about</div>;
}

function TestParam() {
  let { param } = useParams();
  return <div>test {param}</div>;
}
function Dashboard(props: any) {
  return (
    <div>
      {!props.auth || !props.auth.isAuth ? (
        <Redirect to={"/login"}></Redirect>
      ) : null}
      {props.auth && props.auth.isAuth ? (
        <Button type="primary" onClick={props.logout}>
          注销
        </Button>
      ) : null}
      <Route path="/dashboard" exact>
        <App />
      </Route>
    </div>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {
})(Dashboard);
