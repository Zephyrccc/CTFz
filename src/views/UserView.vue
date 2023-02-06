<template>
  <div class="main">
    <el-card class="user">
      <el-avatar :size="130" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      <div class="username">XDQMORE</div>
      <span>这家伙很懒什么也没留下</span>
      <el-divider />
      <el-row justify="space-between" class="user-info">
        <el-col :span="6" class="score">
          <div class="value">7788</div>
          <div>积分</div>
        </el-col>
        <el-col :span="6" class="solve">
          <div class="value">2</div>
          <div>解题数</div>
        </el-col>
        <el-col :span="6" class="team">
          <el-link :href="'/team/' + 1" type="danger" class="value">三叶草</el-link>
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
import { defineComponent } from "vue";


export default defineComponent({
  name: "UserView",
  props: {},
  components: {},
  setup() {
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
  .pagination{
    margin-top: 1rem;
  }
}
</style>