<template>
    <el-input v-model="searchInput" placeholder="搜索题目" :suffix-icon="Search" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  name: "ChallengeSearch",
  props: {},
  setup() {
    const searchInput = ref("");
    return { Search, searchInput };
  },
});
</script>

<style scoped lang="scss">
</style>
