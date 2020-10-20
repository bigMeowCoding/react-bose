import mongoose from "mongoose";

const DB_URL = "mongodb://localhost:27017/bose";

mongoose.connect(DB_URL, { useNewUrlParser: true });

// 设计数据库模型
const models = {
  user: {
    name: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    // 头像
    avatar: { type: String },
    // 个人简介或职位介绍
    desc: { type: String },
    // 职位名
    title: { type: String },
    // boss
    company: { type: String },
    money: { type: String },
  },
  chat: {},
};
// mongoose.connection.on("connected", () => {
//     console.log("connect");
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
for (let m in models) {
  // @ts-ignore
  mongoose.model(m, new mongoose.Schema(models[m]));
}
export default {
  getModel: function (name: string) {
    return mongoose.model(name);
  },
};
