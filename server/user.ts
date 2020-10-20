import express from "express";
import model from "./model";
import { HttpStatus } from "../src/interface/http";

const Router = express.Router();
const User = model.getModel("user");

Router.get("/list", (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc);
  });
});

Router.post("/register", (req, res) => {
  console.log(req.body);
  const { name, pwd, type } = req.body;
  User.findOne({ name }, (error, doc) => {
    if (doc) {
      return res.json({ code: HttpStatus.BusinessError, msg: "用户名重复" });
    }
    User.create({ name, pwd, type }, (e, d) => {
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

export default Router;
