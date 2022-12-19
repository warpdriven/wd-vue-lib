<template>
  <visual-search :product_id="2276"></visual-search>
</template>

<script>

//import homePage from './components/warp-driven/wd/home-page.vue'
//import communityHomePage from './components/warp-driven/wd/community-home-page.vue'
import visualSearch from './components/warp-driven/wd/VisualSearch.vue'

export default {
  name: 'App',
  components: {
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
  color: #2c3e50;
  margin-top: 60px;
}

</style>
