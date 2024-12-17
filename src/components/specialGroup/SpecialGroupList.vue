<template>
  <div>
    <h4>特殊群体信息</h4>
    <button v-if="!showForm" @click="showAddForm">添加特殊群体信息</button>

    <table v-if="specialGroups.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>特殊群体类型</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in specialGroups" :key="group.id">
          <td>{{ group.id }}</td>
          <td>{{ group.groupType }}</td>
          <td>
            <button @click="showEditForm(group)">编辑</button>
            <button @click="deleteSpecialGroup(group.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else-if="!showForm">暂无特殊群体信息</p>
    <div v-if="showForm">
      <SpecialGroupForm :studentId="studentId" :specialGroup="currentSpecialGroup" @save="handleSave"
        @cancel="resetForm" />
    </div>
  </div>
</template>

<script>
import SpecialGroupForm from './SpecialGroupForm.vue';
import axios from 'axios';

export default {
  name: 'SpecialGroupList',
  components: {
    SpecialGroupForm,
  },
  props: {
    studentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      specialGroups: [],
      showForm: false,
      currentSpecialGroup: null,
    };
  },
  mounted() {
    this.fetchSpecialGroups();
  },
  methods: {
    async fetchSpecialGroups() {
      try {
        const response = await axios.get(`http://localhost:8080/special-group/${this.studentId}`); // 修改为绝对路径
        this.specialGroups = response.data;
      } catch (error) {
        console.error('获取特殊群体信息失败:', error);
      }
    },
    showAddForm() {
      this.currentSpecialGroup = null;
      this.showForm = true;
    },
    showEditForm(group) {
      this.currentSpecialGroup = { ...group };
      this.showForm = true;
    },
    async handleSave({ studentId, specialGroup }) {
      if (this.currentSpecialGroup && this.currentSpecialGroup.id) {
        // 编辑
        try {
          const response = await axios.put(`http://localhost:8080/special-group/${specialGroup.id}`, specialGroup); // 修改为绝对路径
          if (response.status === 200) {
            this.fetchSpecialGroups()
            this.resetForm();
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('更新特殊群体信息失败:', error);
          alert('更新失败');
        }
      } else {
        // 添加
        try {
          const response = await axios.post(`http://localhost:8080/special-group/${studentId}`, specialGroup); // 修改为绝对路径
          if (response.status === 200) {
            this.fetchSpecialGroups()
            this.resetForm();
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('添加特殊群体信息失败:', error);
          alert('添加失败');
        }
      }

    },
    async deleteSpecialGroup(id) {
      if (confirm('确定要删除该特殊群体信息吗？')) {
        try {
          await axios.delete(`http://localhost:8080/special-group/${id}`); // 修改为绝对路径
          this.fetchSpecialGroups();
        } catch (error) {
          console.error('删除特殊群体信息失败:', error);
        }
      }
    },
    resetForm() {
      this.showForm = false;
      this.currentSpecialGroup = null;
    },
  },
};
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>