import { WingBlank, WhiteSpace, Card } from "antd-mobile";
import React from "react";
import { UserInfo } from "../../common/interface/user";

export default function UserCard(props: { userList: UserInfo[] }) {
  const Header = Card.Header;
  const Body = Card.Body;
  return (
    <WingBlank>
      <WhiteSpace></WhiteSpace>
      {props.userList.map((v: any) =>
        v.avatar ? (
          <Card key={v._id}>
            <Header
              title={v.user}
              thumb={require(`../../common/images/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            ></Header>
            <Body>
              {v.type == "boss" ? <div>公司:{v.company}</div> : null}

              {v.desc.split("\n").map((d: string) => (
                <div key={d}>{d}</div>
              ))}
              {v.type == "boss" ? <div>薪资:{v.money}</div> : null}
            </Body>
          </Card>
        ) : null
      )}
    </WingBlank>
  );
}
