<template>
  <div class="contract">
    <van-search
      class="contract-search"
      placeholder="请输入搜索内容"
      v-model="keyWorld"
      @input="searchContract"
      show-action
    >
      <div slot="action">
        <i class="z-icon z-icon-sort" @click="showSort = true"></i>
      </div>
    </van-search>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="loadMore"
    >
      <van-swipe-cell
        class="ContractItem"
        :ref="'contract-list_' + item.id"
        v-for="(item, i) in list"
        :key="i"
        :right-width="130"
      >
        <van-cell-group>
          <div class="z-cell z-cell--large" @click="goDetail(item.id)">
            <div class="z-cell-tit">{{ item.contractname }}</div>
            <div class="z-cell-item">
              <div class="z-cell-item__label">合同金额：</div>
              <div class="z-cell-item__content">
                {{ item.amount * item.monetary }}元
              </div>
            </div>
            <div class="z-cell-item">
              <div class="z-cell-item__label">合同工期：</div>
              <div class="z-cell-item__content">
                {{ item.period
                }}{{
                  item.construction | getBaseValueByCode(baseData.htglDuration)
                }}
              </div>
            </div>
            <div class="z-cell-item">
              <div
                class="z-cell-item__label"
                style="width:7em; margin-right:15px;"
              >
                建设单位(甲方)
              </div>
              <div class="z-cell-item__content">{{ item.construct_unit }}</div>
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
        </van-cell-group>
        <div slot="right" class="right-operation">
          <div class="right-operation-item" @click.stop="editContract(item.id)">
            编辑
          </div>
          <div
            class="right-operation-item danger"
            @click.stop="delContract(item.id)"
          >
            删除
          </div>
        </div>
      </van-swipe-cell>
    </van-list>
    <van-button
      ref="addBtn"
      id="addBtnList"
      class="contract-addBtn"
      :style="translateStyle"
      @click.native="goAdd"
      type="info"
    >
      <i class="z-icon z-icon-add"></i>
    </van-button>
    <van-popup v-model="showSort" position="bottom" title="排序方式">
      <van-picker :columns="orderCol" @change="search" />
    </van-popup>
    <footer-bar />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  getAvoidRegulationInfo,
  deleteTContractInfo,
  getCodeInfoByCode,
  request
} from '@/api/article';
import FooterBar from '@/components/FooterBar';
import { setTimeout } from 'timers';
import Touch from '@/mixins/touch';
export default {
  mixins: [Touch],
  components: {
    FooterBar
  },
  data() {
    return {
      showSort: false,
      pageSize: 8,
      pageNum: 1,
      totalPage: 1,
      keyWorld: '',
      error: false,
      loading: false,
      finished: false,
      isoverflow: false,
      orderBy: 'contractdate',
      list: [],
      orderCol: [
        {
          value: 'contractdate',
          text: '合同签约时间'
        },
        {
          value: 'contractname',
          text: '合同名称'
        }
      ],
      htglDuration: []
    };
  },
  computed: {
    ...mapState(['baseData'])
  },
  filters: {
    // 过滤器
    getBaseValueByCode: function(code, data) {
      let result = [];
      if (!data) {
        return '';
      }
      result = data.filter(item => {
        if (item.fieldcode == code) {
          return item;
        }
      });

      if (result.length > 0) {
        return result[0].fieldname;
      }
      return '';
    }
  },
  methods: {
    searchContract() {
      setTimeout(() => {
        this.search();
      }, 200);
    },
    search() {
      this.pageNum = 1;
      this.showSort = false;
      this.getAvoidRegulationInfo();
    },
    // 查询合同列表
    getAvoidRegulationInfo() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let query = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        contractname: this.keyWorld,
        orderBy: this.orderBy
      };
      getAvoidRegulationInfo(query)
        .then(res => {
          this.loading = false;
          if (res.data.success) {
            this.list = res.data.dmp.list;
            this.totalPage = res.data.dmp.pages;
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    // 加载更多
    loadMore() {
      if (!this.baseData.htglDuration) {
        let query = {
          pageSize: this.pageSize,
          pageNum: 1,
          contractname: this.keyWorld,
          orderBy: this.orderBy
        };
        request
          .all([
            getCodeInfoByCode('htglDuration'),
            getAvoidRegulationInfo(query)
          ])
          .then(res => {
            this.htglDuration = res[0].data.list;
            this.htglDuration = this.htglDuration.filter(item => {
              item.text = item.fieldname;
              return item;
            });
            this.$store.commit({
              type: 'SET_BASE_DATA',
              key: 'htglDuration',
              list: this.htglDuration
            });
            this.list = res[1].data.dmp.list;
            this.totalPage = res[1].data.dmp.pages;
            this.loading = false;
            this.pageNum++;
            if (res[1].data.dmp.endRow == res[1].data.dmp.total) {
              this.finished = true;
            }
          })
          .catch(err => {
            this.loading = false;
            this.error = true;
            console.log(err);
          });
      } else {
        this.htglDuration = this.baseData.htglDuration;
        let query = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          contractname: this.keyWorld,
          orderBy: this.orderBy
        };

        getAvoidRegulationInfo(query)
          .then(res => {
            this.loading = false;

            if (res.data.success) {
              this.list = this.list.concat(res.data.dmp.list);
              if (res.data.dmp.endRow == res.data.dmp.total) {
                this.finished = true;
              }
              this.pageNum++;
            } else {
              this.finished = true;
            }
          })
          .catch(err => {
            this.loading = false;
            this.error = true;
            console.log(err);
          });
      }
    },
    // 更新合同列表
    refresh() {
      this.loading = true;
      let query = {
        pageSize: this.pageSize * (this.pageNum - 1),
        pageNum: 1,
        contractname: this.keyWorld,
        orderBy: this.orderBy
      };
      getAvoidRegulationInfo(query)
        .then(res => {
          this.loading = false;
          if (res.data.success) {
            this.list = res.data.dmp.list;
            // this.totalPage = res.data.dmp.pages;
            // this.pageNum++;
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    // 详情页
    goDetail(id) {
      this.$router.push({ path: 'detail', query: { id: id } });
    },
    // 新增合同
    goAdd() {
      this.$router.push({ path: 'add' });
    },
    // 删除合同
    delContract(id) {
      this.$dialog
        .confirm({
          title: '删除确认',
          message: '此操作就永久删除改合同记录，是否继续'
        })
        .then(() => {
          deleteTContractInfo({ id: id })
            .then(res => {
              if (res.data.success) {
                this.refresh();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          //this.$refs['contract-list_'+id][0].close()
        });
    },
    // 编辑合同
    editContract(id) {
      this.$router.push({ path: 'edit', query: { id: id } });
    }
  }
};
</script>
