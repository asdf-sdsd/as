const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 🔐 JWT 인증 미들웨어
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        console.log('❌ 토큰 없음');
        return res.status(401).json({ message: '토큰이 없습니다. 인증이 필요합니다.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ JWT 디코딩 성공:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('❌ JWT 검증 실패:', error);
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};

// 📈 사용자의 보유 주식 정보 조회 API
router.get('/stocks', authMiddleware, async (req, res) => {
    try {
        console.log('📌 요청된 사용자 ID:', req.user.id);

        const user = await User.findById(req.user.id).populate('stocks');

        if (!user) {
            console.error('❌ 사용자 없음');
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        console.log('✅ 사용자 정보:', user);

        res.json({ stocks: user.stocks || [] });
    } catch (error) {
        console.error('❌ 서버 오류 발생:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다. 다시 시도해주세요.' });
    }
});

module.exports = router;
