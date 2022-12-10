import request from '../utils/request-form'
import {api} from './api-setting'

function getRequest(API_KEY,data){
  let setting = api()
  return request({
    url: setting[API_KEY].ajax_url,
    method: setting[API_KEY].method,
    headers:{
      "Content-Type":setting[API_KEY].contentType
    },
    data:{
      action:setting[API_KEY].action,...data
    }
  })
}

export function getProductCategories(data) {
  return getRequest('GET_PRODUCT_CATEGORIES',data)
}

export function getProductsByCategory(data) {
  return getRequest('GET_PRODUCTS_BY_CATEGORY',data)
}

export function getVsInitStatus(data) {
  return getRequest('GET_VS_INIT_STATUS',data)
}

export function initProductsByCategories(data) {
  return getRequest('INIT_PRODUCTS_BY_CATEGORIES',data)
}


export default {initProductsByCategories, getVsInitStatus ,getProductCategories, getProductsByCategory}
