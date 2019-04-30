<template>
  <section>
    <form action="/">
      <van-search
        v-model="query.contractname"
        placeholder="请输入合同名称"
        @search="onSearch"
        show-action
        background="#3988F3"
      >
        <div slot="action" @click="showAction">
          <i class="z-icon z-icon-sort"></i>
        </div>
      </van-search>
      <van-actionsheet
        v-model="actionShow"
        :actions="actions"
        @select="onSelect"
      />
    </form>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      class="z-list"
    >
      <template v-for="(item, i) in list">
        <div class="z-cell z-cell--large" @click="linkTo(item.id)" :key="i">
          <div class="z-cell-tit">{{ item.contractname }}</div>
          <div class="z-cell-item">
            <div class="z-cell-item__label">合同金额：</div>
            <div class="z-cell-item__content">
              {{ item.paycount }}{{ item.monetary }}
            </div>
          </div>
          <div class="z-cell-item">
            <div class="z-cell-item__label">支付金额：</div>
            <div class="z-cell-item__content">{{ item.amount }}</div>
          </div>
          <div class="z-cell-item">
            <div class="z-cell-item__label">支付记录：</div>
            <div class="z-cell-item__content">{{ item.payname }}</div>
          </div>
          <div class="z-cell-item">
            <div
              class="z-cell-item__label"
              style="width:7em; margin-right:15px;"
            >
              承建单位(乙方)
            </div>
            <div class="z-cell-item__content">{{ item.build_unit }}</div>
          </div>
        </div>
      </template>
    </van-list>
    <footer-bar />
  </section>
</template>

<script>
import { queryTContractPaymentrecordList } from '@/api/article';
import FooterBar from '@/components/FooterBar';

export default {
  components: {
    FooterBar
  },
  data() {
    return {
      actionShow: false,
      actions: [
        {
          name: '按时间排序',
          value: 'contractdate'
        },
        {
          name: '按名称排序',
          value: 'contractname'
        }
      ],
      list: [],
      loading: false,
      finished: false,
      error: false,
      query: {
        contractname: '',
        pageNum: 1,
        pageSize: 8,
        orderBy: 'contractdate'
      }
    };
  },
  methods: {
    onSearch() {
      const query = {
        pageNum: 1,
        pageSize: 8
      };
      Object.assign(this.query, query);
      this.list = [];
      this.loading = true;
      this.error = false;
      this.finished = false;
      this.onLoad();
    },
    onSelect(item) {
      this.query.orderBy = item.value;
      this.onSearch();
      this.actionShow = false;
    },
    showAction() {
      this.actionShow = true;
    },
    getList(query) {
      return queryTContractPaymentrecordList(query);
    },
    onLoad() {
      this.getList(this.query)
        .then(res => {
          const result = res.data;
          if (result.success) {
            this.query.pageNum += 1;
            this.loading = false;
            const dmp = result.dmp;
            const data = dmp.list;
            if (dmp.endRow === dmp.total) {
              this.finished = true;
            }
            this.list = this.list.concat(data);
          } else {
            this.loading = false;
            this.finished = true;
          }
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },
    linkTo(id) {
      if (id) {
        this.$router.push({
          path: 'detail',
          query: {
            id
          }
        });
      }
    }
  }
};
</script>

<style></style>
