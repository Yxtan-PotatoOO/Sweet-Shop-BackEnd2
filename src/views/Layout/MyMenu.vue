<template>
  <div style="background-color: #e2c1ff;">
    <!--
      :default-active="$route.path" --- 绑定路由表
      router --- 开启路由
      :collapse="isCollapse" --- 展开/收起侧边栏
     -->
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router :collapse="isCollapse" style="background-color: #e2c1ff;">
      <!-- index --- 写对应跳转 -->
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/MyGoods">
        <i class="el-icon-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-submenu index="/MyOrders">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/MyOrders/OrderList">订单列表</el-menu-item>
          <el-menu-item index="/MyOrders/ReturnList">退货订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/MyCenter">
        <i class="el-icon-setting"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    // 从父级（MyLayout）接收这个值，判断是否折叠
    props:['isCollapse']
  }
</script>

<style>
  /* 侧边栏的宽度 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background-color: #e2c1ff;
  }
</style>
