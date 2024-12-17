<template>
    <div>
      <h2>贫困生甄别</h2>
      <button @click="identifyPovertyLevels">执行甄别</button>
  
      <div v-if="message">
        <h3>甄别结果:</h3>
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PovertyIdentification',
    data() {
      return {
        message: null,
      };
    },
    methods: {
      async identifyPovertyLevels() {
        try {
          const response = await axios.post('/api/poverty-identification/identify');
          this.message = response.data.message;
        } catch (error) {
          console.error('贫困生甄别失败:', error);
          this.message = '贫困生甄别失败';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 可以根据需要添加样式 */
  </style>