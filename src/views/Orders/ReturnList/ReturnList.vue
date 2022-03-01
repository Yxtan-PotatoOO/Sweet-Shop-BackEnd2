<template>
  <div class="goodsbox">
    <div class="searchbox">
      <!-- @change --- 失去焦点或回车触发（el-input自带） -->
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input" @change='handleSearchInput'>
      </el-input>
      <el-button type="primary" icon="el-icon-plus">弹窗</el-button>
    </div>
    <div class="tablebox">
      <!--
      show-overflow-tooltip --- 隐藏溢出文字
      prop --- 对应数据库
      -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="usrID" label="接收人微信号" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="SerTitle" label="发布题目">
        </el-table-column>
        <el-table-column prop="SerContent" label="发布内容" width="200" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="SerDateTime" label="发布时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="adminID" label="发布人账号">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页引用组件 -->
    <div class="pagination">
      <!--
      :total='total' --- 总条数，接收后台数据，传给子组件
      :pageSize='pageSize' --- 总页数，接收后台数据，传给子组件
      @changePage='changePage' --- 获取子组件传过来的当前页码，调用方法接收后台数据
      :currentPage="currentPage" --- 当前在第几页，传给子组件
      -->
      <MyPagination :total='total' :pageSize='pageSize' @changePage='changePage' :currentPage="currentPage" />
    </div>

  </div>
</template>
<script>
  // 引用组件
  import MyPagination from '../../../components/MyPagination'
  export default {
    data() {
      return {
        input: '',
        tableData: [],
        total: 10,
        pageSize: 1,
        // 没有搜索时
        type: 1,
        // 用于分页切分数据
        totalData: [],
        // 选中页码
        currentPage: 1,
      }
    },
    components: {
      MyPagination
    },
    methods: {
      // 封装函数：获取系统信息列表
      getSysInfo(page) {
        this.$api.getsysInfoList({
          page,
        }).then(res => {
          if (res.data.status === 200) {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }
          console.log(res.data)
        })
      },
      // 编辑
      handleEdit(index, row) {
        console.log(index, row);
      },
      // 删除
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteItem({
            id: row.id
          }).then((res)=>{
            if(res.data.status === 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              // 重新获取表格数据
              this.getSysInfo(1)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 点击页数切换
      changePage(num) {
        // 当前选中页码
        this.currentPage = num;
        if (this.type == 1) {
          this.getSysInfo(num);
        } else {
          // 搜索
          this.tableData = this.totalData.slice((num - 1) * 8, num * 8);
        }
      },
      // 搜索
      handleSearchInput(val) {
        if (!val) {
          this.getSysInfo(1);
          return
        }
        this.$api.searchsysInfoList({
          search: val,
        }).then(res => {
          // 后台并没有传分页信息，前台写法
          if (res.data.status === 200) {
            // 只要搜索，当前页就变回第一页
            this.currentPage = 1;
            this.totalData = res.data.data;
            this.tableData = res.data.data.slice(0, 8);
            this.total = res.data.data.length;
            this.pageSize = 8;
            this.type = 2;
          } else {
            this.tableData = [];
            this.pageSize = 1;
            this.total = 1;
          }
        })
      },
    },
    // 生命周期函数
    created() {
      // 获取系统信息列表第一页
      this.getSysInfo(1);
    },
  }
</script>

<style>
  .goodsbox {
    margin: 20px;
  }

  .searchbox {
    display: flex;
  }

  .searchbox button {
    margin-left: 20px;
  }

  .tablebox {
    margin: 20px 0;
  }
</style>
