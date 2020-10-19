import React from "react";
import { Button } from "antd-mobile";
import { connect } from "react-redux";
import { login } from "./redux/action";
import { StoreState } from "../libs/interface";
import { Redirect } from "react-router-dom";

function Login(props: any) {
  return (
    <div>
      {props.auth && props.auth.isAuth ? (
        <Redirect to={"/dashboard"}></Redirect>
      ) : null}
      <h1>你还未登陆</h1>
      <Button type="primary" onClick={props.login}>
        登陆
      </Button>
    </div>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {
  login: login,
})(Login);
