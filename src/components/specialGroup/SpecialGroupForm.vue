<template>
    <div class="special-group-form">
      <h3>{{ specialGroup ? '编辑' : '添加' }}特殊群体信息</h3>
      <form @submit.prevent="save">
        <div class="form-group">
          <label for="groupType">特殊群体类型:</label>
          <select id="groupType" v-model="formData.groupType" required>
            <option value="低保户">低保户</option>
            <option value="建档立卡贫困户">建档立卡贫困户</option>
            <option value="残疾人家庭">残疾人家庭</option>
            <option value="单亲家庭">单亲家庭</option>
            <option value="孤儿">孤儿</option>
            <!-- 其他类型 -->
          </select>
        </div>
        <!-- 其他字段的输入框 -->
  
        <button type="submit">保存</button>
        <button type="button" @click="cancel">取消</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SpecialGroupForm',
    props: {
      studentId: {
        type: Number,
        required: true
      },
      specialGroup: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        formData: {
          groupType: '',
          // ... 其他字段
        },
      };
    },
    watch: {
      specialGroup: {
        handler(newVal) {
          if (newVal) {
            this.formData = { ...newVal };
          } else {
            this.formData = { groupType: '' };
          }
        },
        immediate: true,
        deep: true,
      }
    },
    methods: {
      save() {
        this.$emit('save', { studentId: this.studentId, specialGroup: this.formData });
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