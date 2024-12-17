<template>
  <div>
    <h2>学生信息列表</h2>
    <button @click="fetchStudents">加载学生数据</button>
    <button @click="showAddForm">添加学生</button>
    <button @click="printStudentList">打印学生列表</button>
    <button @click="exportStudentData">导出学生数据</button>
    <br />
    <input type="text" v-model="searchName" placeholder="输入姓名搜索" />
    <button @click="searchStudents">搜索</button>

    <div id="printArea">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>身份证号</th>
            <th>专业</th>
            <th>贫困等级</th>
            <th>操作</th>
            <th>家庭信息操作</th>
            <th>特殊群体操作</th>
            <th>突发状况操作</th>
            <th>勤工助学操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.stuId }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.gender }}</td>
            <td>{{ student.idCard }}</td>
            <td>{{ student.major }}</td>
            <td>{{ student.povertyLevel ? student.povertyLevel : '未评定' }}</td>
            <td>
              <button @click="showEditForm(student)">编辑</button>
              <button @click="deleteStudent(student.id)">删除</button>
            </td>
            <td>
              <button v-if="!hasFamilyInfo(student)" @click="showAddFamilyInfoForm(student.id)">添加家庭信息</button>
              <button v-else @click="showEditFamilyInfoForm(student)">编辑家庭信息</button>
              <button v-if="hasFamilyInfo(student)" @click="deleteFamilyInfo(student.id)">删除家庭信息</button>
            </td>
            <td>
              <button @click="showSpecialGroupList(student.id)">查看</button>
            </td>
            <td>
              <button @click="showEmergencyList(student.id)">查看</button>
            </td>
            <td>
              <button @click="showWorkStudyList(student.id)">查看</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showForm">
      <StudentForm :student="currentStudent" @save="handleSave" @cancel="resetForm" />
    </div>
    <div v-if="showFamilyForm">
      <FamilyInfoForm :studentId="currentStudentId" :familyInfo="currentFamilyInfo" @save="handleFamilyInfoSave"
        @cancel="resetFamilyForm" />
    </div>
    <div v-if="showSpecialGroup">
      <SpecialGroupList :studentId="currentStudentId" />
    </div>
    <div v-if="showEmergency">
      <EmergencyList :studentId="currentStudentId" />
    </div>
    <div v-if="showWorkStudy">
      <WorkStudyList :studentId="currentStudentId" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import StudentForm from './StudentForm.vue';
import FamilyInfoForm from '../family/FamilyInfoForm.vue';
import SpecialGroupList from '../specialGroup/SpecialGroupList.vue';
import EmergencyList from '../emergency/EmergencyList.vue';
import WorkStudyList from '../workStudy/WorkStudyList.vue';

export default {
  name: 'StudentList',
  components: {
    StudentForm,
    FamilyInfoForm,
    SpecialGroupList,
    EmergencyList,
    WorkStudyList
  },
  data() {
    return {
      students: [],
      searchName: '',
      showForm: false,
      showFamilyForm: false,
      showSpecialGroup: false,
      showEmergency: false,
      showWorkStudy: false,
      currentStudent: null,
      currentStudentId: null,
      currentFamilyInfo: null,
    };
  },

  methods: {
    async fetchStudents() {
      try {
        const response = await axios.get('http://localhost:8080/student'); // 修改为绝对路径
        this.students = response.data;
      } catch (error) {
        console.error('获取学生信息失败:', error);
      }
    },
    async searchStudents() {
      try {
        const response = await axios.get('http://localhost:8080/student/search', { // 修改为绝对路径
          params: {
            name: this.searchName,
          },
        });
        this.students = response.data;
      } catch (error) {
        console.error('搜索学生信息失败:', error);
      }
    },
    showAddForm() {
      this.currentStudent = null;
      this.showForm = true;
    },
    showEditForm(student) {
      this.currentStudent = { ...student }; // 复制一份，避免直接修改原数据
      this.showForm = true;
    },
    async deleteStudent(id) {
      if (confirm('确定要删除该学生信息吗？')) {
        try {
          await axios.delete(`http://localhost:8080/student/${id}`); // 修改为绝对路径
          this.fetchStudents(); // 删除后重新加载列表
        } catch (error) {
          console.error('删除学生信息失败:', error);
        }
      }
    },
    handleSave(studentData) {
      if (studentData.id) {
        // 编辑
        this.updateStudent(studentData);
      } else {
        // 添加
        this.addStudent(studentData);
      }
    },
    async addStudent(studentData) {
      try {
        const response = await axios.post('http://localhost:8080/student', studentData); // 修改为绝对路径
        if (response.status === 200) {
          this.fetchStudents(); // 添加后重新加载列表
          this.resetForm();
        } else {
          alert(response.data.message); // 显示错误信息
        }
      } catch (error) {
        console.error('添加学生信息失败:', error);
        alert('添加失败');
      }
    },
    async updateStudent(studentData) {
      try {
        const response = await axios.put(`http://localhost:8080/student/${studentData.id}`, studentData); // 修改为绝对路径
        if (response.status === 200) {
          this.fetchStudents(); // 更新后重新加载列表
          this.resetForm();
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('更新学生信息失败:', error);
        alert('更新失败');
      }
    },
    resetForm() {
      this.showForm = false;
      this.currentStudent = null;
    },
    hasFamilyInfo(student) {
      return student.familyInfo !== null;
    },
    showAddFamilyInfoForm(studentId) {
      this.currentStudentId = studentId;
      this.currentFamilyInfo = null;
      this.showFamilyForm = true;
    },
    async showEditFamilyInfoForm(student) {
      this.currentStudentId = student.id;
      // 获取家庭信息
      try {
        const response = await axios.get(`http://localhost:8080/family-info/${student.id}`); // 修改为绝对路径
        this.currentFamilyInfo = response.data;
      } catch (error) {
        console.error("获取家庭信息失败:", error);
        this.currentFamilyInfo = null; // 获取失败也要重置
      }
      this.showFamilyForm = true;
    },
    async deleteFamilyInfo(studentId) {
      if (confirm('确定要删除该学生的家庭信息吗？')) {
        try {
          await axios.delete(`http://localhost:8080/family-info/${studentId}`); // 修改为绝对路径
          this.fetchStudents(); // 重新加载学生列表
        } catch (error) {
          console.error('删除家庭信息失败:', error);
        }
      }
    },
    async handleFamilyInfoSave({ studentId, familyInfo }) {
      if (this.currentFamilyInfo && this.currentFamilyInfo.id) {
        // 编辑
        try {
          const response = await axios.put(`http://localhost:8080/family-info/${studentId}`, familyInfo); // 修改为绝对路径
          if (response.status === 200) {
            this.fetchStudents(); // 重新加载学生列表
            this.resetFamilyForm();
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('更新家庭信息失败:', error);
          alert('更新失败');
        }
      } else {
        // 添加
        try {
          const response = await axios.post(`http://localhost:8080/family-info/${studentId}`, familyInfo); // 修改为绝对路径
          if (response.status === 200) {
            this.fetchStudents(); // 重新加载学生列表
            this.resetFamilyForm();
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('添加家庭信息失败:', error);
          alert('添加失败');
        }
      }
    },
    resetFamilyForm() {
      this.showFamilyForm = false;
      this.currentStudentId = null;
      this.currentFamilyInfo = null;
    },
    showSpecialGroupList(studentId) {
      this.currentStudentId = studentId;
      this.showSpecialGroup = true;
    },
    async deleteSpecialGroup(id) {
      if (confirm('确定要删除该学生的特殊群体信息吗？')) {
        try {
          await axios.delete(`/special-group/${id}`);
          this.fetchStudents(); // 重新加载学生列表
        } catch (error) {
          console.error('删除特殊群体信息失败:', error);
        }
      }
    },
    resetSpecialGroupList() {
      this.showSpecialGroup = false;
      this.currentStudentId = null;
    },
    showEmergencyList(studentId) {
      this.currentStudentId = studentId;
      this.showEmergency = true;
    },
    resetEmergencyList() {
      this.showEmergency = false;
      this.currentStudentId = null;
    },
    showWorkStudyList(studentId) {
    this.currentStudentId = studentId;
    this.showWorkStudy = true;
    },
    resetWorkStudyList() {
      this.showWorkStudy = false;
      this.currentStudentId = null;
    },
    printStudentList() {
    window.print();
  },
  async exportStudentData() {
    try {
      const response = await axios.get('http://localhost:8080/student/export', { // 修改为绝对路径
        responseType: 'blob', // 重要：指定响应类型为 blob
      });

      // 从响应头中获取文件名 (后端需要设置 Content-Disposition 头)
      const disposition = response.headers['content-disposition'];
      let filename = 'student_data.xlsx'; // 默认文件名
      if (disposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      // 创建一个 Blob URL 并触发下载
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('导出学生数据失败:', error);
      alert('导出学生数据失败');
    }
  },
  },
};
</script>

<style scoped>
table {
border-collapse: collapse;
width: 100%;
}

th,
td {
border: 1px solid black;
padding: 8px;
text-align: left;
}

@media print {
/* 打印样式 */
body * {
  visibility: hidden;
}

#printArea,
#printArea * {
  visibility: visible;
}

#printArea {
  position: absolute;
  left: 0;
  top: 0;
}

/* 隐藏不需要打印的元素 */
button,
input,
.router-link-active,
nav {
  display: none;
}

@media print {
  /* 隐藏不需要打印的元素 */
  button,
  input,
  .router-link-active,
  nav {
    display: none;
  }
}

#printArea {
    position: absolute; /* 确保打印区域独立于其他元素 */
    left: 0;
    top: 0;
    width: 100%; /* 设置打印区域的宽度 */
    visibility: visible; /* 确保打印区域可见 */
    font-size: 12px; /* 可以根据需要调整字体大小 */
  }
    /* 清除浮动 */
 #printArea::after {
   content: "";
   display: table;
   clear: both;
 }
 @media print {
  /* ... 隐藏不需要打印的元素 */
  /* ... 设置打印区域的样式 */

  table {
    border-collapse: collapse;
    width: 100%;
    table-layout: auto; /* 自动表格布局 */
    page-break-inside: auto; /* 避免表格内部的分页 */
  }

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
    word-break: normal; /* 允许在单词内换行 */
    page-break-inside: avoid; /* 避免单元格内部的分页 */
  }
  th {
    background-color: #f2f2f2; /* 表头背景色 */
  }
  @page {
    size: auto; /* 自动纸张大小 */
    margin: 20mm; /* 设置页边距 */
  }
  tr, td, th {
         page-break-inside: avoid; /* 避免表格行、单元格被截断 */
     }
     thead {
       display: table-header-group; /* 表头始终显示 */
     }
     
     tfoot {
       display: table-footer-group; /* 表尾始终显示 */
     }
}
}
</style>