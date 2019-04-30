<template>
  <div>
    <div ref="pieChart" style="width:100%; height:100%;"></div>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import echarts from '@/lib/initEcharts';
import Loading from '@/components/chart/Loading';
import { queryExecutionProgress, htglContractType } from '@/api/article';
import { codeFormat } from '@/filter';
export default {
  components: {
    Loading
  },
  data() {
    return {
      chart: null,
      loading: null
    };
  },
  mounted() {
    this.initChart();
    this.getAction().catch(() => {
      this.$toast('查询失败，请刷新重试');
    });
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs['pieChart']);
      const option = {
        color: ['#1DD62A', '#f5f5f5'],
        legend: {
          data: ['已付', '未付'],
          top: '3%',
          left: 'center'
        },
        tooltip: {},
        series: []
      };
      this.chart.setOption(option);
    },
    async getAction() {
      this.loading = true;
      const codeResult = await htglContractType();
      const code = codeResult.data;
      if (code.success) {
        const codeList = code.list;
        const chartResult = await queryExecutionProgress();
        const chartRes = chartResult.data;
        this.loading = false;
        if (chartRes.success) {
          const data = chartRes.list;
          data.forEach(item => {
            return (item.contracttype = codeFormat(
              codeList,
              item.contracttype
            ));
          });
          this.setChartOption(data);
        }
      } else {
        this.loading = false;
        this.$toast('查询失败，请刷新重试');
      }
    },
    setChartOption(data) {
      const seriesArr = [];
      const titles = [];
      for (let da in data) {
        const item = data[da];
        const showNum = 2;
        let center = [];
        let x, y;
        if (data.length <= showNum) {
          x = 25 + 50 * da;
          y = 50;
        } else {
          if (da < data.length / 2) {
            x = 25 + 50 * da;
            y = 25;
          } else {
            x = 25 + 50 * (da - data.length / 2);
            y = 70;
          }
        }

        center = [x + '%', y + '%'];
        const serieData = [
          {
            name: '已付',
            value: item.paymoney,
            legendHoverLink: false,
            silent: true,
            label: {
              show: true,
              position: 'inside',
              color: '#333',
              formatter: '{c}'
            }
          },
          {
            name: '未付',
            value: item.totalmoney - item.paymoney,
            legendHoverLink: false,
            silent: true,
            label: {
              show: true,
              position: 'center',
              color: '#333',
              textStyle: {
                fontSize: 14
              },
              formatter: function() {
                const arr = ['总金额', item.totalmoney];
                return arr.join('\n');
              }
            }
          }
        ];
        let serieObj = {
          name: item.contracttype,
          type: 'pie',
          clockwise: false,
          radius: [35, 50],
          center,
          data: serieData
        };
        let textObj = {
          text: item.contracttype,
          textAlign: 'center',
          subtext: item.count + '项',
          textStyle: {
            color: '#333',
            fontSize: 14
          },
          subtextStyle: {
            fontSize: 14,
            color: ['#333']
          },
          x: x - 1 + '%',
          y: y + 15 + '%'
        };
        seriesArr.push(serieObj);
        titles.push(textObj);
      }
      const option = {
        title: titles,
        series: seriesArr
      };
      this.chart.setOption(option);
    }
  }
};
</script>
