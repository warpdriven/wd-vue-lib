import request from "../utils/request-form";
import { api } from "./api-setting";

function getRequest(API_KEY, data) {
  let setting = api();
  let params = {
    url: setting[API_KEY].ajax_url,
    method: setting[API_KEY].method,
  };
  if (
    setting[API_KEY].method === "POST" ||
    setting[API_KEY].method === "post"
  ) {
    params.headers = {
      "Content-Type": setting[API_KEY].contentType,
      "X-API-Key": "wheqjkewwe4f223jqowe18",
    };
    params.data = {
      action: setting[API_KEY].action,
      ...data,
    };
  } else {
    params.params = {
      action: setting[API_KEY].action,
      ...data,
    };
  }
  return request(params);
}

export function getVsCreditStatus(data) {
  return getRequest("GET_VS_CREDIT_STATUS", data);
}

export function initProducts(data) {
  return getRequest("INIT_PRODUCTS", data);
}

export function getProductCategories(data) {
  return getRequest("GET_PRODUCT_CATEGORIES", data);
}

export function getProductsByCategory(data) {
  return getRequest("GET_PRODUCTS_BY_CATEGORY", {
    purchasable: true,
    status: "publish",
    ...data,
  });
}

export function getProductHandleHistory(data) {
  return getRequest("GET_PRODUCT_HANDLE_HISTORY", data);
}

export function getProductsHtmlByVs(data) {
  return getRequest("GET_PRODUCTS_HTML_BY_VS", data);
}

export function getProductHtml(data) {
  return getRequest("GET_PRODUCT_HTML", data);
}

export function getProductListHtml(data) {
  return getRequest("GET_PRODUCT_LIST_HTML", data);
}

export function getUserExsited(data) {
  return getRequest("GET_USER_EXSITED", data);
}

export function createUser(data) {
  return getRequest("CREATE_USER", data);
}

export function getMyWebside(data) {
  return getRequest("GET_MY_WEBSIDE", data);
}

export function createMyWebsite(data) {
  return getRequest("CREATE_MY_WEBSITE", data);
}

export function cancelInit(data) {
  return getRequest("CANCEL_INIT", data);
}

export function getErpWebsite(data) {
  return getRequest("GET_ERP_WEBSITE", data);
}

export default {
  initProducts,
  getVsCreditStatus,
  getProductCategories,
  getProductsByCategory,
  getProductHandleHistory,
  getProductsHtmlByVs,
  getProductHtml,
  getProductListHtml,
  createUser,
  getMyWebside,
  createMyWebsite,
  cancelInit,
  getErpWebsite,
};
