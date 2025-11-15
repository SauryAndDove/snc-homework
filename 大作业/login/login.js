/*获取表单和元素*/ 
const loginBox = document.getElementById('loginBox');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorTip = document.getElementById('errorTip');

/*模拟测试账号*/
const testUser = {
    username: "test",
    password: "123456"
};

/*表单提交事件*/
loginBox.addEventListener('submit', function(e) {
    e.preventDefault(); /*阻止表单默认刷新提交 AI*/

    /*获取输入的用户名和密码*/
    const inputUsername = usernameInput.value.trim();
    const inputPassword = passwordInput.value.trim();

    /*验证账号密码（实际项目中这里要发请求到后端验证*/
    if (inputUsername === testUser.username && inputPassword === testUser.password) {
        errorTip.style.display = 'none'; /*隐藏错误提示*/
        alert('登录成功！即将跳转到首页');
        window.location.href = '../inner/inner.html';
    } else {
        errorTip.style.display = 'block'; /*显示错误提示*/
    }
});