<template>
  <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" :ellipsis="false" router>
    <el-menu-item index="1" route="/index">首页</el-menu-item>
    <el-menu-item index="2" route="/challenges">题目</el-menu-item>
    <el-menu-item index="3" route="/rank">天梯</el-menu-item>
    <el-menu-item index="4" route="/team">战队</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="5" v-if="!isLogin" route="/login">登录</el-menu-item>
    <el-sub-menu index="6" v-if="isLogin">
      <template #title>{{ store.state.UserInfo.username }}</template>
      <el-menu-item index="6-1">个人资料</el-menu-item>
      <el-menu-item index="6-2">修改资料</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="7" v-if="!isLogin" route="/register">注册</el-menu-item>
    <el-menu-item index="8" v-if="isLogin" @click="logout">注销</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Header",
  props: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const activeIndex = ref("0");

    const methods = reactive({
      logout: () => {
        ElNotification.success({ title: "注销成功" });
        store.dispatch("UserInfo/emptyUserInfo");
        router.replace("/");
      },
    });
    let isLogin = computed(() => {
      return store.getters["UserInfo/isLogin"];
    });

    return {
      activeIndex,
      isLogin,
      store,
      ...toRefs(methods),
    };
  },
});
</script>

<style scoped lang="scss">
.el-menu {
  height: 100%;

  .flex-grow {
    flex-grow: 1;
  }

  .el-menu-item {
    font-size: var(--el-font-size-medium);
  }
}
</style>
