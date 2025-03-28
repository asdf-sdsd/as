// 로그인 상태 확인
const token = localStorage.getItem('token');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const greeting = document.getElementById('greeting');
const stocksDiv = document.getElementById('stocks');
const authButtons = document.getElementById('auth-buttons');

// 로그아웃 함수
function logout() {
    localStorage.removeItem('token');  // 토큰 삭제
    window.location.reload();  // 페이지 새로 고침
}

if (token) {
    // 로그인된 상태: 사용자 이름 표시
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (greeting) {
        greeting.innerHTML = `${decodedToken.id}님, 환영합니다!`;
    }
    
    // 로그인된 상태에서 로그인/회원가입 버튼 숨기기
    if (authButtons) {
        authButtons.style.display = 'none';
    }
    if (logoutBtn) {
        logoutBtn.style.display = 'block';  // 로그아웃 버튼 표시
    }

    // 보유 주식 확인 (API 호출)
    fetch('http://localhost:3000/api/user/stocks', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(response => response.json()).then(data => {
        if (stocksDiv) {
            if (data.length === 0) {
                stocksDiv.innerHTML = '보유한 주식이 없습니다.';
            } else {
                stocksDiv.innerHTML = '보유한 주식: ' + data.map(stock => stock.name).join(', ');
            }
        }
    }).catch(err => {
        if (stocksDiv) {
            stocksDiv.innerHTML = '주식 정보를 가져오는 데 문제가 발생했습니다.';
        }
    });
} else {
    // 로그인되지 않은 상태: 로그인 요청
    if (greeting) {
        greeting.innerHTML = '로그인해주세요';
    }
    if (authButtons) {
        authButtons.style.display = 'block';
    }
    if (logoutBtn) {
        logoutBtn.style.display = 'none';  // 로그아웃 버튼 숨기기
    }
}
