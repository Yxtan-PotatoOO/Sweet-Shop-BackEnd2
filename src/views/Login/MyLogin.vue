<template>
  <div class="bigbox">
    <div class="loginbox">
      <div class="box">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <el-form-item label="用户名" prop="adminID">
            <el-input v-model="loginForm.adminID"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="adminPwd ">
            <el-input v-model="loginForm.adminPwd "></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">确定</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import jwt from 'jwt-decode'
  import {
    mapMutations
  } from 'vuex'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      return {
        // 写数据库字段
        loginForm: {
          adminID: '',
          adminPwd: ''
        },

        // 校验
        rules: {
          adminID: [{
            validator: validateUser,
            trigger: 'blur'
          }, ],
          adminPwd: [{
            validator: validatePass,
            trigger: 'change'
          }]
        }
      };

    },
    methods: {
      ...mapMutations('loginModule', ['setUser']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('ok', this.loginForm)
            let {
              adminID,
              adminPwd
            } = this.loginForm
            this.$api.getLogin({
              adminID,
              adminPwd
            }).then(res => {
              console.log(res.data)
              if (res.data.status === 200) {
                // 安装jwt-decode，解析
                console.log(jwt(res.data.data))
                // 登录成功
                // 存储信息，跳转网页，显示用户名，做持久化
                let obj = {
                  adminID:jwt(res.data.data).adminID,
                  token:res.data.data
                }
                this.setUser(obj)
                // 存储本地
                localStorage.setItem('adminID',JSON.stringify(obj))
                // 跳转
                this.$router.push('/').catch(err =>{})
              } else {
                this.$message({
                  type: 'error',
                  message: '账号或密码错误!'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

    }

  }
</script>

<style scoped="scoped">
  .bigbox{
    width: 100%;
    height: 100%;
    background-color: #e2c1ff;
    position: absolute;
    top: 0;
    bottom: 0;
  }
  .loginbox {
    width: 400px;
    height: 300px;
    margin: 150px auto;
    border-radius: 10px;
    border: 1px solid #EEEEEE;
    background-color: #fff;
  }

  .box {
    margin-top: 70px;
    margin-right: 80px;
  }
</style>
