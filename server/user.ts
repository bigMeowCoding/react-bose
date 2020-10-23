import express from "express";
import model from "./model";
import { HttpStatus } from "../src/common/interface/http";
import { md5PwdEncryption } from "../src/utils/md5Pwd";

const Router = express.Router();
const User = model.getModel("user");
const Chat = model.getModel("chat");

const _filterPwd = { pwd: 0 };
Router.get("/list", (req, res) => {
  const { type } = req.query;
  User.find({ type }, (err, doc) => {
    return res.json({
      code: HttpStatus.Ok,
      data: doc,
    });
  });
});

Router.get("/info", (req, res) => {
  const id = req.cookies["userId"];
  if (!id) {
    res.json({
      code: HttpStatus.BusinessError,
      msg: "未登陆用户",
    });
  }
  User.findOne(
    {
      _id: id,
    },
    _filterPwd,
    (e, doc) => {
      if (e) {
        return res.json({
          code: HttpStatus.BusinessError,
          msg: "后端出现问题",
        });
      }
      if (doc) {
        return res.json({
          code: HttpStatus.Ok,
          data: doc,
        });
      }
    }
  );
});
Router.post("/register", (req, res) => {
  const { name, pwd, type } = req.body;
  User.findOne({ name }, (error, doc) => {
    if (doc) {
      return res.json({ code: HttpStatus.BusinessError, msg: "用户名重复" });
    }
    User.create({ name, pwd: md5PwdEncryption(pwd), type }, (e, d: any) => {
      if (e) {
        return res.json({
          code: HttpStatus.BusinessError,
          msg: "服务器错误",
        });
      }
      res.cookie("userId", d._id);
      return res.json({
        code: HttpStatus.Ok,
      });
    });
  });
});
Router.post("/login", (req, res) => {
  const { name, pwd } = req.body;
  User.findOne(
    { name, pwd: md5PwdEncryption(pwd) },
    _filterPwd,
    (error, doc: any) => {
      if (!doc) {
        return res.json({
          code: HttpStatus.BusinessError,
          msg: "用户名或者密码错误",
        });
      }
      res.cookie("userId", doc._id);

      return res.json({
        code: HttpStatus.Ok,
        data: doc,
      });
    }
  );
});

Router.post("/update", (req, res) => {
  const id = req.cookies["userId"];
  if (!id) {
    return res.json({
      code: HttpStatus.BusinessError,
    });
  }
  const body = req.body;
  User.findByIdAndUpdate(id, body, (error, doc: any) => {
    return res.json({
      code: HttpStatus.Ok,
      data: Object.assign(
        {},
        {
          name: doc.name,
          type: doc.type,
        },
        body
      ),
    });
  });
});

Router.get("/getmsglist", function (req, res) {
  const user = req.cookies.userId;

  User.find({}, function (e, userdoc) {
    let users = {};
    // userdoc.forEach(v=>{
    //   users[v._id] = {name:v.user, avatar:v.avatar}
    // })
    Chat.find({ $or: [{ from: user }, { to: user }] }, function (err, doc) {
      if (!err) {
        return res.json({ code: 0, msgs: doc });
      }
    });
  });
  // {'$or':[{from:user,to:user}]}
});
export default Router;
