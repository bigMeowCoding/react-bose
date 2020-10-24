import { Icon, InputItem, List, NavBar } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { ChatState, StoreState } from "@lib/interface";
import { connect } from "react-redux";
import { getMsgList, recvMsg, sendMsg } from "../../redux/chat.action";
import { useParams, useHistory } from "react-router-dom";
import { UserState } from "../../common/interface/login-register";
import { getChatId } from "../../common/utils/chat";

function Chat(props: {
  sendMsg: Function;
  user: UserState;
  chat: ChatState;
  getMsgList: Function;
  recvMsg: Function;
}) {
  const history = useHistory();
  const [message, setMessage] = useState({ text: "", msg: [] });
  const { user: userId } = useParams();
  const currentUserId = props.user._id;
  useEffect(() => {
    if (!chat.chatMsg.length) {
      props.getMsgList();
      props.recvMsg();
    }
  }, []);
  function submitHandle() {
    props.sendMsg({
      from: props.user._id,
      to: userId,
      msg: message.text,
    });
    setMessage({ ...message, text: "" });
  }

  const { chat } = props;
  const Item = List.Item;
  const users = props.chat.users;
  if (!users[userId]) {
    return null;
  }
  const chatId = getChatId(userId, currentUserId || "");
  const chatMsgs = chat.chatMsg.filter((c) => {
    return c.chatId === chatId;
  });
  return (
    <div id="chat-page">
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => {
          history.goBack();
        }}
      >
        {chat.users[userId]?.name}
      </NavBar>
      {chatMsgs.map((v) => {
        const avatar = require(`../../common/images/${
          chat.users[v.from].avatar
        }.png`);

        return v.from == userId ? (
          <List key={v._id}>
            <Item thumb={avatar}>{v.content}</Item>
          </List>
        ) : (
          <List key={v._id}>
            <Item extra={<img alt="头像" src={avatar} />} className="chat-me">
              {v.content}
            </Item>
          </List>
        );
      })}
      <div className="stick-footer">
        <List>
          <InputItem
            placeholder="请输入"
            value={message.text}
            onChange={(v) => {
              setMessage({
                ...message,
                text: v,
              });
            }}
            extra={
              <div>
                <span onClick={() => submitHandle()}>发送</span>
              </div>
            }
          ></InputItem>
        </List>
      </div>
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
export default connect(mapStateToProps, actionCreators)(Chat);
