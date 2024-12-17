<template>
    <div class="work-study-form">
      <h3>{{ workStudy ? '编辑' : '添加' }}勤工助学信息</h3>
      <form @submit.prevent="save">
        <div class="form-group">
          <label for="position">岗位名称:</label>
          <input type="text" id="position" v-model="formData.position" required>
        </div>
        <div class="form-group">
          <label for="startDate">开始日期:</label>
          <input type="date" id="startDate" v-model="formData.startDate" required>
        </div>
        <div class="form-group">
          <label for="endDate">结束日期:</label>
          <input type="date" id="endDate" v-model="formData.endDate">
        </div>
        <div class="form-group">
          <label for="monthlySalary">月收入:</label>
          <input type="text" id="monthlySalary" v-model="formData.monthlySalary" required>
        </div>
        <!-- 其他字段的输入框 -->
  
        <button type="submit">保存</button>
        <button type="button" @click="cancel">取消</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WorkStudyForm',
    props: {
      studentId: {
        type: Number,
        required: true
      },
      workStudy: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        formData: {
          position: '',
          startDate: null,
          endDate: null,
          monthlySalary: '',
          // ... 其他字段
        },
      };
    },
    watch: {
      workStudy: {
        handler(newVal) {
          if (newVal) {
            this.formData = { ...newVal };
          } else {
            this.formData = { position: '', startDate: null, endDate: null, monthlySalary: '' };
          }
        },
        immediate: true,
        deep: true,
      }
    },
    methods: {
      save() {
        this.$emit('save', { studentId: this.studentId, workStudy: this.formData });
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