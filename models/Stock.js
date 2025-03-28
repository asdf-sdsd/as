const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stocks: [{
        name: String,
        ticker: String,
        price: Number,
        description: String
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// 이미 User 모델이 존재하는지 확인하고, 존재하지 않으면 새로 정의
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
