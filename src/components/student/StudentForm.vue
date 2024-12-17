<template>
    <div class="student-form">
      <h3>{{ student ? '编辑' : '添加' }}学生信息</h3>
      <form @submit.prevent="save">
        <div class="form-group">
          <label for="stuId">学号:</label>
          <input type="text" id="stuId" v-model="formData.stuId" :disabled="student" required>
        </div>
        <div class="form-group">
          <label for="name">姓名:</label>
          <input type="text" id="name" v-model="formData.name" required>
        </div>
        <div class="form-group">
          <label for="gender">性别:</label>
          <select id="gender" v-model="formData.gender">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
        <div class="form-group">
          <label for="idCard">身份证号:</label>
          <input type="text" id="idCard" v-model="formData.idCard" required>
        </div>
        <div class="form-group">
          <label for="major">专业:</label>
          <input type="text" id="major" v-model="formData.major" required>
        </div>
        <button type="submit">保存</button>
        <button type="button" @click="cancel">取消</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StudentForm',
    props: {
      student: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        formData: {
          stuId: '',
          name: '',
          gender: '男',
          idCard: '',
          major: '',
        },
      };
    },
    mounted() {
      if (this.student) {
        // 如果传入了 student 对象，则初始化表单数据
        this.formData = { ...this.student };
      }
    },
    methods: {
      save() {
        this.$emit('save', this.formData);
      },
      cancel() {
        this.$emit('cancel');
      },
    },
  };
  </script>
  
  
  <style scoped>
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }
  </style>