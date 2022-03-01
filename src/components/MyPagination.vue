<template>
  <div class="paginationbox">
    <!--
    :page-size="pageSize" --- 绑定父组件的总页数
    :total="total" --- 绑定父组件传过来的总页数总条数
    @current-change="handleCurrentChange" --- 表格的当前行发生变化的时候会触发该事件
    :current-page.sync="currentPage" --- 绑定父组件传来的当前页数
    -->
    <el-pagination :page-size="pageSize" background layout="total, prev, pager, next, jumper" :total="total"
      @current-change="handleCurrentChange" :current-page.sync="currentPage">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    // 接收父组件传来的值
    props: {
      total: {
        type: Number,
        default: 100
      },
      pageSize: {
        type: Number,
        default: 10
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    methods: {
      handleCurrentChange(page) {
        // 给父级，告诉父级当前切换到第几页了
        this.$emit('changePage', page)
      }
    }
  }
</script>

<style>
  .paginationbox {
    text-align: center;
    margin-top: 20px;
  }
</style>
