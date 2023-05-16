<template>
  <div class="home-page">
    <el-container>
      <el-aside><i class="logo-img"></i>WarpDriven Visually Similar Recommendations</el-aside><el-main>Welcome to Warp Driven Technology, we contribute your eCommerce business with cutting-edge information technologies !</el-main>
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
    <optimize-page></optimize-page>
    <warp-driven-vs-register :erpUserEmail="erpUserEmail"></warp-driven-vs-register>
  </div>
</template>

<script>

import optimizePage from './community-optimize-page.vue';
import { User,Key,Setting } from '@element-plus/icons-vue';
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
  },
  components:{optimizePage,User,Key,Setting,WarpDrivenVsRegister},
  methods:{
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
  line-height: 80px;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  width: 600px;
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
}

</style>