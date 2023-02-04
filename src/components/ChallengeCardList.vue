<template>
  <el-row>
    <el-col v-for="challenge in challengeList" :key="challenge.id" :span="8">
      <el-card class="challenge-card">
        <template #header>
          <div class="challenge-header">
            <span class="challenge-title">{{ challenge.title }}</span>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="难度"
              placement="top"
            >
              <el-rate v-model="challenge.difficulty" disabled />
            </el-tooltip>
          </div>
        </template>
        <div class="challenge-describe">{{ challenge.describe }}</div>
        <el-tag
          class="challenge-tag"
          v-for="(tagId, idx) in challenge.tag"
          :key="idx"
        >
          {{ store.state.ChallengeInfo.tagList.get(tagId) }}
        </el-tag>
      </el-card>
    </el-col>
  </el-row>
  <el-pagination
    small
    background
    layout="prev, pager, next"
    :page-size="15"
    :total="challengeTotal"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { useStore } from "vuex";
import { getChallengeList } from "@/network/api";

export default defineComponent({
  name: "ChallengeCardList",
  props: {},
  setup() {
    const store = useStore();
    const challengeTotal = ref(0);
    const challengeList = ref([]);

    const methods = reactive({
      loadAll: () => {
        getChallengeList().then((response: any) => {
          challengeTotal.value = response.data.length;
          challengeList.value = response.data;
        });
      },
    });

    onMounted(() => {
      methods.loadAll();
    });
    return {
      store,
      challengeList,
      challengeTotal,
    };
  },
});
</script>

<style scoped lang="scss">
.challenge-card {
  height: 200px;
  margin: 0 15px;
  overflow-y: auto;
  .challenge-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .challenge-title {
      font-weight: bolder;
    }
  }
  .challenge-describe {
    font-size: var(--el-font-size-base);
    margin-bottom: 10px;
    height: 55px;
    word-wrap: break-word;
    overflow: hidden; //超出隐藏
    text-overflow: ellipsis; //溢出显示省略号
    display: -webkit-box;
    -webkit-box-orient: vertical; //子元素排列 vertical（竖排）orhorizontal（横排）
    -webkit-line-clamp: 3; /*内容限制的行数 需要几行写几就行*/
  }
  .challenge-tag {
    margin-right: 5px;
    margin-bottom: 2px;
  }
}
</style>
