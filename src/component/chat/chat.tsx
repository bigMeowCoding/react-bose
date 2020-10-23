import { Icon, InputItem, List, NavBar } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { ChatState, StoreState } from "@lib/interface";
import { register } from "../../redux/action";
import { connect } from "react-redux";
import { getMsgList, recvMsg, sendMsg } from "../../redux/chat.action";
import { useLocation, useParams } from "react-router-dom";
import { UserState } from "../../common/interface/login-register";

function Chat(props: {
  sendMsg: Function;
  user: UserState;
  chat: ChatState;
  getMsgList: Function;
  recvMsg: Function;
}) {
  const [message, setMessage] = useState({ text: "", msg: [] });
  const { user } = useParams();
  function submitHandle() {
    props.sendMsg({
      from: props.user._id,
      to: user,
      msg: message.text,
    });
    setMessage({ ...message, text: "" });
  }
  useEffect(() => {
    props.getMsgList();
    props.recvMsg();
  }, []);
  const { chat } = props;
  const Item = List.Item;

  return (
    <div id="chat-page">
      <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => {}}>
        {user}
      </NavBar>
      {chat.chatMsg.map((v) => {
        return v.from == user ? (
          <List key={v._id}>
            <Item>{v.content}</Item>
          </List>
        ) : (
          <List key={v._id}>
            <Item extra={<img alt="头像" />} className="chat-me">
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
const actionCreators = { getMsgList, sendMsg, recvMsg };
export default connect(mapStateToProps, actionCreators)(Chat);
