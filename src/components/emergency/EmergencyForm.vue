<template>
    <div class="emergency-form">
      <h3>{{ emergency ? '编辑' : '添加' }}突发状况信息</h3>
      <form @submit.prevent="save">
        <div class="form-group">
          <label for="description">突发状况描述:</label>
          <textarea id="description" v-model="formData.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="occurrenceDate">发生日期:</label>
          <input type="date" id="occurrenceDate" v-model="formData.occurrenceDate" required>
        </div>
        <!-- 其他字段的输入框 -->
  
        <button type="submit">保存</button>
        <button type="button" @click="cancel">取消</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EmergencyForm',
    props: {
      studentId: {
        type: Number,
        required: true
      },
      emergency: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        formData: {
          description: '',
          occurrenceDate: null,
          // ... 其他字段
        },
      };
    },
    watch: {
      emergency: {
        handler(newVal) {
          if (newVal) {
            this.formData = { ...newVal };
          } else {
            this.formData = { description: '', occurrenceDate: null };
          }
        },
        immediate: true,
        deep: true,
      }
    },
    methods: {
      save() {
        this.$emit('save', { studentId: this.studentId, emergency: this.formData });
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