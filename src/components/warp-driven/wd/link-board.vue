<script setup>
import { computed, reactive, watchPostEffect } from "vue";
import { getErpWebsite } from "../../../api/wd-common-api";
import { ElMessage } from "element-plus";
import { User, Key, Setting } from "@element-plus/icons-vue";

const state = reactive({ erpUrl: "" });

const linkSetPwd = computed(() => `${state.erpUrl}/my-account/`);
const linkChkAccont = computed(() => `${state.erpUrl}/website_info/`);
const linkShopSeting = computed(() => `${state.erpUrl}/website_info`);

watchPostEffect(async () => {
  try {
    const data = await getErpWebsite();
    const { url } = data;
    state.erpUrl = url;
  } catch {
    ElMessage.error("System error");
  }
});
</script>

<template>
  <el-row v-if="state.erpUrl">
    <el-col
      :sm="12"
      :lg="8"
    >
      <el-result
        title="Set Password"
        subTitle="If you need to visit our website for multi-platform support, please first set a password through the button below"
      >
        <template #icon>
          <Key></Key>
        </template>
        <template #extra>
          <el-link
            :href="linkSetPwd"
            target="_blank"
          >
            <el-button type="primary">Set Password</el-button>
          </el-link>
        </template>
      </el-result>
    </el-col>
    <el-col
      :sm="12"
      :lg="8"
    >
      <el-result
        title="Check your account"
        subTitle="Check your Warp Driven account and find more products. Boost your business now!"
      >
        <template #icon>
          <User></User>
        </template>
        <template #extra>
          <el-link
            :href="linkChkAccont"
            target="_blank"
          >
            <el-button type="primary">Check Account</el-button>
          </el-link>
        </template>
      </el-result>
    </el-col>
    <el-col
      :sm="12"
      :lg="8"
    >
      <el-result
        :title="'Configure your shop setting'"
        subTitle="Change your shop info, API Key or add more shops under your same plan."
      >
        <template #icon>
          <Setting></Setting>
        </template>
        <template #extra>
          <el-link
            :href="linkShopSeting"
            target="_blank"
            ><el-button type="primary">Shop Setting</el-button></el-link
          >
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>

<style scoped></style>
