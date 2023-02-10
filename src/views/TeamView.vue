<template>
  <div class="main">
    <el-card class="team-card">
      <el-avatar :size="130" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      <div class="name">{{ teamInfo?.name }}</div>
      <span>{{ teamInfo?.declare }}</span>
      <div class="button-box">
        <el-button type="primary">申请加入</el-button>
        <el-button type="primary">修改信息</el-button>
      </div>
      <el-divider />
      <el-row justify="space-between" class="info">
        <el-col :span="6" class="member">
          <div class="value">{{ teamInfo?.member?.length }}</div>
          <div>成员数</div>
        </el-col>
        <el-col :span="6" class="captain">
          <el-link :href="'/user/' + teamInfo?.captain.id" type="success" class="value">{{ teamInfo?.captain.username }}
          </el-link>
          <div>队长</div>
        </el-col>
        <el-col :span="6" class="creation-time">
          <div class="value">{{ formatTime(teamInfo?.created_time) }}</div>
          <div>创建时间</div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="introduction">
      <h3>团队简介</h3>
      <span>{{ teamInfo?.describe }}</span>
    </el-card>
    <el-card class="member-list">
      <h3>成员列表</h3>
      <el-table :data="teamInfo?.member" stripe>
        <el-table-column prop="username" label="用户" show-overflow-tooltip>
          <template #default="scope">
            <el-link :href="'/user/' + scope.row.id" type="primary">
            {{scope.row.username}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="describe" label="个性签名" width="600" show-overflow-tooltip />
        <el-table-column prop="total_score" label="分数" />
        <el-table-column prop="solve_info" label="解题数" />
        <el-table-column label="操作" v-if="true">
          <template #default="scope">
            <el-popconfirm width="200" confirm-button-text="确定" cancel-button-text="取消" title="请确定是否踢出该成员"
              @confirm="handleFire(scope.$index, scope.row)">
              <template #reference>
                <el-button size="small" type="danger">踢出</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="join-list">
      <h3>申请信息</h3>
      <el-table :data="joinData" stripe>
        <el-table-column prop="username" label="用户" show-overflow-tooltip>
          <template #default="scope">
            <el-link :href="'/user/' + scope.row.id" type="primary">{{
              scope.row.username
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="申请时间" width="300" />
        <el-table-column prop="score" label="分数" />
        <el-table-column prop="solves" label="解题数" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="success" @click="handleAgree(scope.$index, scope.row)">同意</el-button>
            <el-button size="small" type="danger" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from "vue";
import { useRoute } from 'vue-router'
import moment from 'moment'
import { getTeamInfo } from "@/network/api";
import { ITeam } from "@/types";

export default defineComponent({
  name: "TeamView",
  props: {},
  components: {},
  setup() {
    const route = useRoute()
    const teamInfo = ref<ITeam>()
    const methods = reactive({
      formatTime: (time: string | undefined) => {
        return moment(time).format("YYYY-MM-DD")
      },
      loadAll: () => {
        getTeamInfo(Number(route.params.id)).then((response: any) => {
          teamInfo.value = response.data
          console.log(teamInfo.value)
        });
      }
    })
    onMounted(() => {
      methods.loadAll()
    })
    const memberData = [
      {
        username: 'Xuxfff',
        signature: '关注嘉然,顿顿解馋',
        score: 1,
        solves: 2,
      },
      {
        username: 'mxx307',
        signature: '须知少时凌云志，曾许人间第一流',
        score: 2,
        solves: 3,
      },
    ];
    const handleFire = (index: number, userinfo: any) => {
      console.log(index, userinfo)
    }
    const handleAgree = (index: number, userinfo: any) => {
      console.log(index, userinfo)
    }
    const handleReject = (index: number, userinfo: any) => {
      console.log(index, userinfo)
    }
    const joinData = [
      {
        username: 'Xuxfff',
        score: 1,
        solves: 2,
        time: '2015-11-07'
      },
      {
        username: 'mxx307',
        score: 2,
        solves: 3,
        time: '2015-11-07'
      },
    ];
    return {
      ...toRefs(methods),
      teamInfo,
      handleFire,
      handleAgree,
      handleReject,
      joinData,
      memberData,
    };
  },
});
</script>

<style scoped lang="scss">
.main {
  width: 100%;
}

.team-card {
  text-align: center;

  .name {
    font-size: 34px;
    font-weight: bolder;
    margin: 1rem 0;
    color: var(--el-color-black);
  }

  span {
    font-size: var(--el-font-size-medium);
  }

  .button-box {
    text-align: right;
  }

  .info {
    .member {
      color: var(--el-color-primary);
    }

    .captain {
      color: var(--el-color-success);
    }

    .creation-time {
      color: var(--el-color-danger);
    }

    .value {
      font-weight: bolder;
      font-size: var(--el-font-size-extra-large);
      margin-bottom: 0.5rem;
    }
  }
}

.introduction {
  margin-top: 2rem;
}

.member-list {
  margin-top: 2rem;
}


.join-list {
  margin-top: 2rem;
}
</style>