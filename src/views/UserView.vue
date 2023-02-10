<template>
  <div class="main">
    <el-card class="user">
      <el-avatar :size="130" :src="userInfo?.avatar" />
      <div class="username">{{ userInfo?.username }}</div>
      <span>{{ userInfo?.describe }}</span>
      <el-divider />
      <el-row justify="space-between" class="user-info">
        <el-col :span="6" class="score">
          <div class="value">{{ userInfo?.total_score }}</div>
          <div>积分</div>
        </el-col>
        <el-col :span="6" class="solve">
          <div class="value">{{ userInfo?.solve_info?.length }}</div>
          <div>解题数</div>
        </el-col>
        <el-col :span="6" class="team">
          <el-link :href="'/team/' + userInfo?.team?.id" type="danger" class="value"
            v-if="teamNameDisplay(userInfo?.team?.name)">{{ userInfo?.team?.name }}</el-link>
          <el-link type="danger" class="value" :underline="false" v-else>-</el-link>
          <div>团队</div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="solving-record">
      <h3>解题记录</h3>
      <el-table :data="tableData" stripe>
        <el-table-column prop="title" label="题目名称" show-overflow-tooltip>
          <template #default="scope">
            <el-link :href="'/challenge/' + 1" type="primary">{{ scope.row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="类型" />
        <el-table-column prop="score" label="分数" />
        <el-table-column prop="solvedTime" label="解题时间" />
      </el-table>
      <div class="pagination">
        <el-pagination small background layout="prev, pager, next,jumper,total" :total="50" />
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from "vue";
import { useRoute } from 'vue-router'
import { getUserInfo } from "@/network/api";
import { IUserInfo } from "@/types";

export default defineComponent({
  name: "UserView",
  props: {},
  components: {},
  setup() {
    const route = useRoute();
    const userInfo = ref<IUserInfo>()
    const methods = reactive({
      teamNameDisplay: (name: string | undefined) => {
        if (typeof name === "undefined")
          return false
        return true
      },
      loadAll: () => {
        getUserInfo(Number(route.params.id)).then((response: any) => {
          userInfo.value = response.data
          console.log(userInfo.value)
        });
      }
    })
    onMounted(() => {
      methods.loadAll()
    });
    const tableData = [
      {
        title: '兔年大吉',
        category: 'Web',
        score: '1',
        solvedTime: '2023-02-06 15:21:42',
      },
      {
        title: '留言板1',
        category: 'Web',
        score: '1',
        solvedTime: '2023-02-06 15:21:42',
      },
      {
        title: 'ezbypass',
        category: 'Web',
        score: '1',
        solvedTime: '2023-02-06 15:21:42',
      },
      {
        title: 'EasyMath',
        category: 'Web',
        score: '1',
        solvedTime: '2023-02-06 15:21:42',
      },
    ]
    return {
      ...toRefs(methods),
      userInfo,
      tableData
    };
  },
});
</script>

<style scoped lang="scss">
.main {
  width: 100%;
}

.user {
  text-align: center;

  .username {
    font-size: 34px;
    font-weight: bolder;
    margin: 1rem 0;
    color: var(--el-color-black);
  }

  span {
    font-size: var(--el-font-size-medium);
  }

  .user-info {
    .score {
      color: var(--el-color-primary);
    }

    .solve {
      color: var(--el-color-success);
    }

    .team {
      color: var(--el-color-danger);
    }

    .value {
      font-weight: bolder;
      font-size: var(--el-font-size-extra-large);
      margin-bottom: 0.5rem;
    }
  }
}



.solving-record {
  margin-top: 2rem;
  text-align: center;

  .pagination {
    margin-top: 1rem;
  }
}
</style>