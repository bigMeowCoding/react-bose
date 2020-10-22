import React from "react";
import { TabBar } from "antd-mobile";
import { NavbarItem } from "../../common/interface/navbar";
import { useLocation, useHistory } from "react-router-dom";
import "./nav-link.scss";
export function NavLinkBar(props: any) {
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
