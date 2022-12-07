import request from '../utils/request'
import {api} from './api-setting'

let setting = api()

export function getProductCategories(data) {
  return request({
    url: setting['GET_PRODUCT_CATEGORIES'].ajax_url,
    method: 'post',
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    data:{
      action:setting['GET_PRODUCT_CATEGORIES'].action,...data
    }
  })
}

export function getProductsByCategory(data) {
  return request({
    url: setting['GET_PRODUCTS_BY_CATEGORY'].ajax_url,
    method: 'post',
    headers:{
      "Content-Type":"application/x-www-form-urlencoded"
    },
    data:{
      action:setting['GET_PRODUCTS_BY_CATEGORY'].action,...data
    }
  })
}


export default { getProductCategories,getProductsByCategory}
