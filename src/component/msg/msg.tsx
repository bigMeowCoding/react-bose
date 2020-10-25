import { StoreState } from "@lib/interface";
import { getMsgList, recvMsg, sendMsg } from "../../redux/chat.action";
import { connect } from "react-redux";
import React from "react";
import { List, Badge } from "antd-mobile";
import { Brief } from "antd-mobile/es/list/ListItem";
import { useHistory } from "react-router-dom";

function getLast(arr: any[]): any {
  return arr[arr.length - 1];
}

function Msg(props: any) {
  const history = useHistory();
  const Item = List.Item;
  const msgGroup: any = {};
  props.chat.chatMsg.forEach((v: any) => {
    msgGroup[v.chatId] = msgGroup[v.chatId] || [];
    msgGroup[v.chatId].push(v);
  });

  const chatList = Object.values(msgGroup).sort((a: any, b: any) => {
    const a_last = getLast(a).create_time;
    const b_last = getLast(b).create_time;
    return b_last - a_last;
  });
  const userinfo = props.chat.users,
    userid = props.user._id;
  return (
    <div>
      {chatList.map((v: any) => {
        const lastItem = getLast(v);
        // console.log(9)
        const targetId = v[0].from == userid ? v[0].to : v[0].from;
        const unreadNum = v.filter((v: any) => !v.read && v.to == userid)
          .length;
        if (!userinfo[targetId]) {
          return null;
        }
        // const name = userinfo[targetId]?userinfo[targetId].name:''
        // const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
        return (
          <List key={lastItem._id}>
            <Item
              extra={<Badge text={unreadNum}></Badge>}
              thumb={require(`../../common/images/${userinfo[targetId].avatar}.png`)}
              arrow="horizontal"
              onClick={() => {
                history.push(`/chat/${targetId}`);
              }}
            >
              {lastItem.content}
              <Brief>{userinfo[targetId].name}</Brief>
            </Item>
          </List>
        );
      })}
    </div>
  );
}
function mapStateToProps(state: StoreState) {
  return {
    user: state.user,
    chat: state.chat,
  };
}
const actionCreators = { sendMsg, recvMsg, getMsgList };
export default connect(mapStateToProps, actionCreators)(Msg);
