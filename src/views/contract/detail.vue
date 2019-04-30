<template>
  <div class="app-bg">
    <div v-if="showLink=='1'"
         class="contract contract-add">
      <!-- <van-nav-bar left-text="合同详情"
                   @click-left="goBack"
                   left-arrow /> -->
      <div class="z-cell-group">
        <div class="z-cell margin-button-10">
          <div class="z-cell-tit">合同类型</div>
          <div class="z-cell-item"
               v-if="baseData.htglContractType">{{contractData.contracttype | getBaseValueByCode(baseData.htglContractType)}}</div>
        </div>
      </div>
      <div class="z-cell-group">
        <div class="z-cell">
          <div class="z-cell-tit">合同名称</div>
          <div class="z-cell-item">{{contractData.contractname}}</div>
        </div>
        <div class="z-cell">
          <div class="z-cell-tit">合同编号</div>
          <div class="z-cell-item">{{contractData.contractno}}</div>
        </div>
        <div class="z-cell">
          <div class="z-cell-tit">建设单位(甲方)</div>
          <div class="z-cell-item">{{contractData.construct_unitname}}</div>
          <van-row class="z-cell-item">
            <van-col :span="12">
              联系人:{{contractData.construct_person}}
            </van-col>
            <van-col :span="12">
              联系电话:{{contractData.construct_personphone}}
            </van-col>
          </van-row>
        </div>
        <div class="z-cell">
          <div class="z-cell-tit">承建单位(乙方)</div>
          <div class="z-cell-item">{{contractData.build_unitname}}</div>
          <van-row class="z-cell-item">
            <van-col :span="12">
              联系人:{{contractData.build_person}}
            </van-col>
            <van-col :span="12">
              联系电话:{{contractData.build_personphone}}
            </van-col>
          </van-row>
        </div>
        <div class="z-cell margin-button-10">
          <div class="z-cell-tit">监理单位(丙方)</div>
          <div class="z-cell-item">{{contractData.supervision_unitname}}</div>
          <van-row class="z-cell-item">
            <van-col :span="12">
              联系人:{{contractData.supervision_person}}
            </van-col>
            <van-col :span="12">
              联系电话:{{contractData.supervision_personphone}}
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="z-cell-group">
        <div class="z-cell">
          <div class="z-cell-tit">签约日期</div>
          <div class="z-cell-item">{{contractData.contractdate}}</div>
        </div>
        <div class="z-cell">
          <div class="z-cell-tit">合同金额</div>
          <div class="z-cell-item">{{contractData.amount + contractData.monetary}}元</div>
        </div>
        <div class="z-cell">
          <div class="z-cell-tit">合同工期</div>
          <!-- <div class="z-cell-item">{{contractData.period + contractData.construction}}</div> -->
          <div class="z-cell-item"
               v-if="baseData.htglDuration">{{contractData.period}} {{contractData.construction | getBaseValueByCode(baseData.htglDuration)}}</div>
        </div>
        <div class="z-cell">
          <div class="z-cell-tit">开始时间</div>
          <div class="z-cell-item">{{contractData.starttime}}</div>
        </div>
        <div class="z-cell">
          <div class="z-cell-tit">结束时间</div>
          <div class="z-cell-item">{{contractData.endtime}}</div>
        </div>
        <div class="z-cell">
          <div class="z-cell-tit">合同状态</div>
          <div class="z-cell-item"
               v-if="baseData.htglContractStatus">{{contractData.state | getBaseValueByCode(baseData.htglContractStatus)}}</div>
        </div>
        <div class="z-cell margin-button-10">
          <div class="z-cell-tit">付款方式</div>
          <div class="z-cell-item"
               v-if="baseData.htglPaymentMethod">{{contractData.payment | getBaseValueByCode(baseData.htglPaymentMethod)}}</div>
        </div>
        <div class="contract-field">
          <van-row>
            <van-col :span="24"
                     class="contract-field-title">
              照片
            </van-col>
            <van-col :span="24">
              <template v-for="(item,i) in fileList">
                <div class="img-content"
                     v-if="item.flag=='1'"
                     :key="i">
                  <img class="img-item"
                       :src="viewFile + item.fileid"
                       @click="previewFile(i)" />
                </div>
              </template>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="z-row-padded">
        <van-button size="large"
                    class="z-large btn-block"
                    type="info"
                    @click="showLink='3'">下一步</van-button>
      </div>
    </div>
    <div v-if="showLink=='3'"
         class="contract contract-add addField">
      <!-- <van-nav-bar left-text="合同详情-下一步"
                   @click-left="showLink='1'"
                   left-arrow /> -->
      <div class="contract-field">
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            合同内容
          </van-col>
          <van-col :span="24">
            <van-cell-group class="van-hairline--bottom">
              <van-field class="van-hairline--bottom"
                         type="textarea"
                         readonly
                         v-model="contractData.proper"
                         rows="8" />
            </van-cell-group>
          </van-col>
        </van-row>
      </div>
      <div class="contract-field">
        <van-row>
          <van-col :span="24"
                   class="contract-field-title margin-button-10">
            支付计划
          </van-col>
        </van-row>
        <div class="plan-item van-hairline--bottom"
             v-for="(item,i) in planList"
             :key="i">
          <van-row>
            <van-col :span="24"
                     class="contract-field-title">
              第{{i +1 }}期 支付计划
            </van-col>
          </van-row>
          <van-row>
            <van-col :span="4"
                     class="padding-left-15">
              名称：
            </van-col>
            <van-col :span="20">
              {{item.name}}
            </van-col>
            <van-col :span="4"
                     class="padding-left-15">
              比例：
            </van-col>
            <van-col :span="6">
              {{item.ratio}}%
            </van-col>
            <van-col :span="4">
              金额：
            </van-col>
            <van-col :span="10">
              {{item.amount}}元
            </van-col>
          </van-row>
          <van-row>
            <van-col :span="4"
                     class="padding-left-15">
              备注：
            </van-col>
            <van-col :span="20">
              {{item.remark}}
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="contract-field">
        <van-row class="contract-field-accessory">
          <van-col :span="8"
                   class="contract-field-title">
            <span>附件： {{fileTotal}}个</span>
          </van-col>
          <van-col :span="4"
                   :offset="12">
            <span @click="showFile = !showFile">{{showFile == true?'收起':'展开'}}</span>
          </van-col>
        </van-row>
        <div v-if="showFile">
          <template v-for="(item, i) in fileList">
            <van-row v-if="item.flag=='2'"
                     :key="i">
              <van-col :span="22">
                <div class="file-progress">
                  <span class="contract-field-accessory-item"
                        @click="previewFile(i)">{{item.filename}}
                  </span>
                </div>
              </van-col>
              <van-col :span="2">
              </van-col>
            </van-row>
          </template>
        </div>
      </div>
      <div class="z-row-padded">
        <van-button size="large"
                    class="z-large btn-block"
                    type="info"
                    @click="goBack">确定</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  queryTContractInfo,
  getCodeInfoByCode,
  viewFile,
  viewFilePath,
  getQYWXProperties
} from '@/api/article';
import { unitConvertToB } from '@/until';
import linkman from './linkman';

export default {
  components: {
    linkman
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
  data() {
    return {
      showSelType: false,
      showSelTime: false,
      showFile: true,
      showLink: '1',
      fileTotal: 0,
      viewFile: viewFile,
      contractData: {},
      planList: [],
      fileList: [],
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      htglContractType: [], // 合同类型
      htglContractStatus: [], // 合同状态
      htglPaymentMethod: [], // 支付方式
      htglDuration: [], // 合同工期
      htglMoney: []
    };
  },
  created() {
    this.init();
    this.getBaseData();
  },
  methods: {
    init() {
      let query = {
        id: this.$route.query.id
      };
      queryTContractInfo(query)
        .then(res => {
          if (res.data.success) {
            this.contractData = res.data.dmp;
            this.planList = res.data.planList;
            this.fileList = res.data.fileList;
            this.fileTotal = 0;
            this.fileList.map(item => {
              if (item.flag == '2') {
                this.fileTotal++;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      let url = {
        url: window.location.href.split('#')[0]
      };
      getQYWXProperties(url)
        .then(res => {
          if (res.data.success) {
            wx.config({
              beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.corpID, // 必填，企业微信的corpID
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature, // 必填，签名，见附录1
              jsApiList: ['previewFile', 'chooseImage', 'downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.push({ path: 'list' });
    },
    // 获取数据字典
    getBaseData() {
      if (!this.baseData.htglDuration) {
        // 工期单位
        getCodeInfoByCode('htglDuration')
          .then(res => {
            if (res.data.success) {
              this.htglDuration = res.data.list;
              this.htglDuration = this.htglDuration.filter(item => {
                item.text = item.fieldname;
                return item;
              });
              this.$store.commit({
                type: 'SET_BASE_DATA',
                key: 'htglDuration',
                list: this.htglDuration
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.htglDuration = this.baseData.htglDuration;
      }

      if (!this.baseData.htglMoney) {
        // 金额单位
        getCodeInfoByCode('htglMoney')
          .then(res => {
            if (res.data.success) {
              this.htglMoney = res.data.list;
              this.htglMoney = this.htglMoney.filter(item => {
                item.text = item.fieldname;
                return item;
              });
              this.$store.commit({
                type: 'SET_BASE_DATA',
                key: 'htglMoney',
                list: this.htglMoney
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.htglMoney = this.baseData.htglMoney;
      }

      if (!this.baseData.htglContractStatus) {
        // 合同状态
        getCodeInfoByCode('htglContractStatus')
          .then(res => {
            if (res.data.success) {
              this.htglContractStatus = res.data.list;
              this.htglContractStatus = this.htglContractStatus.filter(item => {
                item.text = item.fieldname;
                return item;
              });
              this.$store.commit({
                type: 'SET_BASE_DATA',
                key: 'htglContractStatus',
                list: this.htglContractStatus
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.htglContractStatus = this.baseData.htglContractStatus;
      }

      if (!this.baseData.htglContractType) {
        // 合同类型
        getCodeInfoByCode('htglContractType')
          .then(res => {
            if (res.data.success) {
              this.htglContractType = res.data.list;
              this.htglContractType = this.htglContractType.filter(item => {
                item.text = item.fieldname;
                return item;
              });
              this.$store.commit({
                type: 'SET_BASE_DATA',
                key: 'htglContractType',
                list: this.htglContractType
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.htglContractType = this.baseData.htglContractType;
      }

      if (!this.baseData.htglPaymentMethod) {
        // 支付方式
        getCodeInfoByCode('htglPaymentMethod')
          .then(res => {
            if (res.data.success) {
              this.htglPaymentMethod = res.data.list;
              this.htglPaymentMethod = this.htglPaymentMethod.filter(item => {
                item.text = item.fieldname;
                return item;
              });
              this.$store.commit({
                type: 'SET_BASE_DATA',
                key: 'htglPaymentMethod',
                list: this.htglPaymentMethod
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.htglPaymentMethod = this.baseData.htglPaymentMethod;
      }
    },
    previewFile(i) {
      if (/Android|webOS|iPhone|iPod|BlackBerry|iPad|SymbianOS/i.test(navigator.userAgent)) {
        let size = unitConvertToB(this.fileList[i].filesize);
        wx.previewFile({
          url: viewFilePath + this.fileList[i].fileid +'/' + this.fileList[i].filename, // 需要预览文件的地址(必填，可以使用相对路径)
          name: this.fileList[i].filename, // 需要预览文件的文件名(不填的话取url的最后部分)
          size: size // 需要预览文件的字节大小(必填)
        });
      } else {
        this.$toast('PC端不支持微信文件预览');
      }
    }
  }
};
</script>
