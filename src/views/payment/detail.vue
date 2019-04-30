<template>
  <section>
    <div class="z-cell z-cell--hairline z-cell--light">
      <div class="z-cell-tit">合同名称</div>
      <div class="z-cell-item">
        {{ detail.contractname }}
      </div>
    </div>
    <div class="z-cell z-cell--hairline z-cell--light">
      <div class="z-cell-tit">合同编号</div>
      <div class="z-cell-item">
        {{ detail.contractno }}
      </div>
    </div>
    <div class="z-ticket-group">
      <div class="z-ticket z-ticket--blue3">
        <span>{{ getAmount }}</span>
        <span>总金额</span>
      </div>
      <div class="z-ticket z-ticket--blue1">
        <span>{{ detail.paycount }}</span>
        <span>已付</span>
      </div>
      <div class="z-ticket z-ticket--green1">
        <span>{{ getUnpay }}</span>
        <span>未付</span>
      </div>
    </div>
    <div class="z-row-padded">
      <van-button type="info" class="btn-block" @click="showDialog">
        添加支付记录
      </van-button>
    </div>
    <div class="bg">
      <template v-for="(item, i) in list">
        <van-swipe-cell :right-width="130" :key="i" :ref="`swiperCell${i}`">
          <div class="z-cell-group van-hairline--bottom">
            <div class="z-cell-group__title">
              {{ item.name }}
            </div>
            <div class="z-cell z-cell--borderless">
              <van-row>
                <van-col span="12" class="z-cell-item">
                  <div class="z-cell-item__label z-cell-item__label--right">
                    支付日期：
                  </div>
                  <div class="z-cell-item__content">
                    {{ item.paymentdate | parseTime('{y}-{m}-{d}') }}
                  </div>
                </van-col>
                <van-col span="12" class="z-cell-item">
                  <div class="z-cell-item__label z-cell-item__label--right">
                    比例：
                  </div>
                  <div
                    class="z-cell-item__content"
                    v-text="`${item.ratio}%`"
                  ></div>
                </van-col>
              </van-row>
            </div>
            <div class="z-cell z-cell--borderless">
              <div class="z-cell-item">
                <div class="z-cell-item__label z-cell-item__label--right">
                  金额：
                </div>
                <div class="z-cell-item__content">
                  {{ item.amount }}
                </div>
              </div>
            </div>
            <div class="z-cell z-cell--borderless">
              <div class="z-cell-item">
                <div class="z-cell-item__label z-cell-item__label--right">
                  备注：
                </div>
                <div class="z-cell-item__content">
                  {{ item.remark }}
                </div>
              </div>
            </div>
            <div class="radio-group">
              <van-checkbox
                v-model="item.isinvoice"
                disabled
                label-position="left"
                shape="square"
                class="right"
              >
                是否开票：
              </van-checkbox>
            </div>
          </div>
          <div slot="right" class="z-swipe-group">
            <div
              class="z-swipe-item z-swipe-item--edit"
              @click.stop="onEditplan(item, i)"
            >
              <span>编辑</span>
            </div>
            <div
              class="z-swipe-item z-swipe-item--del"
              @click.stop="onDelplan(item.id, i)"
            >
              <span>删除</span>
            </div>
          </div>
        </van-swipe-cell>
      </template>
    </div>

    <van-dialog
      v-model="show"
      show-cancel-button
      :lazy-render="false"
      :before-close="beforeClose"
    >
      <div class="z-form">
        <div class="van-cell van-cell--borderless van-field">
          <div class="van-cell__title van-field__label van-field__label--right">
            <span>支付计划：</span>
          </div>
          <div class="van-cell__value" @click="actionSheetShow = true">
            <div class="van-field__body of">
              <div class="van-field__control text-left" style="height:24px;">
                {{ palnText }}
              </div>
            </div>
          </div>
        </div>
        <div class="z-field--small van-cell van-cell--borderless van-field">
          <div class="van-cell__title van-field__label van-field__label--right">
            支付日期：
          </div>
          <div
            class="van-field__control van-field__control--center"
            @click="dateShow = true"
          >
            {{ query.paymentdate }}
          </div>
        </div>
        <van-field
          v-model.number="query.ratio"
          label="比例："
          label-align="right"
          input-align="center"
          :border="false"
          @input="onChangeRatio"
          class="z-field--mini"
        >
          <span slot="right-icon">%</span>
        </van-field>
        <van-field
          v-model="query.amount"
          label="金额："
          label-align="right"
          :border="false"
          @input="onChangeAmount"
          class="z-field--medium"
        >
          <span slot="right-icon">元</span>
        </van-field>
        <van-field
          v-model="query.remark"
          type="textarea"
          label="备注："
          :border="false"
          label-align="right"
        />
        <div class="radio-group">
          <van-checkbox
            v-model="checked"
            label-position="left"
            shape="square"
            class="right"
          >
            是否开票
          </van-checkbox>
        </div>
      </div>
    </van-dialog>

    <van-actionsheet
      v-model="actionSheetShow"
      :actions="actions"
      cancel-text="取消"
      @select="sheetSelect"
    />
    <van-popup v-model="dateShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :formatter="dateFormatter"
        @confirm="dateConfirm"
        @cancel="onPickerClose"
      />
    </van-popup>
  </section>
</template>

<script>
import { parseTime, accMul } from '@/filter';
import {
  queryPaymentPlan,
  queryTContractPaymentrecord,
  addTContractPaymentrecord,
  editTContractPaymentrecord,
  deleteTContractPaymentrecord
} from '@/api/article';
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      show: false,
      dateShow: false,
      currentDate: new Date(),
      checked: false,
      actionSheetShow: false,
      actions: [],
      palnText: '',
      amount: 0,
      query: {
        planid: null,
        paymentdate: null,
        ratio: null,
        amount: '',
        remark: ''
      },
      detail: {
        status: 'add',
        id: null,
        contractname: '',
        contractno: '',
        paycount: 0,
        amount: 0,
        monetary: 1
      },
      list: []
    };
  },
  computed: {
    getAmount() {
      let amount = this.detail.amount;
      let monetary = this.detail.monetary;
      return accMul(amount, monetary);
    },
    getUnpay() {
      return this.getAmount - Number(this.detail.paycount);
    }
  },
  filters: {
    parseTime
  },
  created() {
    this.getAction();
    this.getOptions();
  },
  methods: {
    getAction() {
      if (!this.id) {
        return;
      }
      const query = {
        id: this.id
      };
      queryTContractPaymentrecord(query).then(res => {
        const result = res.data;
        if (result.success) {
          let paycount = result.paycount;
          Object.assign(this.detail, result.dmp, { paycount });
          this.list = result.list;
        }
      });
    },
    getOptions() {
      if (!this.id) {
        return;
      }
      const query = {
        id: this.id
      };
      queryPaymentPlan(query).then(res => {
        const result = res.data;
        if (result.success) {
          const data = result.list;
          const actions = data.map(item => {
            let obj = {
              name: `${item.name}
                    比例：${item.ratio}%
                    金额：${item.amount}`,
              value: item.id,
              amount: item.amount,
              disabled: !!item.flag
            };
            return obj;
          });
          this.actions = actions;
        }
      });
    },
    showDialog() {
      this.show = true;
    },
    dateFormatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
    dateConfirm(v) {
      this.query.paymentdate = parseTime(v, '{y}-{m}-{d}');
      this.dateShow = false;
    },
    sheetSelect(obj) {
      this.palnText = obj.name;
      this.query.planid = obj.value;
      this.actionSheetShow = false;
    },
    findName(id) {
      const obj = this.actions.find(item => {
        return item.value === id;
      });
      if (obj) {
        return obj;
      } else {
        return;
      }
    },
    onPickerClose() {
      this.dateShow = false;
    },
    onChangeAmount() {
      if (this.getAmount) {
        if (Number(this.query.amount) > Number(this.getAmount)) {
          this.query.amount = this.getAmount;
        }
        let proportion = Number(this.query.amount) / Number(this.getAmount);
        this.query.ratio = proportion.toFixed(2) * 100;
      }
    },
    onChangeRatio() {
      const count = 100;
      if (Number(this.query.ratio) > count) {
        this.query.ratio = count;
      }
      if (this.getAmount) {
        let proportion =
          (Number(this.query.ratio) * Number(this.getAmount)) / 100;
        this.query.amount = proportion;
      }
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        this.onSubmit(done);
      } else {
        this.resetForm();
        done();
      }
    },
    onSubmit(done) {
      const params = {
        isinvoice: this.checked ? 1 : 0
      };
      if (this.detail.id) {
        params.id = this.detail.id;
      } else {
        params.contractid = this.id;
      }
      const query = Object.assign({}, this.query, params);
      if (!query.planid) {
        this.$toast('请选择合同支付计划');
        if (done) {
          done(false);
        }
        return;
      }
      switch (this.detail.status) {
        case 'add':
          addTContractPaymentrecord(query)
            .then(res => {
              const result = res.data;
              if (result.success) {
                this.$toast('新增成功');
                this.getAction();
              } else {
                this.$toast('新增失败，请重试');
              }
              if (done) {
                this.resetForm();
                done();
              }
            })
            .catch(() => {
              this.$toast('新增失败，请重试');
              if (done) {
                done();
              }
            });
          break;
        case 'update':
          editTContractPaymentrecord(query)
            .then(res => {
              const result = res.data;
              if (result.success) {
                this.$toast('修改成功');
                this.getAction();
                if (done) {
                  this.resetForm();
                  done();
                }
              } else {
                this.$toast('修改失败，请重试');
                if (done) {
                  done(false);
                }
              }
            })
            .catch(() => {
              this.$toast('修改失败，请重试');
              if (done) {
                done(false);
              }
            });
          break;
        default:
          break;
      }
    },
    onEditplan(item) {
      if (!item) {
        return;
      }
      const query = {
        paymentdate: parseTime(item.paymentdate, '{y}-{m}-{d}'),
        ratio: item.ratio,
        amount: item.amount,
        remark: item.remark
      };
      this.checked = !!item.isinvoice;
      this.currentDate = new Date(item.paymentdate);
      this.detail.id = item.id;
      this.detail.status = 'update';
      const obj = this.findName(item.planid);
      if (obj) {
        this.sheetSelect(obj);
      }
      Object.assign(this.query, query);
      this.show = true;
    },
    onDelplan(id, index) {
      this.$dialog
        .confirm({
          message: '确定删除该记录吗？'
        })
        .then(() => {
          deleteTContractPaymentrecord({ id }).then(res => {
            const result = res.data;
            if (result.success) {
              this.$toast('删除成功');
              this.list.splice(index, 1);
            }
          });
        })
        .catch();
    },
    resetForm() {
      this.palnText = '';
      this.detail.status = 'add';
      this.detail.id = null;
      this.checked = false;
      // this.amount = 0;
      this.currentDate = new Date();
      const query = {
        planid: null,
        paymentdate: null,
        ratio: null,
        amount: '',
        remark: ''
      };
      Object.assign(this.query, query);
    }
  }
};
</script>
