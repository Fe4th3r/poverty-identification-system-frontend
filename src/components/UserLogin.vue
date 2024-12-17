<template>
  <div class="login-container">
    <h2>登录</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">密 码：</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">登录</button>
      <p>还没有账号？<router-link to="/register">去注册</router-link></p>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
try {
  const response = await axios.post('http://localhost:8080/user/login', { // 修改为绝对路径
    username: this.username,
    password: this.password
  });
  // 登录成功，存储用户信息或 token，并跳转到首页或其他页面
  console.log('登录成功:', response.data);
  localStorage.setItem('user', JSON.stringify(response.data.user)); // 简化处理，只存储基本信息
  this.$router.push('/'); // 假设登录成功后跳转到首页
} catch (error) {
  if (error.response && error.response.data) {
      this.errorMessage = error.response.data.message || '登录失败';
  } else {
      this.errorMessage = '登录失败，请检查网络连接或稍后重试';
  }
}
}
  }
};
</script>

<style scoped>
.login-container {
  width: 350px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.register-link {
  margin-top: 15px;
  text-align: center;
}
</style>