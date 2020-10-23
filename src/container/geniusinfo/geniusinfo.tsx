import React, { useState } from "react";
import { Button, InputItem, NavBar, TextareaItem } from "antd-mobile";
import { AvatarSelector } from "../../component/avater-selector/avatar-selector";
import { StoreState } from "@lib/interface";
import { update } from "../../redux/action";
import { connect } from "react-redux";
import { HeadIcon } from "../../common/interface";
import { Redirect, useLocation } from "react-router-dom";

function GeniusInfo(props: any) {
  const [param, setParam] = useState({});
  function changeHandle(type: any, value: any) {
    setParam({
      ...param,
      [type]: value,
    });
  }
  const location = useLocation();
  const path = location.pathname;
  const redirect = props.user.redirectTo;
  return (
    <div>
      {redirect && redirect !== path ? (
        <Redirect to={redirect}></Redirect>
      ) : null}

      <NavBar mode="dark">牛人完善信息页</NavBar>
      <AvatarSelector
        selectAvatar={(data: HeadIcon) => {
          changeHandle("avatar", data.text);
        }}
      ></AvatarSelector>
      <InputItem onChange={(v) => changeHandle("title", v)}>应聘职位</InputItem>
      <TextareaItem
        onChange={(v) => changeHandle("desc", v)}
        rows={3}
        autoHeight
        title="个人简介"
      ></TextareaItem>
      <Button
        onClick={() => {
          props.update(param);
        }}
        type="primary"
      >
        保存
      </Button>
    </div>
  );
}
function mapStateToProps(state: StoreState) {
  return { user: state.user };
}
const actionCreators = {
  update,
};
export default connect(mapStateToProps, actionCreators)(GeniusInfo);
