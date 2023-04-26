<template>
    <div class="user">
        <UserProfile :userInfo="userInfo" @changePassword="handleChangePassword" @changeUserInfo="handleChangeUserInfo" />
        <SolveRecord :userSolveRecord="userSolveRecord" @userSolveRecordChange="hanldeUserSolveRecordChange" />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    getUserInfo,
    getUserSolveRecordList,
    changePassword,
    changeUserInfo
} from '~/api'
import { IUserInfo, IUserSolveRecordListPagination } from '~/types'
import { ElNotification } from 'element-plus'
import UserProfile from '~/components/UserProfile.vue'
import SolveRecord from '~/components/SolveRecord.vue'

export default defineComponent({
    name: 'UserView',
    props: {},
    components: { UserProfile, SolveRecord },
    setup() {
        const route = useRoute()
        const userInfo = ref<IUserInfo>()
        const userSolveRecord = ref<IUserSolveRecordListPagination>()
        const methods = reactive({
            loadAll: () => {
                getUserInfo(Number(route.params.id)).then((response: any) => {
                    userInfo.value = response.data
                })
                getUserSolveRecordList(Number(route.params.id)).then(
                    (response: any) => {
                        userSolveRecord.value = response.data
                    }
                )
            },
            hanldeUserSolveRecordChange: (page: number) => {
                getUserSolveRecordList(Number(route.params.id), page).then(
                    (response: any) => {
                        userSolveRecord.value = response.data
                    }
                )
            },
            handleChangePassword: (
                userID: number,
                oldPassword: string,
                newPassword: string
            ) => {
                changePassword(userID, oldPassword, newPassword).then(
                    (response: any) => {
                        ElNotification.success({
                            title: '修改密码成功',
                        })
                    },
                    (error: any) => {
                        ElNotification.error({
                            title: '密码修改失败',
                            message: '原密码错误'
                        })
                    }
                )
            },
            handleChangeUserInfo: (userID: number, describe: string) => {
                changeUserInfo(userID, describe).then((response: any) => {
                    getUserInfo(Number(route.params.id)).then((response: any) => {
                        userInfo.value = response.data
                    })
                    ElNotification.success({
                        title: '修改个人资料成功',
                    })
                })
            }
        })
        onMounted(() => {
            methods.loadAll()
        })
        return {
            userInfo,
            userSolveRecord,
            ...toRefs(methods)
        }
    }
})
</script>

<style scoped lang="scss">
.user {
    text-align: center;
    margin-bottom: 1rem;
}
</style>
