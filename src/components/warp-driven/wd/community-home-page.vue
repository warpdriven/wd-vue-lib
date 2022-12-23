<template>
  <div class="home-page">
    <el-container>
      <el-aside><i class="logo-img"></i>Warp Driven</el-aside><el-main>Welcome to Warp Driven Technology, we contribute your eCommerce business with cutting-edge information technologies !</el-main>
    </el-container>
    <el-row>
      <el-col :sm="12" :lg="8">
        <el-result :icon="authenticated?'success':'warning'" title="Create an account" subTitle="Don’t have a Warp Driven account yet? Boost your business by creating an account with a few clicks!">
          <template #icon>
            <User></User>
          </template>
          <template #extra>
            <el-link href="https://erp.warp-driven.com/website_info" target="_blank"><el-button type="primary" size="mini">SIGN UP,IT'S FREE!</el-button></el-link>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="8">
        <el-result icon="info"  title="Configure your website"  subTitle="Input your website info and get an API Key.">
          <template #icon>
            <Key></Key>
          </template>
          <template #extra>
            <el-link href="https://erp.warp-driven.com/website_info" target="_blank"><el-button type="primary" size="mini">GO TO SETTING</el-button></el-link>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="8">
        <el-result :icon="authenticated&&!is_expired?'success':'warning'" :title="authenticated?(is_expired?'API Key Has Expired':'API Key Availabled'):'Enter your API Key'" :subTitle="`${(plan_start_date?plan_start_date+'~':'')+(plan_end_date?plan_end_date:'Copy & Save your API key here on your website info page')}`">
          <template #icon>
            <Setting></Setting>
          </template>
          <template #extra>
            <el-link :href="settingUrl"><el-button type="primary" size="mini">{{authenticated?(is_expired?'REPLACE MY API KEY':'SHOW MY API KEY'):'I COPIED MY API KEY'}}</el-button></el-link>
          </template>
        </el-result>
      </el-col>
    </el-row>
    <optimize-page v-show="authenticated&&!is_expired" @task-status="loadTaskStatus"></optimize-page>
  </div>
</template>

<script>

import optimizePage from './community-optimize-page.vue';

export default {
  props:{
    settingUrl:{
      type: String,
      default:'#'
    }
  },
  data(){
    return {
      authenticated:false,
      is_expired:true,
      plan_end_date:null,
      plan_start_date:null
    }
  },
  components:{optimizePage},
  methods:{
    loadTaskStatus(result){
      if(result.code === 403){
        this.authenticated = false
      }else{
        this.authenticated = true
        if(result.status){
          this.is_expired = false
          this.plan_start_date = result.data.plan_start_date
          this.plan_end_date = result.data.plan_end_date
        }
      }
    }
  }
}
</script>

<style scoped>
.home-page{
  background: #ffffff;
}

.home-page .plugin-box .el-col{
  padding: 5px 10px;
}

.home-page .plugin-box .el-col .el-result{
  border: 1px solid #d9ecff;
}

.home-page .el-container .el-aside{
  background-color:#2c3e50;
  color: #ffffff;
  line-height: 62px;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  width: 220px;
}

.home-page .el-container .el-main{
  background-color:#2c3e50;
  color: #ffffff;
  text-align: left;
}

.home-page .logo-img{
  width: 60px;
  height: 100%;
  float: left;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  display: block;
  -webkit-font-smoothing: antialiased;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40px auto;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNjAwLjAwMDAwMHB0IiBoZWlnaHQ9IjYwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDYwMC4wMDAwMDAgNjAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNjAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iI2ZmZiIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTE0OTUgNDg0MCBsLTI4MCAtMjgwIDEwNTAgMCBjNjUzIDAgMTA5MyAtNCAxMTY1IC0xMSA2MTkgLTU2IDEwNzcKLTM0NSAxMjk5IC04MTkgMTg5IC00MDUgMTkyIC05NTMgNiAtMTM0MiAtMTggLTM4IC0zMCAtNjggLTI3IC02OCAzIDAgNDkgMzAKMTA0IDY2IDMxMSAyMDcgNTE2IDUxNyA1OTkgOTA0IDIwIDkxIDIzIDEzNSAyMyAzMjUgMSAyNDIgLTkgMzE1IC02NSA1MDAKLTE0NiA0NzYgLTUxNiA4MTQgLTEwMzggOTQ2IC0yMzAgNTkgLTIzOSA1OSAtMTQ0OSA1OSBsLTExMDcgMCAtMjgwIC0yODB6Ii8+CjxwYXRoIGQ9Ik04NDAgNDE4NSBsLTI4NSAtMjg1IDEwNzggMCBjNjc0IDAgMTExNCAtNCAxMTc1IC0xMCA3NjUgLTgyIDEyNjMKLTUxOCAxMzg4IC0xMjE1IDIwIC0xMTEgMjUgLTQyOCA4IC01MDAgbC0xMCAtNDAgLTc0IC0xNCBjLTYxIC0xMSAtMjkyIC0xNQotMTIwNSAtMTggbC0xMTMxIC00IC0yODQgLTI4NCAtMjg1IC0yODUgMTA0MCAwIGM2MDMgMCAxMDg4IDQgMTE1NSAxMCAzMjUgMjgKNTk0IDExOCA4MzQgMjc3IDEyOCA4NSAyMTggMTc0IDI5NSAyOTIgMTg0IDI4MCAyNjQgNjA2IDI0MCA5NzMgLTI1IDM5MCAtMTYzCjcwNCAtNDE5IDk1MiAtMjU2IDI0OSAtNTk1IDM5MCAtMTAyNSA0MjYgLTcxIDYgLTU0OSAxMCAtMTE2NSAxMCBsLTEwNDUgMAotMjg1IC0yODV6Ii8+CjxwYXRoIGQ9Ik0zOTQ1IDE2MDkgYy0xNjkgLTgxIC0zOTggLTEzOSAtNjIwIC0xNTggLTczIC03IC01MjYgLTExIC0xMTYwIC0xMQpsLTEwNDAgMCAtMjgwIC0yODAgLTI4MCAtMjgwIDEwOTIgMCBjMTE5NiAwIDEyMDcgMCAxNDM2IDU5IDM5MiAxMDIgNzEzIDMzMQo5MDcgNjQ5IDE4IDI5IDMxIDU0IDI5IDU2IC0yIDIgLTQwIC0xNCAtODQgLTM1eiIvPgo8L2c+Cjwvc3ZnPgo=") !important;
}


</style>