<template>
  <el-row>
    <Category />
    <ChallengeSearch />
  </el-row>
  <Tag />
  <ChallengeCardList />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Category from "components/Category.vue";
import ChallengeSearch from "components/Category.vue";
import Tag from "components/Tag.vue";
import ChallengeCardList from "components/ChallengeCardList.vue";

export default defineComponent({
  name: "ChallengesView",
  components: { Category, ChallengeSearch, Tag, ChallengeCardList },
  setup() {
    return {};
  },
});
</script>
<style scoped lang="scss">
</style>
