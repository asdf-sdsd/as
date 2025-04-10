const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 📝 회원가입 API
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: '사용자명, 이메일, 비밀번호는 필수 항목입니다.' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: '이미 등록된 이메일입니다.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // JWT 토큰 생성 (username 포함)
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: '회원가입이 완료되었습니다.',
            token,
            username: newUser.username
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다. 다시 시도해주세요.' });
    }
});

// 📝 로그인 API
router.post('/login', async (req, res) => {
    console.log('📩 로그인 요청 수신:', req.body); // 요청 데이터 로그 출력

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: '이메일과 비밀번호를 입력해주세요.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: '존재하지 않는 이메일입니다.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        // JWT 토큰 생성
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: '로그인 성공',
            token,
            username: user.username
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다. 다시 시도해주세요.' });
    }
});

module.exports = router;
