<template>
  <div class="app-bg">
    <div v-if="showLink=='1'"
         class="contract contract-add addField">
      <!-- <van-nav-bar left-text="新增合同"
                   @click-left="goBack"
                   left-arrow /> -->
      <div class="contract-field">
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            合同类型
          </van-col>
          <van-col :span="24">
            <van-cell class="sel-cell"
                      :value="fromData.contracttypeName"
                      is-link
                      @click="openPopup('showSelType')" />
          </van-col>
        </van-row>
      </div>
      <div class="contract-field">
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            合同名称
          </van-col>
          <van-col :span="24">
            <van-cell-group class="van-hairline--bottom">
              <van-field placeholder="请输入合同名称"
                         v-model="fromData.contractname"
                         class="van-hairline--bottom" />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            合同编号
          </van-col>
          <van-col :span="24">
            <van-cell-group class="van-hairline--bottom">
              <van-field placeholder="请输入合同编号"
                         v-model="fromData.contractno"
                         class="van-hairline--bottom" />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-cell title="建设单位(甲方)"
                  class="sel-cell"
                  :value="fromData.construct_unitname"
                  is-link
                  @click.native="openLink('1')" />
        <div>
          <van-row class="linkman"
                   v-if="fromData.construct_personid">
            <van-col :span="12"
                     class="contract-field-title">
              联系人:{{constructUnit.contact}}
            </van-col>
            <van-col :span="12">
              联系电话:{{constructUnit.phone}}
            </van-col>
          </van-row>
        </div>
        <van-cell title="承建单位(乙方)"
                  class="sel-cell"
                  :value="fromData.build_unitname"
                  is-link
                  @click.native="openLink('2')" />
        <div>
          <van-row class="linkman"
                   v-if="fromData.build_personid">
            <van-col :span="12"
                     class="contract-field-title">
              联系人:{{buildUnit.contact}}
            </van-col>
            <van-col :span="12">
              联系电话:{{buildUnit.phone}}
            </van-col>
          </van-row>
        </div>
        <van-cell title="监理单位(丙方)"
                  class="sel-cell"
                  :value="fromData.supervision_unitname"
                  is-link
                  @click.native="openLink('3')" />
        <div>
          <van-row class="linkman"
                   v-if="fromData.supervision_personid">
            <van-col :span="12"
                     class="contract-field-title">
              联系人:{{supervisionUnit.contact}}
            </van-col>
            <van-col :span="12">
              联系电话:{{supervisionUnit.phone}}
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="contract-field">
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            签约日期
          </van-col>
          <van-col :span="24">
            <van-cell class="sel-cell van-hairline--bottom"
                      :value="fromData.contractdate"
                      is-link
                      @click="openPopup('showContractDate')" />
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            合同金额
          </van-col>
          <van-col :span="19">
            <van-cell-group class="van-hairline--bottom">
              <van-field placeholder="请输入合同金额"
                         v-model="fromData.amount"
                         class="van-hairline--bottom" />
            </van-cell-group>
          </van-col>
          <van-col :span="5">
            <van-button size="small"
                        @click="openPopup('showSelMonetary')">{{fromData.monetaryName}}</van-button>
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            合同工期
          </van-col>
          <van-col :span="19">
            <van-cell-group class="van-hairline--bottom">
              <van-field placeholder="请输入合同工期"
                         v-model="fromData.period"
                         @input="setEndTime"
                         class="van-hairline--bottom" />
            </van-cell-group>
          </van-col>
          <van-col :span="5">
            <van-button size="small"
                        @click="openPopup('showSelConstruction')">{{fromData.constructionname}}</van-button>
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            开始时间
          </van-col>
          <van-col :span="24">
            <van-cell class="sel-cell van-hairline--bottom"
                      :value="fromData.starttime"
                      is-link
                      @click="openPopup('showSelStartTime')" />

          </van-col>
        </van-row>
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            结束时间
          </van-col>
          <van-col :span="24">
            <van-cell class="sel-cell van-hairline--bottom"
                      :value="fromData.endtime" />
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            合同状态
          </van-col>
          <van-col :span="24">
            <van-cell class="sel-cell van-hairline--bottom"
                      :value="fromData.statename"
                      is-link
                      @click="openPopup('showSelStatus')" />
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            付款方式
          </van-col>
          <van-col :span="24">
            <van-cell class="sel-cell van-hairline--bottom"
                      :value="fromData.paymentname"
                      is-link
                      @click="openPopup('showSelMethod')" />
          </van-col>
        </van-row>
      </div>
      <div class="contract-field">
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            照片
          </van-col>
          <van-col :span="24">
             <div class="img-content" v-if="upLoad">
                <span class="img-item img-loading">
                  <van-loading type="spinner" />
                </span>
              </div>
            <template v-for="(item,i) in fromData.fileList">
               <div class="img-content" v-if="item.flag=='1'" :key="i" >
                  <img class="img-item" :src="viewFile + item.fileid"  @click="previewFile(i)"/>
                  <em @click.stop="delFile(i)">
                  </em>
              </div>
            </template>
            <van-uploader :after-read="onReadImg">
              <div class="img-content">
                <span class="img-item img-plus">
                </span>
              </div>
            </van-uploader>
          </van-col>
        </van-row>
      </div>
      <div class="z-row-padded">
        <van-button size="large"
                    class="z-large btn-block"
                    type="info"
                    @click="showLink='3'">下一步</van-button>
      </div>
    </div>
    <!--选择合同类型-->
    <van-popup v-model="active.showSelType"
               position="bottom"
               :overlay="true">
      <van-picker show-toolbar
                  title="合同类型"
                  :columns="htglContractType"
                  @cancel="active.showSelType=false"
                  @confirm="selTypeHandler" />
    </van-popup>

    <!--选择合同状态-->
    <van-popup v-model="active.showSelStatus"
               position="bottom"
               :overlay="true">
      <van-picker show-toolbar
                  title="合同状态"
                  :columns="htglContractStatus"
                  @cancel="active.showSelStatus=false"
                  @confirm="selStatusHandler" />
    </van-popup>

    <!--选择合同金额单位-->
    <van-popup v-model="active.showSelMonetary"
               position="bottom"
               :overlay="true">
      <van-picker show-toolbar
                  title="金额单位"
                  :columns="htglMoney"
                  @cancel="active.showSelMonetary=false"
                  @confirm="selMonetaryHandler" />
    </van-popup>

    <!--选择合同工期单位-->
    <van-popup v-model="active.showSelConstruction"
               position="bottom"
               :overlay="true">
      <van-picker show-toolbar
                  title="工期单位"
                  :columns="htglDuration"
                  @cancel="active.showSelConstruction=false"
                  @confirm="selConstructionHandler" />
    </van-popup>

    <!--选择支付方式-->
    <van-popup v-model="active.showSelMethod"
               position="bottom"
               :overlay="true">
      <van-picker show-toolbar
                  title="支付方式"
                  :columns="htglPaymentMethod"
                  @cancel="active.showSelMethod=false"
                  @confirm="selPaymentHandler" />
    </van-popup>

    <!--选择开始时间-->
    <van-popup v-model="active.showSelStartTime"
               position="bottom"
               :overlay="true">
      <van-datetime-picker type="date"
                           title="开始时间"
                           v-model="currentStartDate"
                           @cancel="active.showSelStartTime=false"
                           @confirm="SelStartTimeHandler" />
    </van-popup>

    <!--选择结束时间-->
    <van-popup v-model="active.showSelEndTime"
               position="bottom"
               :overlay="true">
      <van-datetime-picker type="date"
                           title="结束时间"
                           v-model="currentEndDate"
                           @cancel="active.showSelEndTime=false"
                           @confirm="SelEndTimeHandler" />
    </van-popup>

    <!--选择签约日期-->
    <van-popup v-model="active.showContractDate"
               position="bottom"
               show-toolbar
               :overlay="true">
      <van-datetime-picker type="date"
                           title="签约日期"
                           v-model="currentContractDate"
                           @cancel="active.showContractDate=false"
                           @confirm="SelContractDateHandler" />
    </van-popup>
    <van-popup v-model="loading" class="loading-popup" :close-on-click-overlay="false" >
         <van-loading type="spinner" />
      </van-popup>
    <linkman :show="showLink"
             :unitType="unitType"
             @close="close"
             @savelink="savelink" />
    <div v-if="showLink=='3'"
         class="contract contract-add addField">
      <!-- <van-nav-bar left-text="新增合同-下一步"
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
              <van-field placeholder="请填写合同内容"
                         class="van-hairline--bottom"
                         type="textarea"
                         v-model="fromData.proper"
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
        <div class="plan-item van-hairline--bottom">
          <van-swipe-cell :ref="'contract-list_'+item.id"
                          v-for="(item,i) in fromData.planList"
                          :key="i"
                          :right-width="130">
            <van-cell-group>
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
                <van-col :span="4" class="padding-left-15">
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
            </van-cell-group>
            <div slot="right"
                 class="right-operation">
              <div class="right-operation-item"
                   @click.stop="editPlan(i)">编辑</div>
              <div class="right-operation-item danger"
                   @click.stop="delPlan(i)">删除</div>
            </div>
          </van-swipe-cell>
        </div>
        <van-row>
          <van-col :span="16"
                   :offset="4">
            <van-button size="large"
                        class="z-large"
                        type="info"
                        @click="openPlan">添加支付计划</van-button>
          </van-col>
        </van-row>
      </div>
      <div class="contract-field">
         <van-row class="contract-field-accessory" >
          <van-col :span="8"
                   class="contract-field-title">
            <span>附件： {{fileTotal}}个</span>
          </van-col>
          <van-col :span="4"
                   :offset="12">
             <span @click="showFile = !showFile">{{showFile == true?'收起':'展开'}}</span>
          </van-col>
        </van-row>
        <div v-show="showFile">
          <template v-for="(item, i) in fromData.fileList">
            <van-row v-if="item.flag=='2'"
                    :key="i">
              <van-col :span="22">
                <div class="file-progress">
                  <span class="contract-field-accessory-item" @click="previewFile(i)">{{item.filename}}
                  </span>
                  <van-progress v-if="item.progress != 100"
                      :show-pivot='false'
                      :percentage="item.progress"/>
                </div>
              </van-col>
              <van-col :span="2">
                <em class="icon-close" v-if="item.progress == 100" @click.stop="delFile(i)"></em>
              </van-col>
            </van-row>
          </template>
        </div>
         <van-row>
          <van-col :span="16"
                   :offset="4">
            <van-uploader class="z-large van-button van-button--primary van-button--large" :after-read="onReadFile">
              添加附件
            </van-uploader>
          </van-col>
        </van-row>
      </div>
      <div class="z-row-padded center">
        <span class="preBtn" @click="showLink='1'">上一步</span>
      </div>
      <div class="z-row-padded">
        <van-button size="large"
                    class="z-large btn-block"
                    type="info"
                    @click="saveContract">确定</van-button>
      </div>
      <van-dialog v-model="showPlan"
                  class="inputDialog"
                  show-cancel-button
                  :before-close="savePlan"
                  :title="tit">
        <van-cell title="名称"
                  class="sel-cell noweight"
                  :value="planname"
                  is-link
                  @click="showName=true" />
        <van-cell-group>
          <van-field v-model="ratio"
                     label="比例"
                     @input="computedValue('ratio')"
                     placeholder="请输入比例">
            <span slot="right-icon">%</span>
          </van-field>
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="amount"
                     label="金额"
                     @input="computedValue('amount')"
                     placeholder="请输入金额">
            <span slot="right-icon">元</span>
          </van-field>
        </van-cell-group>
        <van-field v-model="remark"
                   type="textarea"
                   label="备注"
                   placeholder="" />
      </van-dialog>
      <van-popup v-model="showName"
                 position="bottom"
                 :overlay="false">
        <van-picker show-toolbar
                    title="名称"
                    :columns="htglPaymentState"
                    @cancel=" showName = false"
                    @confirm="selPaymenStateHandler" />
      </van-popup>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import linkman from './linkman';
import {unitConvertToB} from '@/until'
import { getCodeInfoByCode, addTContractInfo, uploadFile,viewFile,viewFilePath,getQYWXProperties } from '@/api/article';

import { constants } from 'fs';

export default {
  components: {
    linkman
  },
  computed: {
    ...mapState(['baseData'])
  },
  data() {
    return {
      active: {
        showSelType: false,
        showSelStatus: false,
        showSelMethod: false,
        showContractDate: false,
        showSelStartTime: false,
        showSelEndTime: false,
        showSelMonetary: false, // 金额单位
        showSelConstruction: false // 工期单位
      },
      fileTotal:0,
      loading:false,
      upLoad:false,
      viewFile:viewFile,
      showFile:true,
      showLink: '1',
      showPlan: false,
      showName: false,
      unitType: '1', // 单位类型
      htglContractType: [], // 合同类型
      htglContractStatus: [], // 合同状态
      htglPaymentMethod: [], // 支付方式
      htglPaymentState: [], // 支付计划名称
      htglDuration: [], // 合同工期
      htglMoney: [],
      constructUnit: {}, // 建筑单位及联系人
      buildUnit: {}, // 承建单位及联系人
      supervisionUnit: {}, // 监理单位及联系人
      fromData: {
        contracttypeName: '请选择合同类型',
        contracttype: '', // 合同类型
        contractname: '', // 合同名称
        contractno: '', // 合同编号
        construct_unitid: '', // 建设单位
        construct_unitname: '',
        construct_personid: '', // 建设单位联系人ID
        build_unitid: '', // 承建单位
        build_unitname: '',
        build_personid: '', // 承建单位联系人ID
        supervision_unitid: '', // 监理单位
        supervision_unitname: '',
        supervision_personid: '', // 监理单位联系人ID
        contractdate: '请选择签约日期', // 签约日期
        amount: '', // 合同金额
        monetaryName: '元', //
        monetary: '1', // 金额单位
        period: '', // 合同工期
        construction: '1', // 工期单位
        constructionname: '天',
        starttime: '请选择开始时间', // 开始时间
        endtime: '请选择结束时间', // 结束时间
        state: '', // 合同状态
        statename: '请选择合同状态',
        payment: '', // 支付方式
        paymentname: '请选择支付方式',
        proper: '', // 合同内容
        planList: [], // 支付计划
        fileList: [] //文件列表
      },
      planname: '',
      sort: '',
      ratio: '',
      amount: '',
      remark: '',
      tit: '',
      editType: false,
      editIndex: null,
      currentStartDate: new Date(),
      currentEndDate: new Date(),
      currentContractDate: new Date()
    };
  },
  created() {
    this.init();
    let query={
      url: window.location.href.split('#')[0]
    }
    getQYWXProperties(query).then(res=>{
        if(res.data.success){
          wx.config({
              beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.corpID, // 必填，企业微信的corpID
              timestamp:res.data.timestamp , // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature,// 必填，签名，见附录1
              jsApiList: ['previewFile','chooseImage','downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      }).catch(err=>{
        console.log(err)
      })
  },
  methods: {
    init() {
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

      if (!this.baseData.htglPaymentState) {
        // 支付计划名称
        getCodeInfoByCode('htglPaymentState')
          .then(res => {
            if (res.data.success) {
              this.htglPaymentState = res.data.list;
              this.htglPaymentState = this.htglPaymentState.filter(item => {
                item.text = item.fieldname;
                return item;
              });
              this.$store.commit({
                type: 'SET_BASE_DATA',
                key: 'htglPaymentState',
                list: this.htglPaymentState
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.htglPaymentState = this.baseData.htglPaymentState;
      }
    },
    // 返回
    goBack() {
      this.$router.push({ path: 'list' });
    },
    openPopup(flag) {
      for (let key in this.active) {
        this.active[key] = false;
      }
      this.active[flag] = true;
    },
    // 合同类型
    selTypeHandler(data) {
      this.fromData.contracttype = data.fieldcode;
      this.fromData.contracttypeName = data.fieldname;
      this.active.showSelType = false;
    },
    // 合同状态
    selStatusHandler(data) {
      this.fromData.state = data.fieldcode;
      this.fromData.statename = data.fieldname;
      this.active.showSelStatus = false;
    },
    // 开始时间
    SelStartTimeHandler(value) {
      this.fromData.starttime = this.Datemat.format(value, 'yyyy-MM-dd');
      this.setEndTime()
      this.active.showSelStartTime = false;
    },
    // 设置结束时间
    setEndTime(){
      
      if(!this.fromData.starttime || this.fromData.starttime =='请选择开始时间'){
        return false
      }
      if(!this.fromData.period){
        return false
      }
      switch(this.fromData.construction){
        case '1':
         this.fromData.endtime =  this.Datemat.addDate('day',this.fromData.starttime,this.fromData.period)
        break;
        case '2':
         this.fromData.endtime =  this.Datemat.addDate('mounth',this.fromData.starttime,this.fromData.period)
        break;
        case '4':
         this.fromData.endtime =  this.Datemat.addDate('year',this.fromData.starttime,this.fromData.period)
        break;
      }
    },
    // 结束时间
    SelEndTimeHandler(value) {
      this.fromData.endtime = this.Datemat.format(value, 'yyyy-MM-dd');
      this.active.showSelEndTime = false;
    },
    // 签约日期
    SelContractDateHandler(value) {
      this.fromData.contractdate = this.Datemat.format(value, 'yyyy-MM-dd');
      this.active.showContractDate = false;
    },
    // 合同金额单位
    selMonetaryHandler(data) {
      this.fromData.monetary = data.fieldcode;
      this.fromData.monetaryName = data.fieldname;
      this.active.showSelMonetary = false;
    },
    // 合同工期
    selConstructionHandler(data) {
      this.fromData.construction = data.fieldcode;
      this.fromData.constructionname = data.fieldname;
      this.setEndTime()
      this.active.showSelConstruction = false;
    },
    // 付款方式
    selPaymentHandler(data) {
      this.fromData.payment = data.fieldcode;
      this.fromData.paymentname = data.fieldname;
      this.active.showSelMethod = false;
    },
    // 支付计划名称
    selPaymenStateHandler(data) {
      this.sort = data.fieldcode;
      this.planname = data.fieldname;
      this.showName = false;
    },
    formatterDate(type, value) {
      if (type === 'year') {
        return value;
      }
      if (type === 'month') {
        return value;
      }
      return value;
    },
    // 打开选择单位
    openLink(type) {
      this.unitType = type;
      this.showLink = '2';
    },
    // 关闭选择单位
    close(type) {
      this.showLink = '1';
      if (type == 'refresh') {
        console.log('刷新');
      }
    },
    // 保存选择单位
    savelink(data) {
      this.showLink = '1';
      switch (this.unitType) {
        case '1':
          this.constructUnit.contact = data.contact;
          this.constructUnit.phone = data.phone;
          this.fromData.construct_personid = data.contactId;
          this.fromData.construct_unitid = data.unitId;
          this.fromData.construct_unitname = data.unitname;
          break;
        case '2':
          this.buildUnit.contact = data.contact;
          this.buildUnit.phone = data.phone;
          this.fromData.build_personid = data.contactId;
          this.fromData.build_unitid = data.unitId;
          this.fromData.build_unitname = data.unitname;
          break;
        case '3':
          this.supervisionUnit.contact = data.contact;
          this.supervisionUnit.phone = data.phone;
          this.fromData.supervision_personid = data.contactId;
          this.fromData.supervision_unitid = data.unitId;
          this.fromData.supervision_unitname = data.unitname;
          break;
      }
    },
    // 打开支付计划
    openPlan() {
      this.tit = `第${this.fromData.planList.length + 1}期支付计划`;
      this.editType = false;
      this.editIndex = null;
      this.planname = '';
      this.remark = '';
      this.ratio = '';
      this.amount = '';
      this.sort = '';
      this.showPlan = true;
    },
    // 编辑支付计划
    editPlan(i) {
      this.editType = true;
      this.showPlan = true;
      this.editIndex = i;
      this.planname = this.fromData.planList[i].name;
      this.ratio = this.fromData.planList[i].ratio;
      this.amount = this.fromData.planList[i].amount;
      this.remark = this.fromData.planList[i].remark;
      this.sort = this.fromData.planList[i].sort;
    },
    // 上传图片
    onReadImg(file) {
      var formData = new FormData(); //初始化一个FormData对象
      formData.append('file', file.file); //将文件塞入FormData
      formData.append('name', file.file.name);
      this.upLoad = true
      uploadFile(formData)
        .then(res => {
          if(res.data.success){
            let row={
              "fileid": res.data.data[0].fileid,  //文件ID
              "filename": res.data.data[0].filename, //文件名称
              "filesize": res.data.data[0].filesize,   //文件大小
              "flag": "1"	,
              "progress":100
              
            }
            this.fromData.fileList.push(row)
          }
          else{
             this.$toast(res.data.message);
          }
          this.upLoad = false
        })
        .catch(err => {
          this.upLoad = false
          console.log(err);
        });
    },
    // 上传附件
    onReadFile(file) {
      var formData = new FormData(); //初始化一个FormData对象
      formData.append('file', file.file); //将文件塞入FormData
      formData.append('name', file.file.name);
      let row={
        "fileid": '',  //文件ID
        "filename": file.file.name, //文件名称
        "filesize": '200KB',   //文件大小
        "flag": "2"	,
        "progress":0
      }
      this.fromData.fileList.push(row)
      let len = this.fromData.fileList.length - 1
      this.fileTotal = 0;
      this.fromData.fileList.map(item=>{
        if(item.flag == '2'){
          this.fileTotal ++
        }
      })
      uploadFile(formData,res=>{
        let progress = parseInt(res.loaded/res.total * 100)
        this.fromData.fileList[len].progress = progress
      }) 
        .then(res => {
          if(res.data.success){
            let row={
              "fileid": res.data.data[0].fileid,  //文件ID
              "filename": res.data.data[0].filename, //文件名称
              "filesize": res.data.data[0].filesize,   //文件大小
              "flag": "2"	,
              "progress":100
            }
            this.$set(this.fromData.fileList,len,row)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    openFileList(){
      console.log(111)
    },
    delFile(i){
      this.$dialog.confirm({
        title: '删除确认',
        message: '此操作就永久删除文件，是否继续'
      })
        .then(() => {
          this.fromData.fileList.splice(i, 1);
        })
        .catch(() => {});
    },
    // 删除支付计划
    delPlan(i) {
      this.$dialog.confirm({
        title: '删除确认',
        message: '此操作就永久删除改支付记录，是否继续'
      })
        .then(() => {
          this.fromData.planList.splice(i, 1);
        })
        .catch(() => {});
    },
    // 暂存支付计划
    savePlan(action, done) {
      if (action == 'confirm') {
        if (!this.planname) {
          this.$toast('请选择支付名称');
          done(false);
          return;
        }
        if (!this.ratio) {
          this.$toast('请输入比例');
          done(false);
          return;
        } else if (
          !/^((0{1}\.\d+)|([1-9]\d*\.{1}\d+)|([1-9]+\d*))$/.test(this.ratio)
        ) {
          this.$toast('比例最多只能有两位小数的正数');
          done(false);
          return;
        }else if(this.ratio > 100){
          this.$toast('比例不能大于100%');
          done(false);
          return;
        }
        if (!this.amount) {
          this.$toast('请输入金额');
          done(false);
          return;
        } else if (
          !/^((0{1}\.\d+)|([1-9]\d*\.{1}\d+)|([1-9]+\d*))$/.test(this.amount)
        ) {
          this.$toast('金额最多只能有两位小数的正数');
          done(false);
          return;
        }

        let total = parseFloat(this.amount)
          for(let i=0;i<this.fromData.planList.length;i++){
            total += parseFloat(this.fromData.planList[i].amount)
          }
        if(total > this.fromData.amount){
          this.$toast('支付计划的总金额大于合同金额');
          done(false);
          return;
        }

        let row = {
          name: this.planname,
          ratio: this.ratio, //支付比例
          amount: this.amount, //支付金额
          remark: this.remark,
          sort: this.sort
        };
        if (this.editType) {
          this.$set(this.fromData.planList, this.editIndex, row);
        } else {
          this.fromData.planList.push(row);
        }
        this.fromData.planList.sort((a,b) => {
          return parseInt(a.sort) - parseInt(b.sort)
        })
        done();
      } else {
        done();
      }
    },
    // 计算金额/比例
    computedValue(type) {
      switch (type) {
        case 'ratio':
          this.amount =
            this.fromData.amount * this.fromData.monetary * this.ratio / 100;
          break;
        case 'amount':
          this.ratio =
            this.amount / (this.fromData.amount * this.fromData.monetary) * 100;
          break;
      }
    },
    // 验证
    validate() {
      if (!this.fromData.contracttype) {
        this.$toast('请选择合同类型');
        return false;
      }
      if (!this.fromData.contractname) {
        this.$toast('请输入合同名称');
        return false;
      }
      if (!this.fromData.contractno) {
        this.$toast('请输入合同编号');
        return false;
      }
      if (!this.fromData.construct_unitname) {
        this.$toast('请选择建设单位');
        return false;
      }
      if (!this.fromData.build_unitname) {
        this.$toast('请选择承建单位');
        return false;
      }
      // if (!this.fromData.supervision_unitname) {
      //   this.$toast('请选择监理单位');
      //   return false;
      // }
      if (!this.fromData.contractdate) {
        this.$toast('请选择签约日期');
        return false;
      }
      if (!this.fromData.amount) {
        this.$toast('请输入合同金额');
        return false;
      }
      if (!this.fromData.period) {
        this.$toast('请输入合同工期');
        return false;
      } else if (!/^[1-9]\d*$/.test(this.fromData.period)) {
        this.$toast('合同工期只能为正整数');
        return false;
      }
      // if (!this.fromData.starttime) {
      //   this.$toast('请选择开始时间');
      //   return false;
      // }
      // if (!this.fromData.endtime) {
      //   this.$toast('请选择结束时间');
      //   return false;
      // }
      if (this.fromData.starttime > this.fromData.endtime) {
        this.$toast('开始时间不能大于结束时间');
        return false;
      }
      // if (!this.fromData.state) {
      //   this.$toast('请选择合同状态');
      //   return false;
      // }
      // if (!this.fromData.payment) {
      //   this.$toast('请选择付款方式');
      //   return false;
      // }

      return true;
    },
    // 保存合同
    saveContract() {
      let data = this.fromData.fileList.filter(item=>{
          return item.progress < 100
      })
      if(data.length>0){
        this.$toast('请稍候，文件正在上传')
        return
      }
      if (!this.validate()) {
        return;
      }
      this.loading = true
      if(this.fromData.planList.length<1){
        this.$toast('请添加支付计划')
        return
      }
      addTContractInfo(this.fromData)
        .then(res => {
          if (res.data.success) {
            this.$toast('新增成功');
            this.$router.push({ path: 'list' });
          }
          else{
            this.$toast(res.data.message)
          }
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          console.log(err);
        });
    },
    previewFile(i){
      if (/Android|webOS|iPhone|iPod|BlackBerry|iPad|SymbianOS/i.test(navigator.userAgent)) {
        let size = unitConvertToB(this.fromData.fileList[i].filesize)
        wx.previewFile({
            url: viewFilePath + this.fromData.fileList[i].fileid + '/' + this.fromData.fileList[i].filename , // 需要预览文件的地址(必填，可以使用相对路径)
            name: this.fromData.fileList[i].filename, // 需要预览文件的文件名(不填的话取url的最后部分)
            size: size // 需要预览文件的字节大小(必填)
        });
      }
      else{
        this.$toast('PC端不支持微信文件预览');
      }
    }
  }
};
</script>
