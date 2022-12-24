import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: '/' // api 的 base_url
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {

    if(!response.data.status){
      if(response.data.msg||response.data.detail){
        ElMessage.error({
          message: response.data.msg||response.data.detail
        });  
      }
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
