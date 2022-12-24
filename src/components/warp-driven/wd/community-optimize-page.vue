<template>
  <div class='optimize-page'>
    <!-- <el-tag>optimize page</el-tag> -->
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
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <el-button type="primary" @click="startBulkOptimization" :loading="loading" :disabled="disabled">Start Bulk Optimization</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <el-progress :text-inside="true" :color='colors' :stroke-width="24" :percentage="task_progress" status="success"></el-progress>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {initProducts, getVsCreditStatus ,getProductCategories ,getProductsByCategory} from '../../../api/wd-common-api'
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
      webp_left:0,
      webp_plan:0,
      bk_rm_left:0,
      bk_rm_plan:0,
      authenticated:true,
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
    this.getVsCreditStatus();
    this.queryCatetgoryTree()
  },
  methods: {
    InitializeFormat(percentage) {
      return `${percentage}%(${this.image_vector_left}/${this.image_vector_plan})\n Initialize visual search`
    },
    loadTaskData(taskStaus){
        this.task_progress = taskStaus.task_progress
        this.image_vector_left = taskStaus.image_vector_left
        this.image_vector_plan = taskStaus.image_vector_plan
        this.webp_left = taskStaus.webp_left
        this.webp_plan = taskStaus.webp_plan
        this.bk_rm_left = taskStaus.bk_rm_left
        this.bk_rm_plan = taskStaus.bk_rm_plan
        this.task_status=taskStaus.task_status
    },
    getVsCreditStatus(){
      this.loading = true
      getVsCreditStatus().then(res=>{
        this.$emit("task-status",res)
        if(res.status){
          this.loadTaskData(res.data)
          if(res.data.task_status==="RUNNING"){
            setTimeout(this.getVsCreditStatus,1000)
          }else{
            this.task_progress = 0
            this.loading = false
          }
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
      getProductsByCategory({category:checkedKeys.join(","),per_page:100}).then(res=>{
          initProducts({products:res}).then(result=>{
            if(result.status){
              this.getVsCreditStatus()
            }else{
              this.loading = false
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
