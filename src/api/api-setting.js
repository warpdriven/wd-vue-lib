import merge from 'deepmerge'

window.WD_API_SETTING={
    GET_PRODUCT_HTML:{
        ajax_url:"/api/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_html",
        type:"POST"
    },
    GET_PRODUCTS_HTML_BY_VS:{
        ajax_url:"/api/wp-admin/admin-ajax.php",
        action:"wd_get_woo_products_html_by_vs",
        type:"POST"
    },
    GET_PRODUCT_LIST_HTML:{
        ajax_url:"/api/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_list_html",
        type:"POST"
    },
    GET_HANDLE_HISTORY:{
        ajax_url:"/api/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_handle_history",
        type:"POST"
    },
    GET_PRODUCT_CATEGORIES:{
        ajax_url:"/api/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_categories",
        type:"POST"
    },
    GET_PRODUCTS_BY_CATEGORY:{
        ajax_url:'/api/wp-admin/admin-ajax.php',
        action:"wd_get_woo_products_by_category",
        type:"POST"
    }
}

export function config(config){
    window.WD_API_SETTING = merge(window.WD_API_SETTING,config)
    console.info(window.WD_API_SETTING)
}

export function api(){
    console.info(window.WD_API_SETTING);
    return window.WD_API_SETTING
}

export default {config,api}
