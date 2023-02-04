<template>
  <el-form
    :model="loginForm"
    :rules="loginRules"
    ref="loginFormRef"
    status-icon
    label-width="120px"
    class="demo-ruleForm"
    size="default"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
        />
        </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin(loginFormRef)">提交</el-button>
      </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { FormInstance } from "element-plus";
import { login } from "@/network/api";

export default defineComponent({
  name: "LoginView",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginFormRef = ref<FormInstance>();

    const methods = reactive({
      validateUsername: (rule: any, value: string, callback: Function) => {
        if (value === "") {
          callback(new Error("用户名不能为空"));
        } else {
          callback();
        }
      },
      validatePassword: (rule: any, value: string, callback: Function) => {
        if (value === "") {
          callback(new Error("密码不能为空"));
        } else {
          callback();
        }
      },
      handleLogin: (form: FormInstance) => {
        if (!form) return;
        form.validate((valid) => {
          if (valid) {
            login({
              username: state.loginForm.username,
              password: state.loginForm.password,
            }).then(
              (response: any) => {
                ElNotification.success({
                  title: "登录成功",
                  message: "欢迎进入CTFz",
                });
                store.dispatch("UserInfo/updateUserInfo", response.data);
                router.replace("/");
              },
              (error: any) => {
                ElNotification.error({ title: "登录失败", message: error });
              }
            );
          } else {
            return false;
          }
        });
      },
    });

    const state = reactive({
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [{ validator: methods.validateUsername, trigger: "blur" }],
        password: [{ validator: methods.validatePassword, trigger: "blur" }],
      },
    });

    return {
      loginFormRef,
      ...toRefs(state),
      ...toRefs(methods),
    };
  },
});
</script>
<style scoped lang="scss">
.demo-ruleForm {
  width: 50%;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
}
</style>