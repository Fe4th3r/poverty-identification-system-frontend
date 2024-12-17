<template>
    <div class="family-info-form">
      <h3>{{ familyInfo ? '编辑' : '添加' }}家庭信息</h3>
      <form @submit.prevent="save">
        <div class="form-group">
          <label for="address">家庭住址:</label>
          <input type="text" id="address" v-model="formData.address" required>
        </div>
        <div class="form-group">
          <label for="population">家庭人口:</label>
          <input type="number" id="population" v-model.number="formData.population" required>
        </div>
        <div class="form-group">
          <label for="totalIncome">家庭年总收入:</label>
          <input type="number" id="totalIncome" v-model.number="formData.totalIncome" required>
        </div>
        <!-- 其他字段的输入框 -->
  
        <button type="submit">保存</button>
        <button type="button" @click="cancel">取消</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FamilyInfoForm',
    props: {
      studentId: { // 新增接收 studentId 的 prop
        type: Number,
        required: true
      },
      familyInfo: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        formData: {
          address: '',
          population: null,
          totalIncome: null,
          // ... 其他字段
        },
      };
    },
    mounted() {
      if (this.familyInfo) {
        this.formData = { ...this.familyInfo };
      }
    },
    methods: {
      save() {
        this.$emit('save', { studentId: this.studentId, familyInfo: this.formData });
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