import { WingBlank, WhiteSpace, Card } from "antd-mobile";
import React from "react";
import { UserInfo } from "../../common/interface/user";
import { UserType } from "../../common/interface/login-register";
import { useHistory } from "react-router-dom";

export default function UserCard(props: { userList: UserInfo[] }) {
  const Header = Card.Header;
  const Body = Card.Body;
  const history = useHistory();
  return (
    <WingBlank>
      <WhiteSpace></WhiteSpace>
      {props.userList.map((v: any) =>
        v.avatar ? (
          <Card
            key={v._id}
            onClick={() => {
              history.push(`/chat/${v._id}`);
            }}
          >
            <Header
              title={v.name}
              thumb={require(`../../common/images/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            ></Header>
            <Body>
              {v.type === UserType.boss ? <div>公司:{v.company}</div> : null}

              {v.desc.split("\n").map((d: string) => (
                <div key={d}>{d}</div>
              ))}
              {v.type === UserType.boss ? <div>薪资:{v.money}</div> : null}
            </Body>
          </Card>
        ) : null
      )}
    </WingBlank>
  );
}
