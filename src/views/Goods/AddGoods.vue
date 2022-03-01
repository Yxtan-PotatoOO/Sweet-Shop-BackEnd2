<template>
  <div class="addgoodsbox">
    <div class="navTitle">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/MyGoods' }">商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="formbox">
      <!-- 默认的ruleForm统一改成了sysinfoForm，可以不修改，不影响 -->
      <el-form :model="sysinfoForm" :rules="rules" ref="sysinfoForm" label-width="100px" class="demo-sysinfoForm">
        <el-form-item label="标题选择" prop="SerTitle">
          <el-button type="primary">标题选择</el-button>
        </el-form-item>
        <el-form-item label="用户名" prop="usrID">
          <el-input v-model="sysinfoForm.usrID"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="SerContent">
          <el-input v-model="sysinfoForm.SerContent"></el-input>
        </el-form-item>
        <el-form-item label="发布人" prop="adminID">
          <el-input v-model="sysinfoForm.adminID"></el-input>
        </el-form-item>
        <el-form-item label="凑数" prop="test1">
          <el-input v-model="sysinfoForm.test1"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="test2">
          <el-button type="primary">上传图片</el-button>
        </el-form-item>
        <el-form-item label="凑数" prop="test3">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="sysinfoForm.test3"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('sysinfoForm')">确定</el-button>
          <el-button @click="resetForm('sysinfoForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
     data() {
          return {
            // 写数据库字段
            sysinfoForm: {
              usrID: '',
              SerTitle: '',
              adminID: '',
              SerContent: '',
              test1: '',
              test2: '',
              test3:''
            },
            // 校验
            rules: {
              usrID: [
                { required: true, message: '请输入用户', trigger: 'blur' },
              ],
              SerTitle: [
                { required: true, message: '请输入标题', trigger: 'change' }
              ],
              adminID: [
                { required: true, message: '请输入发布人', trigger: 'change' }
              ],
              SerContent: [
                { required: true, message: '请输入内容', trigger: 'change' }
              ]
            }
          };
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
      }
</script>

<style scoped='scoped'>
  .addgoodsbox{
    margin: 10px;
  }
  .navTitle{
    padding: 10px;
    background-color: #FFFFFF;
    border: 1px solid #eee;
  }
  .formbox{
    padding: 10px;
    background-color: #FFFFFF;
    margin-top: 20px;
    border: 1px solid #eee;
    padding-right: 30px;
    padding-top: 20px;
  }
</style>
