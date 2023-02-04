<template>
  <div class="scene-based-page">
    <el-row>
      <el-button type="primary" @click="addSceneProducts">Add Scene Products</el-button>
      <el-button type="primary">Save Scene Products</el-button>
      <el-divider></el-divider>
    </el-row>
    <scene-based-drag-product ref="drag_product"></scene-based-drag-product>
    <el-dialog
      class="selecet-product-dialog"
      align-center
      :lock-scroll="false"
      title="Tips"
      v-model="dialogVisible"
      width="90%"
    >
      <el-container>
        <el-aside style="height:800px">
          <el-tree
          :data='treeData'
          default-expand-all
          node-key='slug'
          ref='tree'
          highlight-current
          :props='defaultProps'
          @node-click="clickCategoryHandler"
        ></el-tree>
        </el-aside>
        <el-main>
          <el-container style="height:800px" v-loading="loading">
            <el-header>
              <el-form :inline="true" :model="queryParams">
                <el-form-item label="title">
                  <el-input v-model="queryParams.name" placeholder="title" />
                </el-form-item>
                <el-form-item label="sku">
                  <el-input v-model="queryParams.sku" placeholder="sku" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="toQueryProducts">search</el-button>
                  <el-button type="primary" @click="clearQueryProducts">clear</el-button>
                </el-form-item>
              </el-form>
            </el-header>
            <el-main>
              <el-row>
                <el-col
                  v-for="product in selectProducts"
                  :key="product.product_id"
                  :span="3"
                  style="padding:5px"
                >
                  <el-card class="product-image-card" @click="selectProductHandler(product)" :class="product.product_id==selectProduct.product_id?'is-selected':''">
                    <span>{{ product.product_sku }}</span>
                    <div class="product-image" v-html="product.product_image_html"></div>
                    <span>{{ product.product_title }}</span>
                  </el-card>
                  <div></div>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmHandler">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import { wdQueryProductPage,getProductCategories } from "../../../api/wd-common-api";
import sceneBasedDragProduct from './scene-based-drag-product.vue';

export default {
  components:{sceneBasedDragProduct},
  data() {
    return {
      dialogVisible: true,
      queryParams: {
        limit: 80,
        page: 1,
        name: "",
        sku: "",
        product_slug: ""
      },
      defaultProps: {
        children: 'children',
        label: (data)=>{
          return `${data.name}(${data.count})`
        },
        isLeaf: (data)=>{
          return data.count === 0
        }
      },
      treeData: [],
      loading: false,
      selectProducts: [],
      selectProduct:{}
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.queryCatetgoryTree()
    });
  },
  methods: {
    load() {
      this.queryParams.page = this.queryParams.page + 1;
      this.queryProducts();
    },
    clearQueryProducts() {
      this.queryParams.sku = "";
      this.queryParams.name = "";
      this.queryParams.product_slug = "";
      this.toQueryProducts();
    },
    toQueryProducts() {
      this.queryParams.page = 1;
      this.selectProducts = [];
      this.queryProducts();
    },
    queryCatetgoryTree(){
      getProductCategories({}).then(res=>{
        this.treeData = this.getTreeNodes(res)
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
    queryProducts() {
      this.loading = true;
      wdQueryProductPage(this.queryParams).then(res => {
        this.loading = false;
        this.selectProducts = res.data;
      });
    },
    addSceneProducts() {
      this.dialogVisible = true;
      if (this.selectProducts.length === 0) {
        this.queryProducts();
      }
    },
    
    clickCategoryHandler(treeNodes,treeNode){
      this.queryParams.product_slug = treeNode.data.slug;
      this.queryProducts()
    },
    selectProductHandler(product){
      this.selectProduct = product;
    },
    confirmHandler(){
      this.$refs["drag_product"].addProduct(
        {
          product_id:this.selectProduct.product_id,
          html:this.selectProduct.product_image_html
        }
      );
      this.dialogVisible = false
    }
  }
};
</script>

<style scoped>
.scene-based-page {
  width: 100%;
  position: relative;
}

.scene-based-box {
  width: 100%;
  position: relative;
}

.scene-based-box .scene-image-box {
  width: 100%;
}

.scene-based-box .scene-image-box .el-image {
  width: 100%;
}

.scene-based-box .product-drap-box {
  position: absolute !important;
  display: block;
  cursor: move;
}

.scene-based-box .product-drap-box .ui-resizable-handle {
  display: none !important;
}

.scene-based-box .product-drap-box:hover {
  box-shadow: 0px 0px 5px 5px #ffffff;
}

.scene-based-box .product-drap-box:hover .ui-resizable-handle {
  display: block !important;
}

.scene-based-box .product-drap-box.wd_active {
  box-shadow: 0px 0px 5px 5px #ffffff;
}

.scene-based-box .product-drap-box .product-box {
  position: absolute;
  width: 100%;
  height: 100%;
}

.scene-based-box .product-drap-box .product-box .product-image {
  width: 100%;
  height: 100%;
}

.scene-based-box .product-drap-box .product-box .product-image >>> img {
  width: 100% !important;
  height: auto !important;
}

.scene-based-box .product-drap-box .product-box .wd_plus {
  display: none;
  position: absolute;
  width: 100%;
  text-align: center;
  z-index: 1;
  bottom: 0px;
  opacity: 0.5;
  background-color: #000000;
}

.scene-based-box .product-drap-box:hover .product-box .wd_plus {
  display: block;
}

.scene-based-box .product-drap-box .product-box .wd_plus span {
  text-align: center;
  line-height: 30px;
  display: inline-block;
  font-size: 22px;
  width: 30px;
  height: 30px;
  color: white;
  cursor: pointer;
  margin: 2px;
}

.scene-based-box .product-drap-box .product-box .wd_plus span:hover {
  font-weight: bold;
}

.product-image-card {
  height: 100%;
}

.product-image-card >>> .product-image img {
  width: 100% !important;
  height: auto !important;
}

.selecet-product-dialog .product-image-card:hover {
  border-color: var(--el-color-primary);
}

.selecet-product-dialog .product-image-card.is-selected {
  border-color: var(--el-color-primary);
}


.scene-based-page{
  text-align: left;
}

.scene-based-page >>> .selecet-product-dialog .el-dialog__body {
  overflow: hidden;
}


</style>