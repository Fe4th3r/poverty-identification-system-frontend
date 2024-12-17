import { createRouter, createWebHashHistory } from 'vue-router'; // 导入 createWebHashHistory
import HomePage from '../components/HomePage.vue';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import StudentList from "../components/student/StudentList.vue";
import DataCleaning from '../components/dataCleaning/DataCleaning.vue';
import PovertyIdentification from '../components/PovertyIdentification/PovertyIdentification.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister
  },
  {
    path: '/student',
    name: 'StudentList',
    component: StudentList
  },
  {
    path: '/data-cleaning',
    name: 'DataCleaning',
    component: DataCleaning,
  },
  {
    path: '/poverty-identification',
    name: 'PovertyIdentification',
    component: PovertyIdentification,
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 使用 createWebHashHistory() 创建 hash 模式的路由
  routes
});

export default router;