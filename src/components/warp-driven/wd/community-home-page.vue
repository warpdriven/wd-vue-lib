<template>
  <div class="home-page">
    <el-row>
      <el-col :sm="12" :lg="8">
        <el-result :icon="authenticated?'success':'warning'" title="Create an account" subTitle="Create an account">
          <template #extra>
            <el-link href="https://www.warp-driven.com" target="_blank"><el-button type="primary" size="mini">SIGN UP,IT'S FREE!</el-button></el-link>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="8">
        <el-result :icon="authenticated&&!is_expired?'success':'warning'" :title="authenticated?(is_expired?'API Key Has Expired':'API Key Availabled'):'Enter your API Key'" :subTitle="`${plan_start_date}~${plan_end_date}`">
          <template #extra>
            <el-link :href="settingUrl"><el-button type="primary" size="mini">{{authenticated?(is_expired?'REPLACE MY API KEY':'SHOW MY API KEY'):'I HAVE MY API KEY'}}</el-button></el-link>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="8">
        <el-result icon="info"  title="Contact Us"  subTitle="Contact Us">
          <template #extra>
            <el-link href="https://www.warp-driven.com" target="_blank"><el-button type="primary" size="mini">GO TO OFFICIAL WEBSITE</el-button></el-link>
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

</style>