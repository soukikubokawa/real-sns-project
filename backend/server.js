const express = require("express");
// const cors = require("cors");
const app = express();
const cors = require('cors');
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");
const uploadRoute = require("./routes/upload.js");
const PORT = 8081;
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

app.use(cors({
    origin: 'http://localhost:3000', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}));

// データベース接続
mongoose.connect(process.env.MONGOURL
).then(() => {
    console.log("DBと接続しました");
}
).catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("hello express");
});

// ミドルウェア
app.use("/images", express.static(path.join(__dirname, "/public/images")));
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

// ローカルサーバを起動する
app.listen(PORT, () => console.log("サーバーが起動しました"));