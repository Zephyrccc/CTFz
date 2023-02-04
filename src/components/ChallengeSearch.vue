<template class="category">
  <el-col :span="6" class="search_bar">
    <el-input
      v-model="searchInput"
      placeholder="搜索题目"
      :suffix-icon="Search"
    />
  </el-col>
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
.search_bar {
  align-self: center;
}
</style>
