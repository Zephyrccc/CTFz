<template>
    <el-row>
        <el-col :span="18">
            <el-card>
                <div class="search-bar">
                    <TextSearch placeholderText="搜索团队" @searchChange="handleSearchChange" />
                </div>
                <TeamList :teamList="teamList" @teamListChange="handleTeamListChange"
                    @selectedTeamItem="handleSelectedTeamItem" />
            </el-card>
        </el-col>
        <el-col :span="6">
            <div class="right">
                <TeamCardInfo class="card-info" :selectedTeam="selectedTeam" v-if="selectedTeam" />
                <MyTeamCardInfo :myTeam="store.state?.UserInfo?.team" @createTeamClick="handlecreateTeamClick" />
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
import { useStore } from 'vuex'
import { getTeamList, createTeam } from '~/api'
import { ITeamListPagination, ITeam } from '~/types'
import { ElNotification } from 'element-plus'
import TeamList from '~/components/TeamList.vue'
import TeamCardInfo from '~/components/TeamCardInfo.vue'
import MyTeamCardInfo from '~/components/MyTeamCardInfo.vue'
import TextSearch from '~/components/TextSearch.vue'

export default defineComponent({
    name: 'TeamsView',
    components: { TeamList, TeamCardInfo, MyTeamCardInfo, TextSearch },
    setup() {
        const store = useStore()
        const teamList = ref<ITeamListPagination>()
        const selectedTeam = ref<ITeam>()

        const methods = reactive({
            loadAll: () => {
                getTeamList().then((response: any) => {
                    teamList.value = response.data
                })
            },
            handleTeamListChange: (page: number) => {
                const params = { page: page }
                getTeamList(params).then((response: any) => {
                    teamList.value = response.data
                })
            },
            handleSelectedTeamItem: (item: ITeam) => {
                selectedTeam.value = item
            },
            handleSearchChange: (value: string) => {
                const params = { name: value }
                getTeamList(params).then((response: any) => {
                    teamList.value = response.data
                })
            },
            handlecreateTeamClick: (teamInfo: ITeam) => {
                createTeam(
                    store.state.UserInfo?.id,
                    String(teamInfo.name),
                    String(teamInfo.declare),
                    String(teamInfo.describe)
                ).then(
                    (response: any) => {
                        ElNotification.success({
                            title: '创建成功',
                        })
                        store.dispatch('UserInfo/updateUserInfo', store.state.UserInfo.id)
                        methods.loadAll()
                    },
                    (error: any) => {
                        console.log('创建失败')
                    }
                )
            }
        })
        onMounted(() => {
            methods.loadAll()
        })
        return {
            store,
            teamList,
            selectedTeam,
            ...toRefs(methods)
        }
    }
})
</script>
<style scoped lang="scss">
.el-row {
    margin-bottom: 1rem;
}

.search-bar {
    width: 250px;
    float: right;
    margin-bottom: 1rem;
}

.right {
    margin-left: 1rem;

    .card-info {
        margin-bottom: 1rem;
    }
}
</style>
