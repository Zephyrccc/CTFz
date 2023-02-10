<template>
  <el-row>
    <el-col v-for="challenge in challengeList" :key="challenge.id" :span="8">
      <el-card class="challenge" @click="handleClick(challenge)">
        <template #header>
          <div class="header">
            <el-tooltip effect="dark" content="题目名称" placement="top">
              <span class="title">{{ challenge.title }}</span>
            </el-tooltip>
            <el-tooltip effect="dark" content="难度" placement="top">
              <el-rate v-model="challenge.difficulty" disabled />
            </el-tooltip>
          </div>
        </template>
        <div class="describe">{{ challenge.describe }}</div>
        <el-tag class="tag" v-for="tag in challenge.tag" :key="tag.id">
          {{ tag.value }}
        </el-tag>
      </el-card>
    </el-col>
  </el-row>
  <div class="pagination">
    <el-pagination small background layout="prev, pager, next" :page-size="15" :total="challengeTotal" />
  </div>

</template>

<script lang="ts">
import { defineComponent, toRefs, ref, reactive, PropType, watch } from "vue";
import { useRouter } from 'vue-router'
import { IChallengeInfo } from "@/types";

export default defineComponent({
  name: "ChallengeList",
  props: {
    challengeTotal: {
      type: Number,
      default: 0
    },
    challengeList: {
      type: Object as PropType<IChallengeInfo[]>,
      default: []
    }
  },
  setup(props) {
    const router = useRouter();
    const challengeTotal = ref(0);
    const challengeList = ref<IChallengeInfo[]>([]);

    const methods = reactive({
      handleClick: (challenge: any) => {
        console.log(challenge)
        router.push({
          name: 'challenge',
          params: {
            id: challenge.id
          }
        })
      },
      // tagMapping: (id: number) => {
      //   return store.state.ChallengeInfo.tagList.find((t: any) => t.id === id)?.value
      // },
    });
    watch(() => props.challengeList, (newValue, oldValue) => {
      challengeList.value = newValue
    },)
    watch(() => props.challengeTotal, (newValue, oldValue) => {
      challengeTotal.value = newValue
    },)
    return {
      ...toRefs(methods),
      challengeList,
      challengeTotal,
    };
  },
});
</script>

<style scoped lang="scss">
.challenge {
  height: 200px;
  margin: 0 0.5rem 1rem 0.5rem;
  overflow-y: auto;
  cursor: pointer;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-weight: bolder;
    }
  }

  .describe {
    font-size: var(--el-font-size-base);
    margin-bottom: 10px;
    height: 55px;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .tag {
    margin-right: 5px;
    margin-bottom: 2px;
  }
}

.pagination {
  margin-top: 1rem;
}
</style>
