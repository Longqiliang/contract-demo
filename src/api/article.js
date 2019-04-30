import {
  SERVICE as request,
  SERVICEDEFAULT as requestBody,
  UploadFile
} from './request.js'

const API = '/contractManager'

const  viewFile = API + '/projectManager/viewFile/' // 预览文件

const viewFilePath = 'https://www.zxpaas.com' + API + '/projectManager/viewFile_wx/'

export {request,viewFile,viewFilePath}

/**
 * @description 获取配置信息
 */
export function getQYWXProperties(query) {
  return request({
    url: `${API}/projectManager/getQYWXProperties`,
    method: 'get',
    params:query
  });
}

/**
 * @description 上传文件
 * @param  {Object} query
 */
export function uploadFile(query,calback) {
  return UploadFile({
    url: `${API}/projectManager/uploadFile`,
    method: 'post',
    data: query,
    onUploadProgress: function (progressEvent) {
      // 对原生进度事件的处理
      if (progressEvent.lengthComputable) {
        if(calback){
          calback(progressEvent)
        }
      }
    }
  });
}

/**
 * @description 获取数据字典
 * @param  {String} query
 */
export function getCodeInfoByCode(query) {
  return request({
    url: `${API}/utils/getCodeInfoByCode/` + query,
    method: 'get'
  });
}

// 合同列表模块

/**
 * @description 查询合同列表
 * @param  {Object} query
 */
export function getAvoidRegulationInfo(query) {
  return request({
    url: `${API}/tContractInfo/queryTContractInfoList`,
    method: 'get',
    params: query
  });
}

/**
 * @description 查询合同详情
 * @param  {Object} query
 */
export function queryTContractInfo(query) {
  return request({
    url: `${API}/tContractInfo/queryTContractInfo`,
    method: 'get',
    params: query
  });
}

/**
 * @description 删除合同
 * @param  {Object} query
 */
export function deleteTContractInfo(query) {
  return request({
    url: `${API}/tContractInfo/deleteTContractInfo`,
    method: 'post',
    data: query
  });
}

/**
 * @description 查询单位列表
 * @param  {Object} query
 */
export function addContractUnitList(query) {
  return request({
    url: `${API}/tContractInfo/addContractUnitList`,
    method: 'get',
    params: query
  });
}

/**
 * @description 查询单位联系人列表
 * @param  {Object} query
 */
export function addContractUnitPersonList(query) {
  return request({
    url: `${API}/tContractInfo/addContractUnitPersonList`,
    method: 'get',
    params: query
  });
}

/**
 * @description 新增合同信息主表
 * @param  {Object} query
 * @prop {String} query[contractno] 合同编号
 * @prop {String} query[contractname] 合同名称
 * @prop {String} query[contracttype] 合同类型
 * @prop {String} query[construct_unitid] 建设单位id
 * ...
 */
export function addTContractInfo(query) {
  return requestBody({
    url: `${API}/tContractInfo/addTContractInfo`,
    method: 'post',
    data: query
  });
}

/**
 * @description 新增合同信息主表
 * @param  {Object} query
 * @prop {String} query[contractno] 合同编号
 * @prop {String} query[contractname] 合同名称
 * @prop {String} query[contracttype] 合同类型
 * @prop {String} query[construct_unitid] 建设单位id
 * ...
 */
export function editTContractInfo(query) {
  return requestBody({
    url: `${API}/tContractInfo/editTContractInfo`,
    method: 'post',
    data: query
  });
}

/**
 * @description 新增单位
 * @param  {Object} query
 */
export function addContractAddUnit(query) {
  return request({
    url: `${API}/tContractInfo/addContractAddUnit`,
    method: 'post',
    data: query
  });
}

/**
 * @description 新增单位联系人
 * @param  {Object} query
 */
export function addContractAddUnitPerson(query) {
  return request({
    url: `${API}/tContractInfo/addContractAddUnitPerson`,
    method: 'post',
    data: query
  });
}

// 支付明细模块

/**
 * @description 查询合同账号的支付计划
 * @param  {Object} query
 * @prop {String} query[id] 合同编号
 */
export function queryPaymentPlan(query) {
  return request({
    url: `${API}/tContractPaymentrecord/queryPaymentPlan`,
    method: 'get',
    params: query
  });
}
/**
 * @description 新增支付明细
 * @param  {Object} query
 */
export function addTContractPaymentrecord(query) {
  return request({
    url: `${API}/tContractPaymentrecord/addTContractPaymentrecord`,
    method: 'post',
    data: query
  });
}

/**
 * @description 查询支付明细列表
 * @param  {Object} query
 */
export function queryTContractPaymentrecordList(query) {
  return request({
    url: `${API}/tContractPaymentrecord/queryTContractPaymentrecordList`,
    method: 'get',
    params: query
  });
}

/**
 * @description 查询支付明细详情
 * @param  {Object} query
 */
export function queryTContractPaymentrecord(query) {
  return request({
    url: `${API}/tContractPaymentrecord/queryTContractPaymentrecord`,
    method: 'get',
    params: query
  });
}

/**
 * @description 修改支付明细
 * @param  {Object} query
 */
export function editTContractPaymentrecord(query) {
  return requestBody({
    url: `${API}/tContractPaymentrecord/editTContractPaymentrecord`,
    method: 'post',
    data: query
  });
}

/**
 * @description 删除支付明细
 * @param  {Object} query
 * @prop {String} query[id] 支付明细id
 */
export function deleteTContractPaymentrecord(query) {
  return request({
    url: `${API}/tContractPaymentrecord/deleteTContractPaymentrecord`,
    method: 'post',
    data: query
  });
}

// 统计分析模块

/**
 * @description 合同类型数据字典查询
 */
export function htglContractType() {
  return request({
    url: `${API}/utils/getCodeInfoByCode/htglContractType`,
    method: 'get'
  });
}

/**
 * @description 基本信息查询
 * @param  {Object} query
 */
export function queryBasicInfo(query) {
  return request({
    url: `${API}/statisticalAnalysis/queryBasicInfo`,
    method: 'get',
    params: query
  });
}

/**
 * @description 执行进度监管查询
 * @param  {Object} query
 */
export function queryExecutionProgress(query) {
  return request({
    url: `${API}/statisticalAnalysis/queryExecutionProgress`,
    method: 'get',
    params: query
  });
}

/**
 * @description 付款趋势查询
 * @param  {Object} query
 */
export function queryPaymentTrend(query) {
  return request({
    url: `${API}/statisticalAnalysis/queryPaymentTrend`,
    method: 'get',
    params: query
  });
}

// 数据导出模块

/**
 *
 * @description 数据导出
 * @export
 * @param {Object} query
 * @returns
 */
export function dataOutputExcel(query) {
  return request({
    url: `${API}/statisticalAnalysis/dataOutputExcel`,
    method: 'get',
    params: query
  });
}
