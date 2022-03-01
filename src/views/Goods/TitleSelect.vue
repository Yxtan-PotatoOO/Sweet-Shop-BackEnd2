<template>
  <div>
    <!--
    lazy --- 懒加载
    :load="loadNode" --- 异步请求数据，lazy在的时候自动执行
    @node-click="nodeClick" --- 节点点击事件
    -->
    <el-tree :props="props" :load="loadNode" lazy accordion @node-click="nodeClick">
    </el-tree>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
      };
    },
    methods: {
      // node --- 当前节点
      // resolve --- 成功返回的数据结果
      loadNode(node, resolve) {
        if (node.level === 0) {
          this.$api.selectTitle().then(res => {
            console.log(res.data.data)
            return resolve(res.data.data);
          })
        }
        if (node.level >= 1) {
          this.$api.selectTitle({
            id: node.data.cid
          }).then(res => {
            console.log(res.data.data)
            if (res.data.status === 200) {
              return resolve(res.data.data);
            } else {
              resolve([]);
            }
          })
        }
      },
      // 点击节点获取数据
      nodeClick(data, node){
        // 传给父组件
        this.$emit('nodeData', data)      
      }
    }
  }
</script>

<style>
</style>
