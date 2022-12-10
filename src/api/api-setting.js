import merge from 'deepmerge'

window.WD_API_SETTING={
    INIT_PRODUCTS:{
        ajax_url:'/api/wp-admin/admin-ajax.php',
        action:"wd_init_products",
        method:"POST",
        contentType: "application/x-www-form-urlencoded"
    },
    GET_VS_INIT_STATUS:{
        ajax_url:'/api/wp-admin/admin-ajax.php',
        action:"wd_get_vs_init_status",
        method:"POST",
        contentType: "application/x-www-form-urlencoded"
    },
    GET_PRODUCT_HTML:{
        ajax_url:"/api/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_html",
        method:"POST",
        contentType: "application/x-www-form-urlencoded"
    },
    GET_PRODUCTS_HTML_BY_VS:{
        ajax_url:"/api/wp-admin/admin-ajax.php",
        action:"wd_get_woo_products_html_by_vs",
        method:"POST",
        contentType: "application/x-www-form-urlencoded"
    },
    GET_PRODUCT_LIST_HTML:{
        ajax_url:"/api/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_list_html",
        method:"POST",
        contentType: "application/x-www-form-urlencoded"
    },
    GET_HANDLE_HISTORY:{
        ajax_url:"/api/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_handle_history",
        method:"POST"
    },
    GET_PRODUCT_CATEGORIES:{
        ajax_url:"/api/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_categories",
        method:"POST",
        contentType: "application/x-www-form-urlencoded"
    },
    GET_PRODUCTS_BY_CATEGORY:{
        ajax_url:'/api/wp-admin/admin-ajax.php',
        action:"wd_get_woo_products_by_category",
        method:"POST",
        contentType: "application/x-www-form-urlencoded"
    }
}

export function config(config){
    window.WD_API_SETTING = merge(window.WD_API_SETTING,config)
}

export function api(){
    console.info(window.WD_API_SETTING);
    return window.WD_API_SETTING
}

export default {config,api}
