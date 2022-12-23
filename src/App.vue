<template>
  <!-- <visual-search :product_id="2276"></visual-search> -->
  <!-- <communityHomePage></communityHomePage> -->
  <el-tabs type="card">
    <el-tab-pane label="homePage">
      <homePage></homePage>
    </el-tab-pane>
    <el-tab-pane label="communityHomePage">
      <communityHomePage></communityHomePage>
    </el-tab-pane>
    <el-tab-pane label="communitySetting">
      <communitySetting></communitySetting>
    </el-tab-pane>
    <el-tab-pane label="visualSearch">
      <visualSearch></visualSearch>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

import homePage from './components/warp-driven/wd/home-page.vue'
import communityHomePage from './components/warp-driven/wd/community-home-page.vue'
import visualSearch from './components/warp-driven/wd/visual-search-page.vue'
import communitySetting from './components/warp-driven/wd/community-setting-page.vue';

export default {
  name: 'App',
  components: {
    homePage,
    communityHomePage,
    communitySetting,
    visualSearch
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50
}

</style>
