import express from "express";
import mongoose from "mongoose";
const DB_URL = "mongodb://localhost:27017/bose";
const app = express();
mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
  console.log("connect");
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const User = mongoose.model(
  "user",
  new mongoose.Schema<any>({
    name: { type: String, required: true },
    age: { type: String, required: true },
  })
);
// User.create(
//   {
//     name: "zhangsan",
//     age: 18,
//   },
//   (e, doc) => {
//     if (e) {
//       console.error(e);
//     } else {
//       console.log(doc);
//     }
//   }
// );
app.get("/", (req, res) => {
  res.send("<h1>sd</h1>");
});
app.get("/data", (req, res) => {
  User.find({ name: "zhangsan" }, (e, data) => {
    res.json(data);
  });
});

app.listen(9093, () => {
  console.log("node app start 9093");
});
