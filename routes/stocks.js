const express = require('express');
const router = express.Router();

// 주식 목록 조회 예시
router.get('/', (req, res) => {
  // 주식 목록 조회 처리 로직
  res.send('Stocks list');
});

// 주식 추가 예시
router.post('/add', (req, res) => {
  // 주식 추가 처리 로직
  res.send('Stock added');
});

module.exports = router;
