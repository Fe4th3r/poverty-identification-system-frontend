import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';

// 引入并注册axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// 配置 axios 的基础 URL
// axios.defaults.baseURL = 'http://localhost:8080'; 

const app = createApp(App);
// 可以添加请求拦截器和响应拦截器
// axios.interceptors.request.use(config => {
//   // 在发送请求之前做些什么，例如添加 token
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
//   // 对响应数据做点什么
//   return response;
// }, error => {
//   // 对响应错误做点什么
//   if (error.response.status === 401) {
//     // 如果返回 401 Unauthorized，则跳转到登录页面
//     router.push('/login');
//   }
//   return Promise.reject(error);
// });

//挂载router
app.use(router);
// 挂载axios
app.use(VueAxios, axios)

app.mount('#app');