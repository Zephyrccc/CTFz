<template>
  <div class="teams">
    <el-row>
      <el-col :span="18">
        <div class="body-left">
          <el-card>
            <div class="search-bar">
              <ChallengeSearch />
            </div>
            <el-table :data="teamsData" stripe>
              <el-table-column prop="id" label="ID" />
              <el-table-column prop="name" label="团队名" show-overflow-tooltip>
                <template #default="scope">
                  <el-link :href="'/team/' + 1" type="primary" :underline="false">{{ scope.row.name }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="declaration" label="宣言" />
              <el-table-column prop="captain" label="队长" show-overflow-tooltip>
                <template #default="scope">
                  <el-link :href="'/user/' + 1">{{ scope.row.captain }}</el-link>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination small background layout="prev, pager, next,jumper,total" :total="50" />
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="body-right">
          <el-card>
            <el-row justify="space-evenly">
              <el-col :span="8"> 团队名：</el-col>
              <el-col :span="12">
                <el-link :href="'/team/' + 1" :underline="false">flag{}___Orz </el-link>
              </el-col>
            </el-row>
            <el-row justify="space-evenly">
              <el-col :span="8"> 队长：</el-col>
              <el-col :span="12">
                <el-link :href="'/user/' + 1" :underline="false">Venenof7 </el-link>
              </el-col>
            </el-row>
            <el-row justify="space-evenly">
              <el-col :span="8"> 团队人数：</el-col>
              <el-col :span="12">7</el-col>
            </el-row>
            <el-row justify="space-evenly">
              <el-col :span="8"> 创建时间：</el-col>
              <el-col :span="12">2021-09-30</el-col>
            </el-row>
          </el-card>
          <el-card class="my-team">
            <el-row justify="space-evenly">
              <el-col :span="8"> 我的团队</el-col>
              <el-col :span="12">
                <el-button @click="visible = true" type="primary" round>创建团队</el-button>
              </el-col>
            </el-row>
            <el-row justify="space-evenly">
              <el-col :span="8"> 团队名：</el-col>
              <el-col :span="12">
                <el-link :href="'/team/' + 1" :underline="false">flag{}___Orz </el-link>
              </el-col>
            </el-row>
            <el-row justify="space-evenly">
              <el-col :span="8"> 队长：</el-col>
              <el-col :span="12">
                <el-link :href="'/user/' + 1" :underline="false">Venenof7 </el-link>
              </el-col>
            </el-row>
            <el-row justify="space-evenly">
              <el-col :span="8"> 团队人数：</el-col>
              <el-col :span="12">7</el-col>
            </el-row>
            <el-row justify="space-evenly">
              <el-col :span="8"> 创建时间：</el-col>
              <el-col :span="12">2021-09-30</el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="visible" title="Warning" width="30%" align-center>
    <template #header="{ titleId }">
      <h3 :id="titleId">创建团队</h3>
    </template>
    <el-form label-position="center" label-width="100px" :model="teamInfo">
      <el-form-item label="团队名">
        <el-input v-model="teamInfo.name" />
      </el-form-item>
      <el-form-item label="宣言">
        <el-input v-model="teamInfo.declaration" />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="teamInfo.introduction" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import ChallengeSearch from 'components/ChallengeSearch.vue'
export default defineComponent({
  name: "TeamsView",
  components: { ChallengeSearch },
  setup() {
    const visible = ref(false)
    const teamInfo = reactive({
      name: '',
      introduction: '',
      declaration: '',
    })
    const teamsData = [
      {
        id: 1,
        name: 'flag{}___Orz',
        declaration: 'Flag is not easy?',
        captain: 'Venenof7',
      },
      {
        id: 2,
        name: 'Hor1zon',
        declaration: 'a神粉丝后援会',
        captain: 'Sh33p',
      },
      {
        id: 3,
        name: 'flag{ls_hard}',
        declaration: '大菜鸡',
        captain: 'aaeeoo',
      },
      {
        id: 4,
        name: '打不过就加入',
        declaration: '菜鸟集中营',
        captain: 'dgmctf',
      },
    ]
    return {
      visible,
      teamInfo,
      teamsData
    };
  },
});
</script>
<style scoped lang="scss">
.teams {
  width: 100%;
}

.body-left {
  .search-bar {
    width: 250px;
    float: right;
    margin-bottom: 1rem;
  }

  .pagination {
    margin-top: 1rem;
  }
}

.body-right {
  margin-left: 1rem;

  .el-card {
    font-size: var(--el-font-size-medium);

    .el-row {
      padding: 0.5rem;
      align-items: center;
    }

    .el-link {
      font-size: var(--el-font-size-medium);
      color: var(--el-text-color-primary);
    }
  }

  .my-team {
    margin-top: 1rem;
  }
}
</style>
