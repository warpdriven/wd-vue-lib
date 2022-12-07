<template>
  <div class="home-page">
    <el-row>
      <el-col :sm="12" :lg="8">
        <el-result icon="warning" subTitle="Create an account">
          <template #extra>
            <el-link href="https://www.warp-driven.com" target="_blank"><el-button type="primary" size="mini">SIGN UP,IT'S FREE!</el-button></el-link>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="8">
        <el-result icon="success" subTitle="Enter your API Key">
          <template #extra>
            <el-link :href="settingUrl"><el-button type="primary" size="mini">I HAVE MY API KEY</el-button></el-link>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="8">
        <el-result icon="info"   subTitle="Contact Us">
          <template #extra>
            <el-link href="https://www.warp-driven.com" target="_blank"><el-button type="primary" size="mini">GO TO OFFICIAL WEBSITE</el-button></el-link>
          </template>
        </el-result>
      </el-col>
    </el-row>
    <optimize-page></optimize-page>
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
  components:{optimizePage}
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