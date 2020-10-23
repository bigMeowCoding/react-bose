import { StoreState } from "@lib/interface";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { UserType } from "../../common/interface/login-register";
import { getUserList } from "../../redux/chatuser.action";
import UserCard from "../user-card/user-card";

function Boss(props: {
  getUserList: (type: string) => void;
  [key: string]: any;
}) {
  useEffect(() => {
    props.getUserList(UserType.boss);
  }, []);
  const { userList } = props;
  return <UserCard userList={userList}></UserCard>;
}
function mapStateToProps(state: StoreState) {
  return { userList: state.chatUser.userList };
}
const actionCreators = {
  getUserList,
};
export default connect(mapStateToProps, actionCreators)(Boss);
