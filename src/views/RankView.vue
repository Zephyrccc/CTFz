<template>
  <el-row>
    <el-col :span="18">
      <Category />
    </el-col>
    <el-col :span="6" class="search-bar">
      <ChallengeSearch />
    </el-col>
  </el-row>
  <el-divider>
    <el-tag type="success" effect="dark" round>
      您的排名：2200
    </el-tag>
  </el-divider>
  <div class="rank-list">
    <el-table :data="rankData" stripe>
      <el-table-column label="排名">
        <template #default="scope">
          <span>{{ scope.$index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" width="200" :show-overflow-tooltip="true">
        <template #default="scope">
          <el-link :underline="false" :href="'/user/' + 1" type="primary" class="username">
            {{ scope.row.username }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="signature" label="个性签名" width="700" :show-overflow-tooltip="true" />
      <el-table-column label="团队" width="200" :show-overflow-tooltip="true">
        <template #default="scope">
          <el-link :href="'/team/' + 1">{{ scope.row.team }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="积分" />
      <el-table-column prop="solves" label="解题数" />
    </el-table>
  </div>
  <el-pagination background layout="prev, pager, next, jumper,total" :total="1000" />

</template>

<script lang="ts">
import { defineComponent } from "vue"
import Category from "components/Category.vue";
import ChallengeSearch from "components/Category.vue";

export default defineComponent({
  name: "RankView",
  components: { Category, ChallengeSearch },
  setup() {
    const target: string = "/user/"
    const handleclick = (name: any) => {
      console.log(name)
    }
    const rankData = [
      {
        username: 'Xuxfff',
        team: 'A1natas',
        signature: '关注嘉然,顿顿解馋',
        score: 1,
        solves: 2,
      },
      {
        username: 'mxx307',
        team: 'TeamGipsy',
        signature: '须知少时凌云志，曾许人间第一流',
        score: 2,
        solves: 3,
      },
    ]
    return { target, rankData, handleclick }
  }
});
</script>
<style scoped lang="scss">
.search-bar {
  align-self: center;
}

.username {
  font-weight: bolder;
}

.rank-list {
  margin-bottom: 1rem;
}
</style>
