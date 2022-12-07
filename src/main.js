import { createApp } from 'vue'
import App from './App.vue'

import {config} from '../src/api/api-setting'

config({
    GET_PRODUCT_HTML:{
        ajax_url:"/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_html",
        type:"POST"
    },
    GET_PRODUCTS_HTML_BY_VS:{
        ajax_url:"/wp-admin/admin-ajax.php",
        action:"wd_get_woo_products_html_by_vs",
        type:"POST"
    },
    GET_PRODUCT_LIST_HTML:{
        ajax_url:"/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_list_html",
        type:"POST"
    },
    GET_HANDLE_HISTORY:{
        ajax_url:"/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_handle_history"
    },
    GET_PRODUCT_CATEGORIES:{
        ajax_url:"/wp-admin/admin-ajax.php",
        action:"wd_get_woo_product_categories"
    },
    GET_PRODUCTS_BY_CATEGORY:{
        ajax_url:'/wp-admin/admin-ajax.php',
        action:"wd_get_woo_products_by_category"
    }
})

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

createApp(App).use(ElementPlus).mount('#app')

