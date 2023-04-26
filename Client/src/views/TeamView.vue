<template>
    <div class="team">
        <TeamProfile :teamInfo="teamInfo" @joinTeamClick="handleJoinTeamClick"
            @changeTeamInfoClick="handleChangeTeamInfoClick" @leaveTeamClick="handleLeaveTeamClick" />
        <TeamIntroduction :teamInfo="teamInfo" class="introduction" />
        <TeamMember class="member-list" :captain="teamInfo?.captain" :memberList="memberList"
            @dismissalClick="handleDismissalClick" @transferClick="handleTransferClick" />
        <JoinRequest class="join-list" v-if="store.getters['UserInfo/isCaptain'](teamInfo?.captain?.id)"
            :joinRequestInfoList="joinRequestInfoList" @optionClick="handleOptionClick" />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { getTeamInfo, getUserList, applicationTeam, getApplicationTeamRequestList, dismissalMember, transferCaptain, changeTeamInfo, operateApplication } from '~/api'
import { ITeam, ITeamListPagination, IJoinRequestInfo } from '~/types'
import TeamProfile from '~/components/TeamProfile.vue'
import TeamIntroduction from '~/components/TeamIntroduction.vue'
import TeamMember from '~/components/TeamMember.vue'
import JoinRequest from '~/components/JoinRequest.vue'

export default defineComponent({
    name: 'TeamView',
    props: {},
    components: { TeamProfile, TeamIntroduction, TeamMember, JoinRequest },
    setup() {
        const route = useRoute()
        const store = useStore()
        const teamInfo = ref<ITeam>()
        const memberList = ref<ITeamListPagination>()
        const joinRequestInfoList = ref<IJoinRequestInfo[]>([])
        const params = { team: Number(route.params.id) }
        const methods = reactive({
            loadAll: () => {
                getTeamInfo(Number(route.params.id)).then((response: any) => {
                    teamInfo.value = response.data
                })
                getUserList(params).then((response: any) => {
                    memberList.value = response.data
                })
                getApplicationTeamRequestList().then((response: any) => {
                    joinRequestInfoList.value = response.data
                })
            },
            handleJoinTeamClick: () => {
                applicationTeam(
                    store.state.UserInfo?.id,
                    Number(teamInfo.value?.id)
                ).then(
                    (response: any) => {
                        ElNotification.success({
                            title: '申请成功',
                        })
                    },
                    (error: any) => {
                        console.log('失败')
                    }
                )
            },
            handleLeaveTeamClick: () => {
                dismissalMember(store.state.UserInfo.id).then(
                    (response: any) => {
                        ElNotification.success({
                            title: '退出团队成功',
                        })
                        store.dispatch('UserInfo/updateUserInfo', store.state.UserInfo.id)
                        getTeamInfo(Number(route.params.id)).then((response: any) => {
                            teamInfo.value = response.data
                        })
                        getUserList(params).then((response: any) => {
                            memberList.value = response.data
                        })
                    },
                    (error: any) => {
                        console.log('失败')
                    }
                )
            },
            handleDismissalClick: (user: number) => {
                dismissalMember(user).then(
                    (response: any) => {
                        getTeamInfo(Number(route.params.id)).then((response: any) => {
                            teamInfo.value = response.data
                        })
                        getUserList(params).then((response: any) => {
                            memberList.value = response.data
                        })
                        ElNotification.success({
                            title: '操作成功',
                        })
                    },
                    (error: any) => {
                        console.log('失败')
                    }
                )
            },
            handleTransferClick: (user: number) => {
                transferCaptain(user).then(
                    (response: any) => {
                        store.dispatch('UserInfo/updateUserInfo', store.state.UserInfo.id)
                        getTeamInfo(Number(route.params.id)).then((response: any) => {
                            teamInfo.value = response.data
                        })
                        ElNotification.success({
                            title: '操作成功',
                        })
                    },
                    (error: any) => {
                        console.log('失败')
                    }
                )
            },
            handleChangeTeamInfoClick: (teamChangeInfo: any) => {
                changeTeamInfo(Number(route.params.id), teamChangeInfo.declare, teamChangeInfo.describe).then(
                    (response: any) => {
                        getTeamInfo(Number(route.params.id)).then((response: any) => {
                            teamInfo.value = response.data
                        })
                        ElNotification.success({
                            title: '更新成功',
                        })
                    },
                    (error: any) => {
                        console.log('失败')
                    }
                )
            },
            handleOptionClick: (id: number, option: number) => {
                const index = joinRequestInfoList.value.findIndex(item => item.id === id);
                if (index !== -1) {
                    joinRequestInfoList.value.splice(index, 1);
                }
                operateApplication(id, option).then(
                    (response: any) => {
                        if (option) {
                            getTeamInfo(Number(route.params.id)).then((response: any) => {
                                teamInfo.value = response.data
                            })
                            getUserList(params).then((response: any) => {
                                memberList.value = response.data
                            })
                        }
                        ElNotification.success({
                            title: '操作成功'
                        })
                    },
                    (error: any) => {
                        console.log('失败')
                    }
                )
            },
        })
        onMounted(() => {
            methods.loadAll()
        })
        return {
            store,
            teamInfo,
            memberList,
            joinRequestInfoList,
            ...toRefs(methods)
        }
    }
})
</script>

<style scoped lang="scss">
.team {
    margin-bottom: 1rem;
}

.introduction,
.member-list,
.join-list {
    margin-top: 2rem;
}
</style>
