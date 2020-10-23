import { combineReducers } from "redux";
import user from "./redux/user.redux";
import chatUser from "./redux/chatuser.reduce";
import { chat } from "./redux/chat.reduce";

export default combineReducers({ user, chatUser, chat });
