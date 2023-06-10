<template>
  <div class="optimize-page">
    <el-divider content-position="left">Select Product Cate</el-divider>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col
        :span="8"
        style="height: 400px; overflow: auto"
      >
        <el-tree
          v-loading="isTreeLoading"
          :data="data"
          show-checkbox
          default-expand-all
          node-key="term_id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
          <template #default="{ node, data }">
            <div class="tree__row">
              <div>
                <span> {{ data.name }} </span>
                <span>({{ data.count }})</span>
              </div>
              <div class="row__right">
                <el-text type="success"
                  >success: {{ data.count_success }}
                </el-text>
                <el-text type="primary"
                  >pending: {{ data.count_pending }}
                </el-text>
                <el-text
                  v-if="!data.count_error"
                  type="danger"
                  >fail: {{ data.count_error }}
                </el-text>
                <el-popover
                  v-else
                  width="auto"
                  placement="top"
                  trigger="hover"
                >
                  <template #reference>
                    <el-text type="danger"
                      >fail: {{ data.count_error }}
                    </el-text>
                  </template>
                  <ol>
                    <li
                      v-for="(item, index) in data?.error_info || []"
                      :key="index"
                    >
                      <span>{{ item.err_name }}：</span>
                      <span>{{ item.err_msg }}</span>
                    </li>
                  </ol>
                </el-popover>
              </div>
            </div>
          </template>
        </el-tree>
      </el-col>
      <el-col :span="14">
        <div>
          <el-progress
            type="circle"
            :stroke-width="20"
            :width="350"
            :color="colors"
            :percentage="
              product_plan_credit === 0
                ? 0
                : (product_credit / product_plan_credit) * 100
            "
            :format="InitializeFormat"
          ></el-progress>
        </div>
        <div class="right__btn-box">
          <el-button
            @click="startBulkOptimization"
            :loading="loading"
            :disabled="disabled"
            type="primary"
            size="large"
            class="right__btn"
            round
            >start</el-button
          >
          <el-button
            @click="handleCancel"
            :loading="isCancelLoading"
            :disabled="disabled"
            type="danger"
            link
            >cancel</el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-row justify="center">
      <el-col :span="22">
        <el-progress
          :text-inside="true"
          :color="colors"
          :stroke-width="24"
          :percentage="task_progress"
          status="success"
        ></el-progress>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getVsCreditStatus,
  getProductCategories,
  getProductsByCategory,
  cancelInit,
} from "../../../api/wd-common-api";
export default {
  data() {
    return {
      loading: true,
      convert: false,
      remove: false,
      init: true,
      task_progress: 0,
      task_status: "RUNNING",
      product_credit: 0,
      product_plan_credit: 0,
      authenticated: true,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
      data: [],
      defaultProps: {
        children: "children",
        label: (data) => {
          return `${data.name}(${data.count})`;
        },
        isLeaf: (data) => {
          return data.count === 0;
        },
      },
      // Cancel loading
      isCancelLoading: false,
      isTreeLoading: false,
    };
  },
  computed: {
    disabled() {
      return (
        (this.$refs["tree"] &&
          this.$refs["tree"].getCheckedKeys().length === 0) ||
        this.task_status === "RUNNING" ||
        this.product_credit < 1
      );
    },
  },
  mounted() {
    this.getVsCreditStatus();
    this.queryCatetgoryTree();
  },
  methods: {
    towNumber(val) {
      return val.toFixed(2);
    },
    InitializeFormat(percentage) {
      const value = Number(percentage) || 0;
      const disNum = value && value.toFixed(2);
      return `${disNum}%(${this.product_credit}/${this.product_plan_credit})\n Initialize visual search`;
    },
    loadTaskData(taskStatus) {
      this.task_progress = taskStatus.task_progress;
      this.product_credit = taskStatus.product_credit;
      this.product_plan_credit = taskStatus.product_plan_credit;
      this.task_status = taskStatus.task_status;
    },
    getVsCreditStatus() {
      this.loading = true;
      getVsCreditStatus().then((res) => {
        this.$emit("task-status", res);
        if (res.status) {
          this.loadTaskData(res.data);
          if (res.data.task_status === "RUNNING") {
            setTimeout(this.getVsCreditStatus, 1000);
          } else {
            this.loading = false;
            if (res.data.task_status || res.data.task_status === "SUCCESS") {
              this.task_progress = 100;
            } else {
              this.task_progress = 0;
            }
          }
        }
      });
    },
    queryCatetgoryTree() {
      this.isTreeLoading = true;
      getProductCategories({})
        .then((res) => {
          this.data = this.getTreeNodes(res);
        })
        .finally(() => {
          this.isTreeLoading = false;
        });
    },
    getTreeNodes(nodes) {
      let rootNodes = [];
      nodes.forEach((node) => {
        if (node.parent == 0) {
          rootNodes.push(node);
          this.walkCategoryTree(nodes, node);
        }
      });
      return rootNodes;
    },
    walkCategoryTree(nodes, parentNode) {
      let childNodes = [];
      nodes.forEach((node) => {
        if (node.parent == parentNode.term_id) {
          childNodes.push(node);
          this.walkCategoryTree(nodes, node);
        }
      });
      parentNode["children"] = childNodes;
    },
    walkGetProductCountByCategroy(nodes) {
      let count = 0;
      if (nodes) {
        nodes.forEach((node) => {
          count += node.count;
        });
      }
      return count;
    },
    startBulkOptimization() {
      const checkedKeys = this.$refs["tree"].getCheckedKeys();
      const checkedNodes = this.$refs["tree"].getCheckedNodes();
      if (checkedKeys.length === 0) {
        return;
      }
      const count = this.walkGetProductCountByCategroy(checkedNodes);

      if (count > this.product_credit) {
        this.$message.error({
          message: `Select up to image vector left number ${this.product_credit} messages`,
        });
        return;
      }

      this.loading = true;
      getProductsByCategory({
        category: checkedKeys.join(","),
        per_page: 100,
      }).then((res) => {
        this.loading = false;
        this.queryCatetgoryTree();
      });
      setTimeout(this.getVsCreditStatus, 1000);
    },
    // Cancel btn click handle
    async handleCancel() {
      const checkedKeys = this.$refs["tree"].getCheckedKeys();
      const checkedNodes = this.$refs["tree"].getCheckedNodes();
      if (checkedKeys.length === 0) {
        return;
      }
      const count = this.walkGetProductCountByCategroy(checkedNodes);

      if (count > this.product_credit) {
        this.$message.error({
          message: `Select up to image vector left number ${this.product_credit} messages`,
        });
        return;
      }
      this.isCancelLoading = true;
      try {
        const data = await cancelInit({
          category: checkedKeys.join(","),
          per_page: 100,
        });
        if (typeof data?.msg === "string") {
          this.$message.success({ message: data.msg });
        }
        setTimeout(() => this.getVsCreditStatus(), 1000);
        this.queryCatetgoryTree();
      } catch {
        this.$message.error({ message: `System error` });
      } finally {
        this.isCancelLoading = false;
      }
    },
  },
};
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

.right__btn-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding-top: 1rem;
}
.right__btn {
  width: 15rem;
}
.tree__row {
  flex: 1;
  overflow: hidden;

  display: flex;
  justify-content: space-between;
}
.row__right {
  display: flex;
  gap: 0.5rem;
}
</style>
