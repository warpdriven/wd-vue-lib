<template>
  <div class="home-page">
    <el-container>
      <el-aside><i class="logo-img"></i>Warp Driven</el-aside><el-main>Welcome to Warp Driven Technology, we contribute your eCommerce business with cutting-edge information technologies !</el-main>
    </el-container>
    <el-row>
      <el-col :sm="12" :lg="8">
        <el-result title="Set Password" subTitle="If you need to visit our website for multi-platform support, please first set a password through the button below">
          <template #icon>
            <Key></Key>
          </template>
          <template #extra>
            <el-link href="https://warp-driven.com/my-account/" target="_blank"><el-button type="primary" size="mini">Set Password</el-button></el-link>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="8">
        <el-result  title="Check your account"  subTitle="Check your Warp Driven account and find more products. Boost your business now!">
          <template #icon>
            <User></User>
          </template>
          <template #extra>
            <el-link href="https://erp.warp-driven.com/website_info" target="_blank"><el-button type="primary" size="mini">Check Account</el-button></el-link>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="8">
        <el-result :title="'Configure your shop setting'" subTitle="Change your shop info, API Key or add more shops under your same plan.">
          <template #icon>
            <Setting></Setting>
          </template>
          <template #extra>
            <el-link href="https://erp.warp-driven.com/website_info" target="_blank"><el-button type="primary" size="mini">Shop Setting</el-button></el-link>
          </template>
        </el-result>
      </el-col>
    </el-row>
    <optimize-page v-show="authenticated&&!is_expired" @task-status="loadTaskStatus"></optimize-page>
    <el-divider content-position="left">Recommend Plugins</el-divider>
    <div class="plugin-box">
      <el-row>
        <el-col :sm="12" :lg="8">
          <el-result subTitle="Initialize visual search">
            <template #icon>

            </template>
            <template #extra>
              <el-button type="primary" size="mini">link</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="8">
          <el-result subTitle="Remove pictrue background">
            <template #icon>
              
            </template>
            <template #extra>
              <el-button type="primary" size="mini">link</el-button>
            </template>
          </el-result>
        </el-col>
        <el-col :sm="12" :lg="8">
          <el-result subTitle="Conversion to webp">
            <template #icon>
            </template>
            <template #extra>
              <el-button type="primary" size="mini">link</el-button>
            </template>
          </el-result>
        </el-col>
      </el-row>
    </div>
    <warp-driven-vs-register :erpUserEmail="erpUserEmail"></warp-driven-vs-register>
  </div>
</template>

<script>

import optimizePage from './optimize-page.vue';
import WarpDrivenVsRegister from './warp-driven-vs-register.vue';

export default {
  props:{
    erpUserEmail: {
      type: String,
      default: "",
    },
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
  components:{ optimizePage, WarpDrivenVsRegister },
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

</style>