<template>
  <section class="pt10">
    <div class="z-card">
      <div class="z-card__title">基本信息总览</div>
      <div class="z-card__content">
        <div class="z-ticket-group">
          <div class="z-ticket z-ticket--blue3">
            <span>{{ info.total }}</span>
            <span>总项目金额</span>
          </div>
          <div class="z-ticket z-ticket--green1">
            <span>{{ info.paytotal }}</span>
            <span>已付</span>
          </div>
          <div class="z-ticket z-ticket--blue2">
            <span>{{ getUnpay }}</span>
            <span>未付</span>
          </div>
          <div class="z-ticket z-ticket--purple2">
            <span>{{ info.count }}</span>
            <span>总项目数量</span>
          </div>
          <div class="z-ticket z-ticket--purple1">
            <span>{{ info.completecount }}</span>
            <span>已完成</span>
          </div>
          <div class="z-ticket z-ticket--blue1">
            <span>{{ getUnfinish }}</span>
            <span>未完成</span>
          </div>
        </div>
      </div>
    </div>
    <div class="z-card">
      <div class="z-card__title">执行进度监控</div>
      <div class="z-card__content">
        <pie-chart style="width: 100%;height: 350px;"></pie-chart>
      </div>
    </div>
    <div class="z-card">
      <div class="z-card__title">付款趋势</div>
      <div class="z-card__content">
        <line-chart style="width: 100%;height: 200px;"></line-chart>
      </div>
    </div>
    <footer-bar></footer-bar>
  </section>
</template>

<script>
import { queryBasicInfo } from '@/api/article';
import PieChart from './PieChart';
import LineChart from './LineChart';
import FooterBar from '@/components/FooterBar';

export default {
  components: {
    PieChart,
    LineChart,
    FooterBar
  },
  data() {
    return {
      info: {}
    };
  },
  computed: {
    getUnpay() {
      if (this.info.total) {
        return this.info.total - this.info.paytotal || 0;
      } else {
        return null;
      }
    },
    getUnfinish() {
      if (this.info.count) {
        return this.info.count - this.info.completecount || 0;
      } else {
        return null;
      }
    }
  },
  created() {
    this.getAction();
  },
  methods: {
    getAction(query) {
      queryBasicInfo(query).then(res => {
        const result = res.data;
        if (result.success) {
          const data = result.dmp;
          this.info = data;
        }
      });
    }
  }
};
</script>

<style></style>
