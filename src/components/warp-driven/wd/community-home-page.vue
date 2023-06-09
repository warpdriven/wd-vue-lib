<script setup>
import linkBoard from "./link-board.vue";
</script>
<template>
  <div class="home-page">
    <el-container>
      <el-aside
        ><i class="logo-img"></i>WarpDriven Visually Similar
        Recommendations</el-aside
      ><el-main
        >Welcome to Warp Driven Technology, we contribute your eCommerce
        business with cutting-edge information technologies !</el-main
      >
    </el-container>
    <link-board></link-board>
    <optimize-page></optimize-page>
    <warp-driven-vs-register
      :erpUserEmail="erpUserEmail"
    ></warp-driven-vs-register>
  </div>
</template>

<script>
import optimizePage from "./community-optimize-page.vue";
import WarpDrivenVsRegister from "./warp-driven-vs-register.vue";

export default {
  components: { optimizePage, WarpDrivenVsRegister },
  props: {
    erpUserEmail: {
      type: String,
      default: "",
    },
    settingUrl: {
      type: String,
      default: "#",
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.home-page {
  background: #ffffff;
}

.home-page .plugin-box .el-col {
  padding: 5px 10px;
}

.home-page .plugin-box .el-col .el-result {
  border: 1px solid #d9ecff;
}

.home-page .el-container .el-aside {
  background-color: #2c3e50;
  color: #ffffff;
  line-height: 80px;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  width: 600px;
}

.home-page .el-container .el-main {
  background-color: #2c3e50;
  color: #ffffff;
  text-align: left;
}

.home-page .logo-img {
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
