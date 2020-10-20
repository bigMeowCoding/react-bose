import express from "express";
import model from "./model";
import { HttpStatus } from "../src/interface/http";
import { md5PwdEncryption } from "../src/utils/md5Pwd";

const Router = express.Router();
const User = model.getModel("user");

Router.get("/list", (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc);
  });
});

Router.post("/register", (req, res) => {
  const { name, pwd, type } = req.body;
  User.findOne({ name }, (error, doc) => {
    if (doc) {
      return res.json({ code: HttpStatus.BusinessError, msg: "用户名重复" });
    }
    User.create({ name, pwd: md5PwdEncryption(pwd), type }, (e, d) => {
      if (e) {
        return res.json({
          code: HttpStatus.BusinessError,
          msg: "服务器错误",
        });
      }
      return res.json({
        code: HttpStatus.Ok,
      });
    });
  });
});
Router.post("/login", (req, res) => {
  const { name, pwd, type } = req.body;
  User.findOne(
    { name, pwd: md5PwdEncryption(pwd) },
    { pwd: 0 },
    (error, doc) => {
      if (!doc) {
        return res.json({
          code: HttpStatus.BusinessError,
          msg: "用户名或者密码错误",
        });
      }
      return res.json({
        code: HttpStatus.Ok,
        data: doc,
      });
    }
  );
});
export default Router;
