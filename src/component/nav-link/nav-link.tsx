import React from "react";
import { TabBar } from "antd-mobile";
import { NavbarItem } from "../../common/interface/navbar";
import { useLocation, useHistory } from "react-router-dom";
import "./nav-link.scss";
import { ChatState, StoreState } from "@lib/interface";
import { getMsgList, recvMsg, sendMsg } from "../../redux/chat.action";
import { connect } from "react-redux";
function NavLinkBar(props: { chat: ChatState; [key: string]: any }) {
  let { navList } = props;
  navList = navList.filter((item: NavbarItem) => {
    return !item.hide;
  });
  const location = useLocation(),
    history = useHistory();
  return (
    <TabBar className="fixed-bar">
      {navList.map((v: NavbarItem) => (
        <TabBar.Item
          key={v.path}
          badge={v.path === "/msg" ? props.chat.unread : 0}
          title={v.text}
          icon={{ uri: require(`./img/${v.icon}.png`) }}
          selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
          selected={location.pathname === v.path}
          onPress={() => {
            history.push(v.path);
          }}
        ></TabBar.Item>
      ))}
    </TabBar>
  );
}
function mapStateToProps(state: StoreState) {
  return {
    user: state.user,
    chat: state.chat,
  };
}
const actionCreators = { getMsgList, sendMsg, recvMsg };
export default connect(mapStateToProps, actionCreators)(NavLinkBar);
