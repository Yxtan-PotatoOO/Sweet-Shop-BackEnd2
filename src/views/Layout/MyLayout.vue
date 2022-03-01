<template>
  <div class="layout">
    <!--
    :isCollapse='isCollapse' --- 传值给子组件
     @changeCollapse='changeCollapse' --- 将事件传给子组件（Content）
     :class="['content',{'fold': isCollapse}]" --- 动态绑定class，Content部分也跟着Menu展开折叠
     -->
    <Menu class='menu' :isCollapse='isCollapse' />
    <Content :class="['content',{'fold': isCollapse}]" @changeCollapse='changeCollapse' :isCollapse='isCollapse' />
  </div>
</template>

<script>
  import Menu from './MyMenu.vue'
  import Content from './MyContent.vue'
  export default {
    components: {
      Menu,
      Content
    },
    data() {
      return {
        // 默认展开状态
        isCollapse: false
      }
    },
    methods: {
      changeCollapse() {
        // 点击切换
        this.isCollapse = !this.isCollapse;
      }
    }
  }
</script>

<style scoped>
  .menu {
    position: fixed;
    top: 0;
    bottom: 0;
    /* 去除之前布局用的background-color、min-height、width */
  }

  .content {
    margin-left: 200px;
  }

  .fold {
    margin-left: 64px;
  }
</style>
