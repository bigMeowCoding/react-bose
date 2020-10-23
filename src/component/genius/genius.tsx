import { StoreState } from "@lib/interface";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { UserType } from "../../common/interface/login-register";
import { getUserList } from "../../redux/chatuser.action";

function Genius(props: {
  getUserList: (type: string) => void;
  [key: string]: any;
}) {
  useEffect(() => {
    props.getUserList(UserType.genius);
  }, []);
  const { userList } = props;
  return <div>genius</div>;
}
function mapStateToProps(state: StoreState) {
  return { userList: state.chatUser.userList };
}
const actionCreators = {
  getUserList,
};
export default connect(mapStateToProps, actionCreators)(Genius);
