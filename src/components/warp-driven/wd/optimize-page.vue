<template>
  <div class='optimize-page'>
    <el-tag>optimize page</el-tag>
    <el-row>
      <el-col span='8'>
        <el-progress
          type='circle'
          stroke-width='10'
          width='200'
          :color='colors'
          :percentage='25'
          :format='ConvertFormat'
        ></el-progress>
        <br />
        <el-checkbox v-model='convert'>Convert to WebP</el-checkbox>
      </el-col>
      <el-col span='8'>
        <el-progress
          type='circle'
          stroke-width='10'
          width='200'
          :color='colors'
          :percentage='50'
          :format='RemoveFormat'
        ></el-progress>
        <br />
        <el-checkbox v-model='remove'>Remove pictrue background</el-checkbox>
      </el-col>
      <el-col span='8'>
        <el-progress
          type='circle'
          stroke-width='10'
          width='200'
          :color='colors'
          :percentage='80'
          :format='InitializeFormat'
        ></el-progress>
        <br />
        <el-checkbox v-model='init'>Initialize visual search</el-checkbox>
      </el-col>
    </el-row>
    <el-divider content-position="left">Select Product Cate</el-divider>
    <el-row>
      <el-col span="2">&nbsp;</el-col>
      <el-col span="20">
        <el-tree
          :data='data'
          show-checkbox
          default-expand-all
          node-key='name'
          ref='tree'
          highlight-current
          :props='defaultProps'
        ></el-tree>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="1">&nbsp;</el-col>
      <el-col span="22">
        <el-button type="primary" @click="startBulkOptimization">Start Bulk Optimization</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="1">&nbsp;</el-col>
      <el-col span="22">
        <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      convert: false,
      remove: false,
      init: true,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      data: [],
      defaultProps: {
        children: 'children',
        label: (data)=>{
          return `${data.name}(${data.count})`
        },
        isLeaf: (data)=>{
          return data.count === 0
        }
      }
    }
  },
  mounted() {
    this.queryCatetgoryTree()
  },
  methods: {
    InitializeFormat(percentage) {
      return percentage + '%\n Initialize visual search'
    },
    RemoveFormat(percentage) {
      return percentage + '%\n Remove pictrue background'
    },
    ConvertFormat(percentage) {
      return percentage + '%\n Convert to WebP'
    },
    queryCatetgoryTree(){
      const me = this
      this.loading = true
      window.api.post("GET_WOO_PRODUCT_CATEGORIES",{},function(res){
        me.loading = false
        me.data = me.getTreeNodes(res)
      });
    },
    getTreeNodes(nodes){
      let rootNodes = [];
      nodes.forEach(node=>{
        if(node.parent == 0){
          rootNodes.push(node)
          this.walkCategoryTree(nodes,node)
        }
      });
      return rootNodes
    },
    walkCategoryTree(nodes,parentNode){
      let childNodes = []
      nodes.forEach(node => {
        if(node.parent == parentNode.term_id){
          childNodes.push(node)
          this.walkCategoryTree(nodes,node)
        }  
      });
      parentNode['children'] = childNodes
    },
    startBulkOptimization(){
      const checkedKeys = this.$refs['tree'].getCheckedKeys()
      if(checkedKeys.length === 0){
        return
      }
      window.api.post("GET_WOO_PRODUCTS_BY_CATEGORY",{categories:checkedKeys},function(res){
        console.info(res);
      });
    }
  }
}
</script>

<style scoped>
.optimize-page {
  background: #ffffff;
  padding: 10px;
}

.optimize-page .el-tag {
  width: 100%;
  display: block;
}

.optimize-page .el-col {
  text-align: center;
}

.optimize-page .el-row {
  margin-top: 10px;
}

.optimize-page /deep/ .el-progress__text {
  white-space: break-spaces;
  font-size: 18px !important;
}
</style>
