import { useLocation, useHistory } from "react-router-dom";
import { StoreState } from "@lib/interface";
import { errorMessage, loadData, login, userInfo } from "../../redux/action";
import { connect } from "react-redux";
import { useEffect } from "react";
import { service } from "../../http-util/axios";
import {HttpStatus} from "../../common/interface/http";

function AuthRoute(props: any) {
  const history = useHistory();
  useEffect(() => {
    // 异步请求
    service.get(`/user/info`).then((res) => {
      if (res.status === 200 && res.data.code === HttpStatus.Ok) {
        props.loadData(res.data.data);
      } else {
        history.push("/login");
      }
    });
  }, []);
  return null;
}

function mapStateToProps(state: StoreState) {
  return { user: state.user };
}
const actionCreators = {
  loadData,
};

export default connect(mapStateToProps, actionCreators)(AuthRoute);
