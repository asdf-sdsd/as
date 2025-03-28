const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user'); // 🔥 추가

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // 요청 본문을 JSON으로 파싱

// 라우트 설정
app.use('/auth', authRoutes);
app.use('/api/user', userRoutes); // 🔥 추가

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ MongoDB 연결됨');
}).catch(err => {
    console.error('❌ MongoDB 연결 실패', err);
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
