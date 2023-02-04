<template>
  <div class="scene-based-box">
    <div class="scene-image-box">
      <el-image :src="src"></el-image>
    </div>
    <div
      class="product-drap-box"
      v-for="product in products"
      :key="product.id"
      :style="getStyle(product.style)"
      @mousedown="selectDragProductHandler(product)"
    >
      <div class="product-box">
        <div class="product-image" v-html="product.html"></div>
        <div class="wd_plus">
          <span class="wd_show_product">
            <i class="fa fa-search"></i>
          </span>
          <span class="wd_up_index">
            <i class="fa fa-arrow-circle-o-up"></i>
          </span>
          <span class="wd_dwon_index">
            <i class="fa fa-arrow-circle-o-down"></i>
          </span>
          <span class="wd_remove">
            <i class="fa fa-trash-o"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import "jquery-ui-dist/jquery-ui.css";

export default {
  props: {
    src: {
      type: String,
      default:
        "https://media-stg.woolworlds.com/wp-content/uploads/2022/10/13003829/complete-the-look-scene-01.jpeg"
    },
    defaultProducts: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      defaultStyle: {
        width: 200,
        height: 200,
        left: 0,
        top: 0,
        "z-index": 100
      },
      products: []
    };
  },
  components: {},
  mounted() {
    const me = this;
    this.products = [...this.defaultProducts];
    this.initProductDraggbleAndResizeable();
  },
  methods: {
    getStyle(style) {
      return {
        width: style.width + "px",
        height: style.height + "px",
        left: style.left + "px",
        top: style.top + "px",
        "z-index": 100
      };
    },
    addProduct(product) {
      product.style = { ...this.defaultStyle };
      this.products.push(product);
      this.initProductDraggbleAndResizeable();
    },
    selectDragProductHandler(product) {
      this.selectDragProduct = product;
    },
    product_resize_handler(me, e, ui) {
      me.selectDragProduct.style = {
        ...me.selectDragProduct.style,
        ...ui.size
      };
    },
    product_drag_handler(me, e, ui) {
      me.selectDragProduct.style = {
        ...me.selectDragProduct.style,
        ...ui.position
      };
    },
    initProductDraggbleAndResizeable() {
      const me = this;
      this.$nextTick(() => {
        $(".product-drap-box").each(function() {
          $(this).draggable({
            containment: "parent",
            drag: (e, ui) => {
              me.product_drag_handler(me, e, ui);
            }
          });
          $(this).resizable({
            aspectRatio: 1,
            resize: (e, ui) => {
              me.product_resize_handler(me, e, ui);
            }
          });
        });
      });
    }
  }
};
</script>

<style scoped>
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
</style>