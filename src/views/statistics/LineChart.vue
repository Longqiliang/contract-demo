<template>
  <div>
    <div ref="lineChart" style="width:100%; height:100%;"></div>
    <Loading v-show="loading" />
    <div class="of chart-select" @click="show = true">
      <div style="float:left;padding: 5px 0;">
        年度：
      </div>
      <div class="z-select">
        <i class="z-icon z-icon-arrow-down z-select__icon"></i>
        <div class="z-select-label">{{ query.year }}</div>
      </div>
    </div>
    <van-popup v-model="show">
      <ul class="z-popup">
        <van-radio-group v-model="query.year" @change="handleChange">
          <van-radio name="2019" class="z-popup-item">2019</van-radio>
          <van-radio name="2018" class="z-popup-item">2018</van-radio>
        </van-radio-group>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import echarts from '@/lib/initEcharts';
import Loading from '@/components/chart/Loading';
import { queryPaymentTrend } from '@/api/article';

export default {
  components: {
    Loading
  },
  data() {
    return {
      show: false,
      chart: null,
      loading: null,
      query: {
        year: '2019'
      }
    };
  },
  mounted() {
    this.initChart();
    this.getAction(this.query);
  },
  methods: {
    handleChange() {
      this.getAction(this.query);
      this.show = false;
    },
    initChart() {
      this.chart = echarts.init(this.$refs['lineChart']);
      this.chart.setOption({
        grid: {
          top: '25%',
          bottom: '5%',
          left: '5%',
          right: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            formatter: function(v) {
              let str = v + '月';
              return str;
            }
          },
          axisLine: {
            lineStyle: {
              color: '#3988F3'
            }
          },
          splitLine: {
            show: true
          },
          data: []
        },
        yAxis: {
          name: '单位：万',
          type: 'value',
          minInterval: 1,
          axisLine: {
            lineStyle: {
              color: '#3988F3'
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true,
            color: '#4F39F3',
            label: {
              show: true
            }
          }
        ]
      });
    },
    getAction(query) {
      this.loading = true;
      queryPaymentTrend(query)
        .then(res => {
          const data = res.data;
          this.loading = false;
          if (data.success) {
            this.setChartOption(data.list);
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    setChartOption(data) {
      const xAxisArr = [];
      for (let i = 1; i <= 12; i++) {
        xAxisArr.push(i);
      }
      this.chart.setOption({
        xAxis: [
          {
            data: xAxisArr
          }
        ],
        series: [
          {
            data
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.chart-select {
  position: absolute;
  top: 10px;
  right: 15px;
}
</style>
