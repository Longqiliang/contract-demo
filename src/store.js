import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseData:{}
  },
  mutations: {
    SET_BASE_DATA:(state,payload)=>{
      state.baseData[payload.key] = payload.list
    }
  },
  actions: {}
});
