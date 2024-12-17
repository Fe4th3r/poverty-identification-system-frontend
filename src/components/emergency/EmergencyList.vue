<template>
  <div>
    <h4>突发状况信息</h4>
    <button v-if="!showForm" @click="showAddForm">添加突发状况信息</button>

    <table v-if="emergencies.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>突发状况描述</th>
          <th>发生日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emergency in emergencies" :key="emergency.id">
          <td>{{ emergency.id }}</td>
          <td>{{ emergency.description }}</td>
          <td>{{ formatDate(emergency.occurrenceDate) }}</td>
          <td>
            <button @click="showEditForm(emergency)">编辑</button>
            <button @click="deleteEmergency(emergency.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else-if="!showForm">暂无突发状况信息</p>

    <div v-if="showForm">
      <EmergencyForm :studentId="studentId" :emergency="currentEmergency" @save="handleSave" @cancel="resetForm" />
    </div>
  </div>
</template>

<script>
import EmergencyForm from './EmergencyForm.vue';
import axios from 'axios';

export default {
  name: 'EmergencyList',
  components: {
    EmergencyForm,
  },
  props: {
    studentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      emergencies: [],
      showForm: false,
      currentEmergency: null,
    };
  },
  mounted() {
  },
  methods: {
    async fetchEmergencies() {
      try {
        const response = await axios.get(`http://localhost:8080/emergency/${this.studentId}`); // 修改为绝对路径
        this.emergencies = response.data;
      } catch (error) {
        console.error('获取突发状况信息失败:', error);
      }
    },
    showAddForm() {
      this.currentEmergency = null;
      this.showForm = true;
    },
    showEditForm(emergency) {
      this.currentEmergency = { ...emergency };
      this.showForm = true;
    },
    async handleSave({ studentId, emergency }) {
      if (this.currentEmergency && this.currentEmergency.id) {
        // 编辑
        try {
          const response = await axios.put(`http://localhost:8080/emergency/${emergency.id}`, emergency); // 修改为绝对路径
          if (response.status === 200) {
            this.fetchEmergencies();
            this.resetForm();
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('更新突发状况信息失败:', error);
          alert('更新失败');
        }
      } else {
        // 添加
        try {
          const response = await axios.post(`http://localhost:8080/emergency/${studentId}`, emergency); // 修改为绝对路径
          if (response.status === 200) {
            this.fetchEmergencies();
            this.resetForm();
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('添加突发状况信息失败:', error);
          alert('添加失败');
        }
      }
    },
    async deleteEmergency(id) {
      if (confirm('确定要删除该突发状况信息吗？')) {
        try {
          await axios.delete(`http://localhost:8080/emergency/${id}`); // 修改为绝对路径
          this.fetchEmergencies();
        } catch (error) {
          console.error('删除突发状况信息失败:', error);
        }
      }
    },
    resetForm() {
      this.showForm = false;
      this.currentEmergency = null;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    },
  },
};
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>