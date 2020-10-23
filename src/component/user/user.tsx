import React from "react";
import { List, Modal, Result, WhiteSpace } from "antd-mobile";
import { Brief } from "antd-mobile/es/list/ListItem";
import { StoreState } from "@lib/interface";
import { connect } from "react-redux";
import browserCookie from "browser-cookies";
import { Redirect } from "react-router-dom";
import { logout } from "../../redux/action";
function User(props: any) {
  function logout() {
    const alert = Modal.alert;

    alert("注销", "确认退出登录吗???", [
      { text: "取消", onPress: () => console.log("cancel") },
      {
        text: "确认",
        onPress: () => {
          browserCookie.erase("userId");
          props.logout();
        },
      },
    ]);
  }

  const Item = List.Item;
  const { user } = props;
  return user.name ? (
    <div>
      <Result
        img={
          <img
            src={require(`../../common/images/${user.avatar}.png`)}
            style={{ width: 50 }}
            alt=""
          />
        }
        title={user.name}
        message={user.type == "boss" ? user.company : null}
      />

      <List renderHeader={() => "简介"}>
        <Item>
          {user.title}
          {user.desc.split("\n").map((v: any) => (
            <Brief key={v}>{v}</Brief>
          ))}
          {user.money ? <Brief>薪资:{user.money}</Brief> : null}
        </Item>
      </List>
      <WhiteSpace />
      <List>
        <Item
          onClick={() => {
            logout();
          }}
        >
          退出登录
        </Item>
      </List>
    </div>
  ) : user.redirectTo ? (
    <Redirect to={user.redirectTo}></Redirect>
  ) : null;
}
function mapStateToProps(state: StoreState) {
  return { user: state.user };
}
const actionCreators = { logout };
export default connect(mapStateToProps, actionCreators)(User);
