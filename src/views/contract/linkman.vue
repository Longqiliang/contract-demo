<template>
  <div class="app-while"
       v-if="show=='2'">
    <div v-if="showType==1">
      <!-- <van-nav-bar left-text="选择单位"
                   @click-left="close"
                   left-arrow /> -->
      <van-search v-model="keyWorld"
                  @input="searchUnit"
                  placeholder="请输入搜索关键词" />
      <van-radio-group class="contract-linkman"
                       v-model="unitId">
        <van-radio v-for="(item,i) in unitList "
                   :key="'unit_'+i"
                   :name="item.id"
                   @click="openPeople(item.id,item.unitname)">{{item.unitname}}</van-radio>
      </van-radio-group>
      <van-button class="contract-addBtn"
                  ref="addBtnUnit"
                  id="addBtnUnit"
                  @click="showType=2"
                  type="info">
        <i class="z-icon z-icon-add"></i>
      </van-button>
    </div>
    <div v-else-if="showType==2">
      <!-- <van-nav-bar left-text="新增单位"
                   @click-left="showType=1"
                   left-arrow /> -->
      <div class="contract-field">
        <van-row>
          <van-col :span="24"
                   class="contract-field-title">
            单位名称
          </van-col>
          <van-col :span="24">
            <van-cell-group class="van-hairline--bottom">
              <van-field v-model="addUnitName"
                         placeholder="请输入单位名称"
                         class="van-hairline--bottom" />
            </van-cell-group>
          </van-col>
        </van-row>
      </div>
      <van-row class="bottomTool">
        <van-col class="bottomTool-left"
                 :span="12">
          <van-button @click="saveUnit">保存并关闭</van-button>
        </van-col>
        <van-col class="bottomTool-right"
                 :span="12">
          <van-button @click="saveUnit('1')">保存并创建联系人</van-button>
        </van-col>
      </van-row>
    </div>
    <div v-else-if="showType==3">
      <!-- <van-nav-bar left-text="选择联系人"
                   @click-left="showType=1"
                   left-arrow /> -->
      <!-- <van-search placeholder="请输入搜索关键词" /> -->
      <van-radio-group class="contract-linkman"
                       v-model="contactId">
        <van-radio v-for="(item,i) in linkmanList "
                   :key="'people_'+i"
                   :name="item.id">{{item.contact}}</van-radio>
      </van-radio-group>
      <van-button class="contract-addBtn"
                  type="info"
                  @click="openAddLink">
        <i class="z-icon z-icon-add"></i>
      </van-button>
      <van-row class="bottomTool">
        <van-col class="bottomTool-left"
                 :span="7">
          <van-button @click="cancelContact">取消</van-button>
        </van-col>
        <van-col class="bottomTool-right"
                 :offset="10"
                 :span="7">
          <van-button type="info"
                      @click="selContact">确定</van-button>
        </van-col>
      </van-row>
    </div>
    <van-dialog v-model="addlink"
                class="inputDialog"
                show-cancel-button
                :before-close="beforeClose">
      <van-field v-model="linkman"
                 label="联系人"
                 placeholder="请输入联系人" />
      <van-field v-model="mobile"
                 label="联系电话"
                 placeholder="请输入联系电话" />
    </van-dialog>
  </div>
</template>
<script>
import {
  addContractUnitList,
  addContractUnitPersonList,
  addContractAddUnit,
  addContractAddUnitPerson
} from '@/api/article';
import { setTimeout } from 'timers';
import { constants } from 'crypto';
export default {
  props: {
    show: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    unitType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showType: 1, // 当前的标签页
      unitId: '',
      contactId: '',
      addlink: false,
      isloading: false,
      linkman: '',
      keyWorld: '',
      unitname: '',
      addUnitName: '',
      mobile: '',
      unitList: [], // 单位列表
      linkmanList: [], // 单位联系人列表
      openType: '', // 打开新增联系人弹窗的方式
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    };
  },
  methods: {
    searchUnit() {
      setTimeout(() => {
        this.addContractUnitList();
      }, 200);
    },
    openPeople(id, unitname) {
      this.unitId = id;
      this.unitname = unitname;
      this.showType = 3;
      // let query = {
      //   unitid: this.unitId
      // };
      this.addContractUnitPersonList();
    },
    close() {
      this.$emit('close');
    },
    savelink() {
      this.$emit('savelink');
    },
    // 关闭新增联系人的弹窗
    beforeClose(type, done) {
      if (type == 'confirm') {
        if (this.mobile.trim() == '') {
          this.$toast('请输入手机号码');
          done(false);
          return;
        } else if (!/^1[34578]\d{9}$/.test(this.mobile)) {
          this.$toast('请输入正确的手机号码');
          done(false);
          return;
        }
        if (this.linkman.trim() == '') {
          this.$toast('请输入手机号码');
          done(false);
          return;
        }
        let query = {
          unitid: this.unitId,
          contact: this.linkman,
          phone: this.mobile
        };
        addContractAddUnitPerson(query)
          .then(res => {
            done();
            if (res.data.success) {
              if (this.openType == '1') {
                // 通过新增单位进来的
                this.$toast('新增成功');
                let linkman = {
                  unitId: this.unitId,
                  unitname: this.addUnitName,
                  contactId: res.data.personid,
                  contact: this.linkman,
                  phone: this.mobile
                };
                this.showType = 1;
                this.unitId = '';
                this.$emit('savelink', linkman);
              } else {
                // 通过联系人页面进来的
                this.$toast('新增成功');
                this.addContractUnitPersonList();
              }
            }
          })
          .catch(err => {
            done();
            console.log(err);
          });
      } else {
        done();
      }
    },
    // 单位列表
    addContractUnitList() {
      if (this.isloading) {
        return;
      }
      let query = {
        unitname: this.keyWorld
        // unittype: this.unitType
      };
      addContractUnitList(query)
        .then(res => {
          this.isloading = false;
          if (res.data.success) {
            this.unitList = res.data.list;
          }
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    // 单位联系人列表
    addContractUnitPersonList() {
      let query = {
        unitid: this.unitId
      };
      addContractUnitPersonList(query)
        .then(res => {
          if (res.data.success) {
            this.linkmanList = res.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择联系人
    selContact() {
      if (!this.contactId) {
        this.$toast('请选择联系人');
        return;
      }
      let linkman = {
        unitId: this.unitId,
        unitname: this.unitname
      };
      let obj = this.linkmanList.filter(item => {
        if (item.id == this.contactId) {
          return item;
        }
      });
      if (obj.length > 0) {
        linkman.contactId = obj[0].id;
        linkman.contact = obj[0].contact;
        linkman.phone = obj[0].phone;
      }
      this.showType = 1;
      this.unitId = '';
      this.$emit('savelink', linkman);
    },
    // 取消 选择联系人
    cancelContact() {
      this.contactId = '';
      this.showType = 1;
    },
    // 保存并关闭 / 保存并创建联系人
    saveUnit(type) {
      if (this.addUnitName.trim() == '') {
        this.$toast('请输入单位名称');
        return;
      }
      let query = {
        unitname: this.addUnitName
        //  unittype :''
      };
      this.unitId = '';
      addContractAddUnit(query)
        .then(res => {
          if (res.data.success) {
            if (type == '1') {
              this.unitId = res.data.unitid;
              this.addlink = true;
              this.openAddLink('1');
            } else {
              this.$toast('新增成功');
              this.showType = 1;
              this.addContractUnitList();
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 打开新增联系人窗口
    openAddLink(type) {
      this.openType = type;
      this.addlink = true;
      this.linkman = '';
      this.mobile = '';
    }
  },
  watch: {
    show(flag) {
      if (flag) {
        this.addContractUnitList();
        // this.$nextTick(() => {
        //   if (!document.getElementById('addBtnUnit')) {
        //     return;
        //   }
        //   document
        //     .getElementById('addBtnUnit')
        //     .addEventListener('touchstart', e => {
        //       document.body.style.overflow = 'hidden';
        //     });
        //   document
        //     .getElementById('addBtnUnit')
        //     .addEventListener('touchmove', function(e) {
        //       e.stopPropagation();
        //       let clientHeight = window.screen.height;
        //       let clientWidth = window.screen.width;
        //       let top = 0,
        //         left = 0;
        //       if (e.targetTouches[0].clientY > clientHeight - 60) {
        //         top = clientHeight - 80;
        //       } else if (e.targetTouches[0].clientY < 120) {
        //         top = 70;
        //       } else {
        //         top = e.targetTouches[0].clientY - 30;
        //       }

        //       if (e.targetTouches[0].clientX > clientWidth - 40) {
        //         left = clientWidth - 75;
        //       } else if (e.targetTouches[0].clientX < 30) {
        //         left = 15;
        //       } else {
        //         left = e.targetTouches[0].clientX - 30;
        //       }
        //       document.getElementById('addBtnUnit').style.top = top + 'px';
        //       document.getElementById('addBtnUnit').style.left = left + 'px';
        //     });
        //   document
        //     .getElementById('addBtnUnit')
        //     .addEventListener('touchend', e => {
        //       document.body.style.overflow = 'auto';
        //     });
        // });
      }
    },
    showType(val) {
      if (val == 2) {
        this.addUnitName = '';
      }
    }
  },
  mounted() {
    this.$nextTick(() => {});
  }
};
</script>
