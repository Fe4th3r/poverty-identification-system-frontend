<template>
  <div>
    <h2>数据清洗</h2>
    <button @click="cleanStudentData">清洗学生数据</button>
    <button @click="cleanFamilyInfoData">清洗家庭信息数据</button>
    <button @click="cleanSpecialGroupData">清洗特殊群体数据</button>
    <!-- 其他清洗按钮 -->

    <div v-if="result">
      <h3>清洗结果:</h3>
      <p>总记录数: {{ result.total }}</p>
      <p>已清洗记录数: {{ result.cleaned }}</p>
      <p>错误记录数: {{ result.error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DataCleaning',
  data() {
    return {
      result: null,
    };
  },
  methods: {
    async cleanStudentData() {
      try {
        const response = await axios.post('http://localhost:8080/data-cleaning/student'); // 修改为绝对路径
        this.result = response.data;
      } catch (error) {
        console.error('清洗学生数据失败:', error);
        alert('清洗学生数据失败');
      }
    },
    async cleanFamilyInfoData() {
      try {
        const response = await axios.post('http://localhost:8080/data-cleaning/family-info'); // 修改为绝对路径
        this.result = response.data;
      } catch (error) {
        console.error('清洗家庭信息数据失败:', error);
        alert('清洗家庭信息数据失败');
      }
    },
    async cleanSpecialGroupData() {
      try {
        const response = await axios.post('http://localhost:8080/data-cleaning/special-group'); // 修改为绝对路径
        this.result = response.data;
      } catch (error) {
        console.error('清洗特殊群体数据失败:', error);
        alert('清洗特殊群体数据失败');
      }
    },
    // ... 其他清洗方法
  },
};
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>