const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const stockRoutes = require("./routes/stocks");
const userRoutes = require("./routes/user");

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // JSON 요청 처리

// 정적 파일 제공 (프론트엔드 HTML, CSS, JS)
app.use(express.static("public"));

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB 연결 성공 ✅"))
  .catch((err) => console.error("MongoDB 연결 실패 ❌", err));

// API 라우트 설정
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/user", userRoutes);

// 기본 루트 요청 → index.html 제공
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Vercel 배포를 위한 설정
module.exports = app;
