import React, { useState } from "react";
import { Button, InputItem, List, WhiteSpace } from "antd-mobile";
import RadioItem from "antd-mobile/es/radio/RadioItem";
import { UserInfoParam, UserState } from "../../interface/login-register";
import { Logo } from "../../component/logo/logo";
import { StoreState } from "@lib/interface";
import { register } from "../../redux/action";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Register(props: { user: UserState; [key: string]: any }) {
  const [param, setParam] = useState<UserInfoParam>({
    ...props.user,
    repeatPwd: "",
  });

  function registerHandle(param: UserInfoParam) {
    props.register(param);
  }

  function changeHandle(type: any, value: any) {
    setParam({
      ...param,
      [type]: value,
    });
  }
  return (
    <div className="register">
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
        </InputItem>
        <InputItem
          onChange={(value) => {
            changeHandle("pwd", value);
          }}
        >
          密码
        </InputItem>
        <InputItem
          onChange={(value) => {
            changeHandle("repeatPwd", value);
          }}
        >
          确认密码
        </InputItem>
        <RadioItem
          checked={param.type === "genius"}
          onChange={(value) => {
            changeHandle("type", "genius");
          }}
        >
          牛人
        </RadioItem>
        <WhiteSpace />
        <RadioItem
          checked={param.type === "boss"}
          onChange={(value) => {
            changeHandle("type", "boss");
          }}
        >
          老板
        </RadioItem>
        <WhiteSpace />
        {props.user && props.user.msg ? <p>{props.msg}</p> : null}
        <Button
          type="primary"
          onClick={() => {
            registerHandle(param);
          }}
        >
          注册
        </Button>
      </List>
    </div>
  );
}
function mapStateToProps(state: StoreState) {
  return { user: state.user };
}
const actionCreators = {
  register,
};
export default connect(mapStateToProps, actionCreators)(Register);
