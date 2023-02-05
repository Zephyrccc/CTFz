<template>
  <el-row>
    <el-col :span="18">
      <Category />
    </el-col>
    <el-col :span="6" class="search-bar">
      <ChallengeSearch />
    </el-col>
  </el-row>
  <Tag />
  <div class="challenge-list">
    <ChallengeCardList />
  </div>
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
.search-bar {
  align-self: center;
}

.challenge-list {
  margin-top: 1rem;
}
</style>
