<template>
  <el-container>
    <el-header height="45px" class="nav-header">
      <Header></Header>
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { getTagList } from "@/network/api";
import { TYPES } from "@/types";
import Header from "components/Header.vue";

export default defineComponent({
  name: "HomeView",
  components: { Header },
  setup() {
    const store = useStore();
    const methods = reactive({
      prepare: () => {
        // 页面加载时读取sessionStorage的状态信息
        if (sessionStorage.getItem("store")) {
          const oldStore = sessionStorage.getItem("store");
          store.replaceState(
            Object.assign(
              {},
              store.state,
              JSON.parse(oldStore == null ? "" : oldStore)
            )
          );
        }
        // 在页面刷新时将store保存到sessionStorage中
        window.addEventListener("beforeunload", () => {
          const state = JSON.stringify(store.state);
          sessionStorage.setItem("store", state == null ? "" : state);
        });
      },
      loadAll: () => {
        getTagList().then((response: any) => {
          // 从后端获取tag列表
          store.commit(`ChallengeInfo/${TYPES.UPDATE_TAG_LIST}`, response.data);
        });
      }
    })
    onMounted(() => {
      methods.prepare()
      methods.loadAll()
    })
  },
});
</script>
<style scoped lang="scss">
* {
  padding: 0px;
  margin: 0px;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

:deep(.nav-header) {
  width: 75%;
  margin: 0px auto;
  max-width: 1350px;
  min-width: 1100px;
}

.main {
  width: 75%;
  margin: 0px auto;
  margin-top: 1rem;
  max-width: 1350px;
  min-width: 1100px;
}
</style>
