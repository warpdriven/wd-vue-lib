<template>
  <div :id="id" class="wd-visual-search" >
    <a class='wd-left-control' @click="contrLeftBtnClickHandler">&lt;</a>
      <div class='wd-visual-search-list' v-html="html"></div>
    <a class='wd-right-control' @click="contrRightBtnClickHandler">&gt;</a>
  </div>
</template>

<script>

import $ from 'jquery'
import {getProductsHtmlByVs} from '../../../api/wd-common-api'

export default {
  props:{
    product_id:{
      type: Number,
      default:0
    }, 
    products_class:{
      type: String,
      default:'products'
    },
    product_class:{
      type: String,
      default:'product'
    }
  },
  data(){
    return {
      html:"",
      id: "wd_vs"+new Date().getMilliseconds()
    }
  },
  mounted(){
    this.getProductsHtmlByVs()
    this.$nextTick(()=>{
      this.initEvent()
    });
  },  
  methods:{
    getProductsHtmlByVs(){
      getProductsHtmlByVs({product_id:this.product_id}).then(res=>{
        this.html = res.html
      })
    },
    contrBtnClickHandler($btn,type){
      let products_class = this.products_class
      let product_class = this.product_class
      $btn.click(function(){
          let $wrap = $(this).parent(".wd-visual-search");
          let index = $wrap.data("index")||0;
          let $ul = $wrap.find("."+products_class);
          let $lis = $ul.find("."+product_class);
          let liWidth = $lis.eq(index).outerWidth(true);
          if($lis.length>0){
              let liSize = $lis.length;
              let ulWidth = liWidth * liSize;
              let left = Number.parseInt($ul.css("left"));
              let wrapWidth = $wrap.width();
              if( "+" == type){
                  index = index-1
              }else{
                  index = index+1;
              }
              $wrap.data("index",index);            
              if((left < 0 && "+" == type)||(left > -(ulWidth - wrapWidth) && "-" == type)){
                  $btn.attr("disabled",true);
                  $ul.animate({"left":type+"="+liWidth+"px"},function(){
                      $btn.attr("disabled",false);
              });
              }
          }
      });
    },
    initEvent(){
        this.contrBtnClickHandler($(`#${this.id}`).find(".wd-left-control"),"+");
        this.contrBtnClickHandler($(`#${this.id}`).find(".wd-right-control"),"-");
    }
  }
}
</script>

<style scoped>

@media (min-width: 992px){
  .wd-visual-search{
      width: 100%;
      display: flex;
      position: relative;
  }

  .wd-visual-search .wd-visual-search-list{
      width: 100%;
      min-height: 300px;
      white-space: nowrap;
      overflow-x: hidden;
  }

  .wd-visual-search .wd-left-control,.wd-visual-search .wd-right-control {
      display: block;
      position: absolute;
      background-color: white;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
      border-radius: 100%;
      width: 40px;
      height: 40px;
      line-height: 36px;
      text-align: center;
      font-size: 18pt;
      top: 40%;
      opacity: 0.75;
      z-index: 2;
  }

  .wd-visual-search .wd-left-control:hover, .wd-visual-search .wd-right-control:hover, .wd-visual-search-item-box:hover {
      cursor: pointer;
  }

  .wd-visual-search .wd-left-control {
      left: 0;
  }

  .wd-visual-search .wd-right-control {
      right: 0;
  }

  .wd-visual-search /deep/ ul{
    position: relative;
    display: inline-block;
    width: 100%;
    vertical-align: middle;
    list-style: none;
    margin: 0 -10px;
    clear: both;
  }
  .wd-visual-search /deep/ ul li{
    width: 25%;
    clear: both;
    display: inline-block;
    float: none!important;
    margin: 0!important;
    white-space: normal;
  }
}

</style>