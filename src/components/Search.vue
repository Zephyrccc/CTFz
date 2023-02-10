<template>
  <el-input v-model="searchInput" :placeholder="placeholderText" :suffix-icon="Search" />
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  name: "Search",
  props: { placeholderText: String },
  setup(props) {
    const searchInput = ref("");
    return {
      ...toRefs(props),
      Search,
      searchInput
    };
  },
});
</script>

<style scoped lang="scss">

</style>
