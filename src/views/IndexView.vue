<template>
  <div class="main">
    <el-card class="team-card">
      <el-avatar :size="130" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      <div class="name">Nu1L</div>
      <span>宣言：异世相遇，尽享社死</span>
      <div class="button-box">
        <el-button type="primary">申请加入</el-button>
        <el-button type="primary">修改信息</el-button>
      </div>
      <el-divider />
      <el-row justify="space-between" class="info">
        <el-col :span="6" class="member">
          <div class="value">49</div>
          <div>成员数</div>
        </el-col>
        <el-col :span="6" class="captain">
          <el-link :href="'/user/' + 1" type="success" class="value">Venenof7
          </el-link>
          <div>队长</div>
        </el-col>
        <el-col :span="6" class="creation-time">
          <div class="value">2015-11-07</div>
          <div>创建时间</div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="introduction">
      <h3>团队简介</h3>
      <span>Nu1L战队是国内顶尖CTF联合战队，成立于2015年，队名源于英文单词“NULL”，《从0到1：CTFer成长之路》作者团队，目前成员80余人，队员分布于清华大学、上海科技大学、中科院信工所、复旦大学、北京大学、成都信息工程大学、南京邮电大学、西北大学、乔治亚理工学院等国内外各大高校，也分布于阿里、腾讯、华为、永信至诚、京东、安恒、长亭、启明星辰、蚂蚁金服等国内安全大厂。
        Nu1L战队的成员都对信息安全以及CTF比赛有着浓厚的兴趣，如拿获2019年护网杯冠军、2020年全国工业互联网安全技术技能大赛冠军，于2021年闯入DEFCON
        CTF决赛并获得全球第七名，除了收获国内外各类CTF比赛优异成绩之外，Nu1L还是N1CTF以及空指针挑战赛发起者，同时也是成都“巅峰极客”决赛“广诚市”三年场景设计者。成员也有参加Pwn2own、Geekpwn、天府杯的安全研究员，同时也有HITCON、KCON、Blackhat、天府杯等国内外安全会议演讲者。</span>
    </el-card>
    <el-card class="member-list">
      <h3>成员列表</h3>
      <el-table :data="memberData" stripe>
        <el-table-column prop="username" label="用户" show-overflow-tooltip>
          <template #default="scope">
            <el-link :href="'/user/' + 1" type="primary">{{
              scope.row.username
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="signature" label="个性签名" width="600" show-overflow-tooltip />
        <el-table-column prop="score" label="分数" />
        <el-table-column prop="solves" label="解题数" />
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
      <div class="pagination">
        <el-pagination small background layout="prev, pager, next,jumper,total" :total="50" />
      </div>
    </el-card>
    <el-card class="join-list">
      <h3>申请信息</h3>
      <el-table :data="joinData" stripe>
        <el-table-column prop="username" label="用户" show-overflow-tooltip>
          <template #default="scope">
            <el-link :href="'/user/' + 1" type="primary">
            {{scope.row.username}}
            </el-link>
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
      <div class="pagination">
        <el-pagination small background layout="prev, pager, next,jumper,total" :total="50" />
      </div>
    </el-card>

  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TeamView",
  props: {},
  components: {},
  setup() {
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

.pagination {
  margin-top: 1rem;
}

.join-list {
  margin-top: 2rem;
}
</style>