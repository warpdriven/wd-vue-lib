<template>
  <div class="driven-gpt-register">
    <el-dialog class="user-dialog" align-center title="Sign Up" v-model="dialogVisible" width="50%">
      <el-form
        ref="formDataRef"
        :model="formData"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-formData"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="formData.email" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="formData.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input v-model="formData.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" :loading="submitLoading">Signup</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      class="user-dialog"
      align-center
      title="Create Webside"
      v-model="loginDialogVisible"
      width="50%"
    >
      <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules" label-width="120px">
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createMyWebsite()" :loading="myWebsiteLoading">create</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
<script>
import {
  getUserExsited,
  createUser,
  createMyWebsite
} from "../../../api/wd-common-api";

export default {
  props: {
    erpUserEmail: {
      type: String,
      default: ""
    }
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.formData.checkPass !== "") {
          this.$refs.formDataRef.validateField("checkPass");
        }
        callback();
      }
    };

    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.formData.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };

    return {
      dialogVisible: false,
      loginDialogVisible: false,
      submitLoading: false,
      myWebsiteLoading:false,
      formData: {
        email: this.erpUserEmail,
        password: "",
        checkPass: ""
      },
      loginForm: {
        password: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.checkUserRegiter();
    });
  },
  methods: {
    checkUserRegiter() {
      getUserExsited({}).then(res => {
        if (res.status) {
          if (!res.data) {
            if (res.flag === 1) {
              this.loginDialogVisible = true;
            } else {
              this.dialogVisible = true;
            }
          }
        }
      });
    },
    createUser() {
      this.submitLoading = true;
      createUser({ ...this.formData })
        .then(res => {
          this.submitLoading = false;
        })
        .catch(() => {
          this.submitLoading = false;
        });
    },
    createMyWebsite() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.myWebsiteLoading = true;
          createMyWebsite({ ...this.loginForm })
            .then(res => {
              this.myWebsiteLoading = false;
              this.loginDialogVisible = false;
            })
            .catch(() => {
              this.myWebsiteLoading = false;
            });
        }
      });
    },
    submitForm() {
      this.$refs["formDataRef"].validate(valid => {
        if (valid) {
          this.createUser();
        }
      });
    }
  }
};
</script>
  
  <style scoped>
.driven-gpt-register {
  width: 100%;
  position: relative;
}
</style>