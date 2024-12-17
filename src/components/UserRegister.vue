<template>
  <div class="register-container">
    <h2>注册</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="phoneNumber">手机号：</label>
        <input type="text" id="phoneNumber" v-model="phoneNumber" required>
      </div>
      <div class="form-group">
        <label for="role">角色：</label>
        <select id="role" v-model="role">
          <option value="student">学生</option>
          <option value="admin">管理员</option>
        </select>
      </div>
      <button type="submit">注册</button>
      <p>已有账号？<router-link to="/login">去登录</router-link></p>
    </form>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      password: '',
      phoneNumber: '',
      role: 'student',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      try {
  const response = await axios.post('http://localhost:8080/user/register', { // 修改为绝对路径
    username: this.username,
    password: this.password,
    phoneNumber: this.phoneNumber,
    role: this.role
  });
  this.successMessage = response.data.message;
  this.errorMessage = '';
  // 清空表单
  this.username = '';
  this.password = '';
  this.phoneNumber = '';
  this.role = 'student';
} catch (error) {
  if (error.response && error.response.data) {
      this.errorMessage = error.response.data.message || '注册失败';
  } else {
      this.errorMessage = '注册失败，请检查网络连接或稍后重试';
  }
  this.successMessage = '';
}
}
  }
}

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