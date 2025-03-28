const mongoose = require('mongoose');

// User 모델 수정
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stocks: [{
        name: String,
        ticker: String,
        price: Number,
        description: String,
        quantity: { type: Number, default: 0 }, // 주식 수량 추가
        logo: String, // 기업 로고 이미지 URL 추가
        listingDate: { type: Date } // 상장 예정일 추가
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
