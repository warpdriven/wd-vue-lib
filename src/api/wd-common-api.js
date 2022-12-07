import request from '../utils/request'
import {api} from './api-setting'

export function getProductCategories(data) {
  let setting = api()
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
  let setting = api()
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
