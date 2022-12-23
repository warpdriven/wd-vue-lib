<template>
  <div class="setting-page" >
    <el-container>
      <el-aside>
        <el-container class="logo-box">
          <el-aside class="setting-icon">
            <el-icon :size="40">
              <Setting></Setting>
            </el-icon>
          </el-aside>
          <el-main style="padding:10px 0px">
            <el-row>
              <i class="logo-img"></i>Warp Driven
            </el-row>
            <el-row class="setting">
              Setting
            </el-row>
          </el-main>
        </el-container>
      </el-aside>
      <el-main><el-link :icon="'Help'" type="primary" target="_blank" href="https://warp-driven.com/contact/">&nbsp;Need help or have question?</el-link></el-main>
    </el-container>
    <el-form :action="action" :method="method" :model="form" class="setting-form">
      <slot name="header"></slot>
      <el-form-item label="API Key">
        <el-input v-model="form.wd_api_key" name="wd_api_key"></el-input>
      </el-form-item>
      <el-form-item label="Search Product List Title">
        <el-input v-model="form.wd_search_product_list_title" name="wd_search_product_list_title"></el-input>
      </el-form-item>
      <el-form-item label="Icon Size">
        <el-input v-model="form.wd_search_product_icon_size" name="wd_search_product_list_title"></el-input>
      </el-form-item>
      <el-form-item label="Icon Top">
        <el-input v-model="form.wd_search_product_icon_top" name="wd_search_product_icon_top"></el-input>
      </el-form-item>
      <el-form-item label="Icon Left">
        <el-input v-model="form.wd_search_product_icon_left" name="wd_search_product_icon_left"></el-input>
      </el-form-item>
      <el-form-item label="Icon Right">
        <el-input v-model="form.wd_search_product_icon_right" name="wd_search_product_icon_right"></el-input>
      </el-form-item>
      <el-form-item label="Icon Bottom">
        <el-input v-model="form.wd_search_product_icon_bottom" name="wd_search_product_icon_bottom"></el-input>
      </el-form-item>
      <slot name="footer"></slot>
    </el-form>
  </div>
</template>

<script>
import { Setting } from '@element-plus/icons-vue';


export default {
    props: {
        action:{
          type:String,
          default:"#"
        },
        method:{
          typeof:String,
          default:"post"
        },
        data: {
            type: Object,
            default: ()=>{
              return {
                wd_search_product_list_title:'Visual Search',
                wd_search_product_icon_size:'30px',
                wd_search_product_icon_top:'',
                wd_search_product_icon_left:'',
                wd_search_product_icon_right:'0px',
                wd_search_product_icon_bottom:'0px'
              }
            }
        }
    },
    data() {
        return {
          form:{
            wd_search_product_list_title:this.wd_search_product_list_title||'',
            wd_search_product_icon_size:this.wd_search_product_icon_size||'',
            wd_search_product_icon_top:this.wd_search_product_icon_top||'',
            wd_search_product_icon_left:this.wd_search_product_icon_left||'',
            wd_search_product_icon_right:this.wd_search_product_icon_right||'',
            wd_search_product_icon_bottom:this.wd_search_product_icon_bottom||'',
          }
        };
    },
    mounted() {
    },
    components: { Setting }
}
</script>

<style scoped>

.setting-page .el-container .el-aside{
  background-color:#2c3e50;
  color: #ffffff;
  font-weight: bold;
  text-align: left;
  width: 220px;
}

.setting-page .el-container .el-main{
  background-color:#2c3e50;
  color: #ffffff;
  text-align: right;
}

.setting-page .logo-box .el-row{
  line-height: 20px;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
}

.setting-page .logo-box .el-row .logo-img{
  width: 20px;
  float: left;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  display: block;
  -webkit-font-smoothing: antialiased;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px auto;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNjAwLjAwMDAwMHB0IiBoZWlnaHQ9IjYwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDYwMC4wMDAwMDAgNjAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNjAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iI2ZmZiIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTE0OTUgNDg0MCBsLTI4MCAtMjgwIDEwNTAgMCBjNjUzIDAgMTA5MyAtNCAxMTY1IC0xMSA2MTkgLTU2IDEwNzcKLTM0NSAxMjk5IC04MTkgMTg5IC00MDUgMTkyIC05NTMgNiAtMTM0MiAtMTggLTM4IC0zMCAtNjggLTI3IC02OCAzIDAgNDkgMzAKMTA0IDY2IDMxMSAyMDcgNTE2IDUxNyA1OTkgOTA0IDIwIDkxIDIzIDEzNSAyMyAzMjUgMSAyNDIgLTkgMzE1IC02NSA1MDAKLTE0NiA0NzYgLTUxNiA4MTQgLTEwMzggOTQ2IC0yMzAgNTkgLTIzOSA1OSAtMTQ0OSA1OSBsLTExMDcgMCAtMjgwIC0yODB6Ii8+CjxwYXRoIGQ9Ik04NDAgNDE4NSBsLTI4NSAtMjg1IDEwNzggMCBjNjc0IDAgMTExNCAtNCAxMTc1IC0xMCA3NjUgLTgyIDEyNjMKLTUxOCAxMzg4IC0xMjE1IDIwIC0xMTEgMjUgLTQyOCA4IC01MDAgbC0xMCAtNDAgLTc0IC0xNCBjLTYxIC0xMSAtMjkyIC0xNQotMTIwNSAtMTggbC0xMTMxIC00IC0yODQgLTI4NCAtMjg1IC0yODUgMTA0MCAwIGM2MDMgMCAxMDg4IDQgMTE1NSAxMCAzMjUgMjgKNTk0IDExOCA4MzQgMjc3IDEyOCA4NSAyMTggMTc0IDI5NSAyOTIgMTg0IDI4MCAyNjQgNjA2IDI0MCA5NzMgLTI1IDM5MCAtMTYzCjcwNCAtNDE5IDk1MiAtMjU2IDI0OSAtNTk1IDM5MCAtMTAyNSA0MjYgLTcxIDYgLTU0OSAxMCAtMTE2NSAxMCBsLTEwNDUgMAotMjg1IC0yODV6Ii8+CjxwYXRoIGQ9Ik0zOTQ1IDE2MDkgYy0xNjkgLTgxIC0zOTggLTEzOSAtNjIwIC0xNTggLTczIC03IC01MjYgLTExIC0xMTYwIC0xMQpsLTEwNDAgMCAtMjgwIC0yODAgLTI4MCAtMjgwIDEwOTIgMCBjMTE5NiAwIDEyMDcgMCAxNDM2IDU5IDM5MiAxMDIgNzEzIDMzMQo5MDcgNjQ5IDE4IDI5IDMxIDU0IDI5IDU2IC0yIDIgLTQwIC0xNCAtODQgLTM1eiIvPgo8L2c+Cjwvc3ZnPgo=") !important;
}

.setting-page .logo-box .setting-icon{
  text-align: center;
  width: 60px;
  height: 100%;
}

.setting-page .logo-box .setting-icon i{
  height: 100%;
  padding: 10px;
  color: cornflowerblue;
}

.setting-page .logo-box .setting-icon .setting{
  color: cornflowerblue;
}

.setting-page .setting-form{
  width: 600px;
  margin: 20px;
}

</style>