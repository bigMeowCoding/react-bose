import React, { useState } from "react";
import { Button, InputItem, List, WhiteSpace } from "antd-mobile";
import RadioItem from "antd-mobile/es/radio/RadioItem";
import { UserInfoParam } from "../../interface/login-register";
import { Logo } from "../../component/logo/logo";
import { StoreState } from "@lib/interface";
import { register } from "../../redux/action";
import { connect } from "react-redux";

function Register(props: any) {
  const [param, setParam] = useState<UserInfoParam>({
    ...props.user,
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
