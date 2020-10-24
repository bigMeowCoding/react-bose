import React, { useEffect } from "react";
import { StoreState } from "@lib/interface";
import { loadData } from "../../redux/action";
import { connect } from "react-redux";
import { UserType } from "../../common/interface/login-register";
import { NavBar } from "antd-mobile";
import { useLocation, Switch, Route } from "react-router-dom";
import { NavbarItem } from "../../common/interface/navbar";
import NavLinkBar from "../nav-link/nav-link";
import "./dashboard.scss";
import Genius from "../genius/genius";
import Boss from "../boss/boss";
import User from "../user/user";
import { getMsgList, recvMsg, sendMsg } from "../../redux/chat.action";

function Msg() {
  return <h2>消息列表页面</h2>;
}

function Dashboard(props: any) {
  const user = props.user;
  const navList: NavbarItem[] = [
    {
      path: "/genius",
      text: "牛人",
      icon: "boss",
      title: "牛人列表",
      component: Genius,
      hide: user.type === UserType.genius,
    },
    {
      path: "/boss",
      text: "boss",
      icon: "job",
      title: "BOSS列表",
      component: Boss,
      hide: user.type === UserType.boss,
    },
    {
      path: "/msg",
      text: "消息",
      icon: "msg",
      title: "消息列表",
      component: Msg,
    },
    {
      path: "/me",
      text: "我",
      icon: "user",
      title: "个人中心",
      component: User,
    },
  ];
  const location = useLocation();
  useEffect(() => {
    props.getMsgList();
    props.recvMsg();
  }, []);
  return (
    <div className="dashboard">
      <NavBar mode="dark">
        {navList.find((v) => v.path === location.pathname)?.title}
      </NavBar>
      <div style={{ marginTop: 45 }} className="content">
        <Switch>
          {navList.map((v) => (
            <Route key={v.path} path={v.path} component={v.component}></Route>
          ))}
        </Switch>
      </div>
      <NavLinkBar navList={navList}></NavLinkBar>
    </div>
  );
}

function mapStateToProps(state: StoreState) {
  return { user: state.user };
}
const actionCreators = {
  loadData,
  recvMsg,
  getMsgList,
};

export default connect(mapStateToProps, actionCreators)(Dashboard);
