import express from "express";
const bodyParser = require("body-parser");
import cookieParser from "cookie-parser";
import userRouter from "./user";
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/user", userRouter);

app.listen(9093, () => {
  console.log("node app start 9093");
});
