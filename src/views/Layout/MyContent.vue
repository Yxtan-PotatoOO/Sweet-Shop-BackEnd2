<template>
  <div>
    <div class="header">
      <!--
        展开侧边栏和收起侧边栏的按钮
        如果isCollapse是true，就展开，就第一个i
         @click="foldMenu" --- 操作侧边栏
       -->
      <i v-if="!isCollapse" class="el-icon-s-fold" @click="foldMenu"></i>
      <i v-else class="el-icon-s-unfold" @click="foldMenu"></i>
      <div class="right">
        欢迎：{{userinfo.adminID}}
        <i class="el-icon-switch-button" @click="logout"></i>
      </div>
    </div>
    <div class="content">
      <!-- 路由显示出口 -->
      <router-view />
    </div>
  </div>
</template>

<script>
  import {
    mapState,mapMutations
  } from 'vuex'
  export default {
    // 从父级（Layout）接收这个值，判断是否折叠
    props: ['isCollapse'],
    computed: {
      ...mapState('loginModule', ['userinfo'])
    },
    methods: {
      ...mapMutations('loginModule',['clearUser']),
      foldMenu() {
        // 从父级（Layout）接收这个值给点击事件
        this.$emit('changeCollapse')
      },
      logout(){
        console.log("out")
        this.clearUser()
        localStorage.removeItem('adminID')
        this.$router.push('/MyLogin')
      }
    }
  }
</script>

<style scoped>
  .header {
    height: 60px;
    background-color: rosybrown;
  }

  .header i {
    font-size: 28px;
    margin: 15px;
  }

  .right {
    float: right;
  }
  .content{
    background-color: #fffffd;
  }
</style>
