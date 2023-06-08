import merge from "deepmerge";

window.WD_API_SETTING = {
  INIT_PRODUCTS: {
    ajax_url: "/api/wp-admin/admin-ajax.php",
    action: "wd_init_products",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
  },
  GET_VS_CREDIT_STATUS: {
    ajax_url: "/api/wp-admin/admin-ajax.php",
    action: "wd_get_vs_credit_status",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
  },
  GET_PRODUCT_HANDLE_HISTORY: {
    ajax_url: "/api/wp-admin/admin-ajax.php",
    action: "wd_get_woo_product_handle_history",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
  },
  GET_PRODUCT_CATEGORIES: {
    ajax_url: "/api/wp-admin/admin-ajax.php",
    action: "wd_get_woo_product_categories",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
  },
  GET_PRODUCTS_BY_CATEGORY: {
    ajax_url: "/api/wp-admin/admin-ajax.php",
    action: "wd_get_woo_products_by_category",
  },
  GET_PRODUCT_HTML: {
    ajax_url: "/api/wp-admin/admin-ajax.php",
    action: "wd_get_woo_product_html",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
  },
  GET_PRODUCTS_HTML_BY_VS: {
    ajax_url: "/api/wp-admin/admin-ajax.php",
    action: "wd_get_woo_products_html_by_vs",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
  },
  GET_PRODUCT_LIST_HTML: {
    ajax_url: "/api/wp-admin/admin-ajax.php",
    action: "wd_get_woo_product_list_html",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
  },
  GET_USER_EXSITED: {
    ajax_url: "/api/wp-admin/admin-ajax.php?action=wd_get_user_exsited",
    method: "GET",
  },
  CREATE_USER: {
    ajax_url: "/api/wp-admin/admin-ajax.php?action=wd_create_erp_user",
    method: "POST",
    contentType: "application/json",
  },
  CREATE_MY_WEBSITE: {
    ajax_url: "/api/wp-admin/admin-ajax.php?action=wd_create_my_website",
    method: "POST",
    contentType: "application/json",
  },
  CANCEL_INIT: {
    ajax_url: "/api/wp-admin/admin-ajax.php",
    action: "wd_init_product_cancel",
  },
};

export function config(config) {
  window.WD_API_SETTING = merge(window.WD_API_SETTING, config);
}

export function api() {
  return window.WD_API_SETTING;
}

export default { config, api };
