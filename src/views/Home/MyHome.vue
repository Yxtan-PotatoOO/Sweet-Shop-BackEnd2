<template>
  <div class="mychart">
    <div id="main1"></div>
    <div id="main2"></div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.chart1();
      this.chart2();
    },
    methods: {
      chart1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main1'));

        // 指定图表的配置项和数据
        var option = {
          xAxis: {
            type: 'category',
            data: ['芒果千层', '芝士小蛋糕', '牛油泡芙', '马卡龙', '提拉米苏', '水果蛋糕', '酸奶慕斯蛋糕'],
            axisLabel: {
              interval: 0
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      chart2() {
        var myChart2 = this.$echarts.init(document.getElementById('main2'));

        var option2 = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        };

        myChart2.setOption(option2);
      }
    }
  }
</script>


<style>
  .mychart {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  #main1 {
    width: 600px;
    height: 400px;
    margin-top: 70px;
  }

  #main2 {
    width: 600px;
    height: 400px;
    margin-top: 70px;
  }
</style>
