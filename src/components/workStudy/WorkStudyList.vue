<template>
  <div>
    <h4>勤工助学信息</h4>
    <button v-if="!showForm" @click="showAddForm">添加勤工助学信息</button>

    <table v-if="workStudies.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>岗位名称</th>
          <th>开始日期</th>
          <th>结束日期</th>
          <th>月收入</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="workStudy in workStudies" :key="workStudy.id">
          <td>{{ workStudy.id }}</td>
          <td>{{ workStudy.position }}</td>
          <td>{{ formatDate(workStudy.startDate) }}</td>
          <td>{{ formatDate(workStudy.endDate) }}</td>
          <td>{{ workStudy.monthlySalary }}</td>
          <td>
            <button @click="showEditForm(workStudy)">编辑</button>
            <button @click="deleteWorkStudy(workStudy.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else-if="!showForm">暂无勤工助学信息</p>

    <div v-if="showForm">
      <WorkStudyForm :studentId="studentId" :workStudy="currentWorkStudy" @save="handleSave" @cancel="resetForm" />
    </div>
  </div>
</template>

<script>
import WorkStudyForm from './WorkStudyForm.vue';
import axios from 'axios';

export default {
  name: 'WorkStudyList',
  components: {
    WorkStudyForm,
  },
  props: {
    studentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      workStudies: [],
      showForm: false,
      currentWorkStudy: null,
    };
  },
  mounted() {
    this.fetchWorkStudies();
  },
  methods: {
    async fetchWorkStudies() {
      try {
        const response = await axios.get(`http://localhost:8080/work-study/${this.studentId}`); // 修改为绝对路径
        this.workStudies = response.data;
      } catch (error) {
        console.error('获取勤工助学信息失败:', error);
      }
    },
    showAddForm() {
      this.currentWorkStudy = null;
      this.showForm = true;
    },
    showEditForm(workStudy) {
      this.currentWorkStudy = { ...workStudy };
      this.showForm = true;
    },
    async handleSave({ studentId, workStudy }) {
      if (this.currentWorkStudy && this.currentWorkStudy.id) {
        // 编辑
        try {
          const response = await axios.put(`http://localhost:8080/work-study/${workStudy.id}`, workStudy); // 修改为绝对路径
          if (response.status === 200) {
            this.fetchWorkStudies();
            this.resetForm();
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('更新勤工助学信息失败:', error);
          alert('更新失败');
        }
      } else {
        // 添加
        try {
          const response = await axios.post(`http://localhost:8080/work-study/${studentId}`, workStudy); // 修改为绝对路径
          if (response.status === 200) {
            this.fetchWorkStudies();
            this.resetForm();
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('添加勤工助学信息失败:', error);
          alert('添加失败');
        }
      }
    },
    async deleteWorkStudy(id) {
      if (confirm('确定要删除该勤工助学信息吗？')) {
        try {
          await axios.delete(`http://localhost:8080/work-study/${id}`); // 修改为绝对路径
          this.fetchWorkStudies();
        } catch (error) {
          console.error('删除勤工助学信息失败:', error);
        }
      }
    },
    resetForm() {
      this.showForm = false;
      this.currentWorkStudy = null;
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