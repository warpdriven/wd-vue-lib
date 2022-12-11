<template>
  <div class='optimize-page'>
    <el-tag>optimize page</el-tag>
    <el-divider content-position="left">Select Product Cate</el-divider>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="8" style="height:400px;overflow:auto;">
        <el-tree
          :data='data'
          show-checkbox
          default-expand-all
          node-key='term_id'
          ref='tree'
          highlight-current
          :props='defaultProps'
        ></el-tree>
      </el-col>
      <el-col :span='14'>
        <el-progress
          type='circle'
          :stroke-width='20'
          :width='350'
          :color='colors'
          :percentage='image_vector_plan ===0?0:(image_vector_left/image_vector_plan)*100'
          :format='InitializeFormat'
        ></el-progress>
        <br />
        <el-checkbox v-model='init'>Initialize visual search</el-checkbox>
      </el-col>
    </el-row>
    <el-divider content-position="left"></el-divider>
    <el-row>
      <el-col :span='12' style="height:300px;overflow:auto;">
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
      <el-col :span='12'>
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
    </el-row>
    <el-divider content-position="left"></el-divider>
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <el-button type="primary" @click="startBulkOptimization" :loading="loading" :disabled="disabled">Start Bulk Optimization</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <el-progress v-show="task_status==='RUNNING'" :text-inside="true" :color='colors' :stroke-width="24" :percentage="task_progress" status="success"></el-progress>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {initProducts, getVsInitStatus ,getProductCategories ,getProductsByCategory} from '../../../api/wd-common-api'
// import {products} from "../../../data/products"

export default {
  data() {
    return {
      loading:true,
      convert: false,
      remove: false,
      init: true,
      task_progress:0,
      task_status:"RUNNING",
      image_vector_left:0,
      image_vector_plan:0,
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
  computed:{
    disabled(){
      return (this.$refs['tree']&&this.$refs['tree'].getCheckedKeys().length === 0) || this.task_status === "RUNNING" || this.image_vector_left < 1
    }
  },
  mounted() {
    this.getVsInitStatus();
    this.queryCatetgoryTree()
  },
  methods: {
    InitializeFormat(percentage) {
      return `${percentage}%(${this.image_vector_left}/${this.image_vector_plan})\n Initialize visual search`
    },
    getVsInitStatus(){
      getVsInitStatus().then(res=>{
        this.task_progress = res.data.task_progress
        this.image_vector_left = res.data.image_vector_left
        this.image_vector_plan = res.data.image_vector_plan
        this.task_status=res.data.task_status
        if(res.data.task_status==="RUNNING"){
          setTimeout(this.getVsInitStatus,500)
        }else{
          this.loading = false
        }
      })
    },
    queryCatetgoryTree(){
      getProductCategories({}).then(res=>{
        this.data = this.getTreeNodes(res)
      })
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
      this.loading = true
      this.task_progress = 0
      getProductsByCategory({category:checkedKeys.join(","),per_page:100}).then(res=>{
          initProducts({products:res}).then(result=>{
          this.getVsInitStatus()
            if(!result.status){
              this.$message({
                type: 'error',
                message: result.msg||result.detail
              });   
            }
          })
      })
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
