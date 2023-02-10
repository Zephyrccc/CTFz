<template>
  <el-row>
    <el-col :span="18">
      <Category @change="handleChange" :categoryList="categoryList" />
    </el-col>
    <el-col :span="6" class="search-bar">
      <Search placeholderText="搜索题目" />
    </el-col>
  </el-row>
  <TagSearch :tagList="tagList" />
  <div class="challenge-list">
    <ChallengeList :challengeList="challengeList" :challengeTotal="challengeTotal"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, onMounted } from "vue";
import { ITagItem, ICategory, IChallengeInfo } from "@/types";
import { getTagList, getCategoryList, getChallengeList } from "@/network/api";
import Category from "@/components/Category.vue";
import Search from "@/components/Search.vue";
import TagSearch from "@/components/TagSearch.vue";
import ChallengeList from "@/components/ChallengeList.vue";




export default defineComponent({
  name: "ChallengesView",
  components: { Category, Search, TagSearch, ChallengeList },
  setup() {
    const tagList = ref<ITagItem[]>([]);
    const categoryList = ref<ICategory[]>([])
    const challengeList = ref<IChallengeInfo[]>([]);
    const challengeTotal = ref(0);
    const methods = reactive({
      handleChange: (item: any) => {
        console.log(item)
      },
      loadAll: () => {
        getTagList().then((response: any) => {
          tagList.value = response.data
        });
        getCategoryList().then((response: any) => {
          categoryList.value = response.data
        });
        getChallengeList().then((response: any) => {
          challengeTotal.value = response.data.length;
          challengeList.value = response.data;
        });
      }
    })
    onMounted(() => {
      methods.loadAll()
    })
    return { ...toRefs(methods), tagList, categoryList, challengeList, challengeTotal };
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
