import React, { useState } from "react";
import { Logo } from "../../component/logo/logo";
import { Button, InputItem, List, WhiteSpace } from "antd-mobile";
import { Redirect, useHistory } from "react-router-dom";
import { UserInfoParam } from "../../common/interface/login-register";
import { StoreState } from "@lib/interface";
import { login } from "../../redux/action";
import { connect } from "react-redux";

function Login(props: any) {
  let history = useHistory();
  const [param, setParam] = useState<UserInfoParam>({
    ...props.user,
    repeatPwd: "",
  });
  function register() {
    history.push("/register");
  }
  function loginHandle(param: any) {
    props.login(param);
  }
  function changeHandle(type: any, value: any) {
    setParam({
      ...param,
      [type]: value,
    });
  }
  return (
    <div>
      {props.user && props.user.redirectTo ? (
        <Redirect to={props.user.redirectTo}></Redirect>
      ) : null}
      <Logo></Logo>
      <List>
        <InputItem
          onChange={(value) => {
            changeHandle("name", value);
          }}
        >
          用户名
        </InputItem>{" "}
        <WhiteSpace />
        <InputItem
          onChange={(value) => {
            changeHandle("pwd", value);
          }}
        >
          密码
        </InputItem>{" "}
      </List>
      <WhiteSpace />
        {props.user && props.user.msg ? (
            <p className={"error-message"}>{props.user.msg}</p>
        ) : null}
      <Button
        type="primary"
        onClick={() => {
          loginHandle(param);
        }}
      >
        登录
      </Button>
      <WhiteSpace />
      <Button type="primary" onClick={register}>
        注册
      </Button>
    </div>
  );
}
function mapStateToProps(state: StoreState) {
  return { user: state.user };
}
const actionCreators = {
  login,
};
export default connect(mapStateToProps, actionCreators)(Login);
