<template>
  <section class="app-bg">
    <div class="z-card pt10">
      <div class="z-card__title">导出数据项</div>
      <div class="z-card__content min130">
        <radio-group v-model="flag">
          <radio-button
            v-for="(eo, e) in exportOptions"
            :key="e"
            :label="eo.value"
          >
            {{ eo.label }}
          </radio-button>
        </radio-group>
        <!-- <check-group v-model="flag">
          <check-button
            v-for="(eo, e) in exportOptions"
            :key="e"
            :label="eo.value"
          >
            {{ eo.label }}
          </check-button>
        </check-group> -->
      </div>
    </div>
    <div class="z-card">
      <div class="z-card__title">项目类型</div>
      <div class="z-card__content min130">
        <check-group v-model="contracttype">
          <check-button
            v-for="(po, p) in projectOptions"
            :key="p"
            :label="po.value"
          >
            {{ po.label }}
          </check-button>
        </check-group>
      </div>
    </div>
    <div class="z-card">
      <div class="z-card__title">合同状态</div>
      <div class="z-card__content min130">
        <check-group v-model="contractstate">
          <check-button
            v-for="(co, c) in contractOptions"
            :key="c"
            :label="co.value"
          >
            {{ co.label }}
          </check-button>
        </check-group>
      </div>
    </div>
    <div class="z-card">
      <div class="z-card__title">单位分类</div>
      <div class="z-card__content min130"></div>
    </div>
    <div class="z-row-padded mt15">
      <van-button
        class="btn-block"
        type="info"
        :loading="loading"
        @click="exportExcel"
        >导出</van-button
      >
    </div>
    <footer-bar></footer-bar>
  </section>
</template>

<script>
import CheckGroup from '@/components/check/check-group';
import CheckButton from '@/components/check/check-button';
import RadioGroup from '@/components/radio/radio-group';
import RadioButton from '@/components/radio/radio-button';
import FooterBar from '@/components/FooterBar';
import { getCodeInfoByCode, dataOutputExcel } from '@/api/article';
export default {
  components: {
    FooterBar,
    CheckGroup,
    CheckButton,
    RadioGroup,
    RadioButton
  },
  data() {
    return {
      loading: false,
      flag: '',
      exportOptions: [
        {
          label: '合同明细',
          value: '1'
        },
        {
          label: '支付明细',
          value: '2'
        }
      ],
      contracttype: [],
      projectOptions: [],
      contractstate: [],
      contractOptions: []
    };
  },

  methods: {
    getContractType() {
      getCodeInfoByCode('htglContractType')
        .then(res => {
          const result = res.data;
          if (result.success) {
            const data = result.list;
            const newData = data.map(item => {
              let obj = {
                label: item.fieldname,
                value: item.fieldcode
              };
              return obj;
            });
            this.projectOptions = newData;
          } else {
            this.$toast('请求失败，请重试');
          }
        })
        .catch(() => {
          this.$toast('请求失败，请重试');
        });
    },
    getContractStatus() {
      getCodeInfoByCode('htglContractStatus')
        .then(res => {
          const result = res.data;
          if (result.success) {
            const data = result.list;
            const newData = data.map(item => {
              let obj = {
                label: item.fieldname,
                value: item.fieldcode
              };
              return obj;
            });
            this.contractOptions = newData;
          } else {
            this.$toast('请求失败，请重试');
          }
        })
        .catch(() => {
          this.$toast('请求失败，请重试');
        });
    },
    exportExcel() {
      this.loading = true;
      const query = {
        flag: this.flag,
        contracttype: this.contracttype.join(','),
        contractstate: this.contractstate.join(',')
      };
      dataOutputExcel(query)
        .then(res => {
          const result = res.data;
          this.loading = false;
          if (result.success) {
            this.$toast('导出成功');
          } else {
            this.$toast('导出失败，请重试');
          }
        })
        .catch(() => {
          this.loading = false;
          this.$toast('导出失败，请重试');
        });
    }
  },

  created() {
    this.getContractType();
    this.getContractStatus();
  }
};
</script>

<style></style>
