import React, { useState } from "react";
import { Grid, List } from "antd-mobile";
import { HeadIcon } from "../../interface";

export function AvatarSelector(props: {
  selectAvatar: Function;
  [key: string]: any;
}) {
  const [avatar, selectAvatar] = useState<HeadIcon>({ text: "", icon: "" });
  const avatarList = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra"
    .split(",")
    .map((v) => ({
      icon: require(`../../common/images/${v}.png`),
      text: v,
    }));
  const gridHeader = avatar.icon ? (
    <div>
      <span>已选择头像</span>
      <img style={{ width: 20 }} src={avatar.icon} alt="" />
    </div>
  ) : (
    "请选择头像"
  );
  return (
    <div>
      <List renderHeader={() => gridHeader}>
        <Grid
          data={avatarList}
          columnNum={5}
          onClick={(e) => {
            selectAvatar({ text: e?.text, icon: e?.icon });
            props.selectAvatar(e);
          }}
        ></Grid>
      </List>
    </div>
  );
}
