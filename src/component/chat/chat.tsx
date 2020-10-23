import { InputItem } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { StoreState } from "@lib/interface";
import { register } from "../../redux/action";
import { connect } from "react-redux";
const io = require("socket.io-client");
const socket = io("ws://localhost:9093");

function Chat(props: any) {
  const [message, setMessage] = useState({ text: "", msg: [] });
  function submitHandle() {
    socket.emit("sendmsg", { text: message.text });
    setMessage({ ...message, text: "" });
  }
  useEffect(() => {
    socket.on("recvmsg", (d: any) => {
      console.log(d);
    });
  }, []);
  return (
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
  );
}
function mapStateToProps(state: StoreState) {}
const actionCreators = {};
export default connect(mapStateToProps, actionCreators)(Chat);
