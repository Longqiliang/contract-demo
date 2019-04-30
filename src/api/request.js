import axios from 'axios';
import Qs from 'qs';
import {
  Notify
} from 'vant';

const SERVICE = axios.create({
  timeout: 20000,
  transformRequest: [function (data) {
    data = Qs.stringify(data);
    return data;
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

SERVICE.interceptors.response.use(
  response => {
    if (response.data.code === '401' && !response.data.success) {
      Notify({
        message: response.data.message,
        duration: 2 * 1000
      })
    }
    return response
  },
  error => {
    // Notify({
    //   message: error.message,
    //   duration: 2 * 1000
    // })
    return Promise.reject(error)
  }
)

SERVICE.all = axios.all // all方法没有挂载到 axios 实例对象中 

const SERVICEDEFAULT = axios.create({
  timeout: 20000
})

SERVICEDEFAULT.interceptors.response.use(
  response => {
    if (response.data.code === '401' && !response.data.success) {
      Notify({
        message: response.data.message,
        duration: 2 * 1000
      })
    }
    return response
  },
  error => {
    // Notify({
    //   message: error.message,
    //   duration: 2 * 1000
    // })
    return Promise.reject(error)
  }
)

SERVICEDEFAULT.all = axios.all // all方法没有挂载到 axios 实例对象中 

const UploadFile = axios.create({
  timeout: 20000
})

export {
  SERVICE,
  SERVICEDEFAULT,
  UploadFile
}