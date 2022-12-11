import request from '../utils/request-form'
import {api} from './api-setting'

function getRequest(API_KEY,data){
  let setting = api()
  let params = {
    url: setting[API_KEY].ajax_url,
    method: setting[API_KEY].method
  }
  if(setting[API_KEY].method === "POST"||setting[API_KEY].method==="post"){
    params.headers = {
      "Content-Type":setting[API_KEY].contentType
    }
    params.data = {
      action:setting[API_KEY].action,...data
    }
  }else{
    params.params = {
      action:setting[API_KEY].action,...data
    }
  }
  return request(params)
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

export function initProducts(data) {
  return getRequest('INIT_PRODUCTS',data)
}

export function getProductHandleHistory(data) {
  return getRequest('GET_PRODUCT_HANDLE_HISTORY',data)
}

export default {initProducts, getVsInitStatus ,getProductCategories, getProductsByCategory,getProductHandleHistory}
