<template>
    <div class="challenge">
        <el-row>
            <el-col :span="16">
                <ChallengeProfile :challengeInfo="challengeInfo" :containerInfo="challengeContainer" :host="host"
                    @removeContainer="handleRemoveContainer" @timeOut="handleTimeOut" @addContainer="handleAddContainer"
                    @flagSubmit="handleFlagSubmit" :loading='loading' />
                <ChallengeComment class="comment" :challengeComment="challengeComment"
                    @challengeCommentListChange="handleChallengeCommentListChange" @submitComment="handleSubmitComment" />
            </el-col>
            <el-col :span="8">
                <ChallengeSourceCard :challengeInfo="challengeInfo" class="challenge-source" />
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { IChallengeInfo, IChallengeCommentListPagination, IContainerInfo, IHost } from '~/types'
import { getHost, getChallengeInfo, getChallengeCommentList, getContainer, addContainer, removeContainer, submitFlag, addChallengeComment } from '~/api'
import ChallengeProfile from '~/components/ChallengeProfile.vue'
import ChallengeComment from '~/components/ChallengeComment.vue'
import ChallengeSourceCard from '~/components/ChallengeSourceCard.vue'

export default defineComponent({
    name: 'ChallengeView',
    props: {},
    components: { ChallengeProfile, ChallengeComment, ChallengeSourceCard },
    setup() {
        const route = useRoute()
        const store = useStore()
        const loading = ref(false)
        const challengeInfo = ref<IChallengeInfo>()
        const challengeComment = ref<IChallengeCommentListPagination>()
        const challengeContainer = ref<IContainerInfo>()
        const host = ref<IHost>()
        const methods = reactive({
            loadAll: () => {
                getHost().then(
                    (response: any) => {
                        if (response.data.name) {
                            host.value = response.data
                        }
                        else {
                            host.value = { name: 'http://127.0.0.1' }
                        }
                    }
                )
                getChallengeInfo(Number(route.params.id)).then((response: any) => {
                    challengeInfo.value = response.data
                })
                getChallengeCommentList(Number(route.params.id)).then(
                    (response: any) => {
                        challengeComment.value = response.data
                    }
                )
                getContainer().then(
                    (response: any) => {
                        challengeContainer.value = response.data
                    }
                )
            },
            handleChallengeCommentListChange: (page: number) => {
                getChallengeCommentList(Number(route.params.id), page).then(
                    (response: any) => {
                        challengeComment.value = response.data
                    }
                )
            },
            handleAddContainer: () => {
                loading.value = true
                addContainer(store.state.UserInfo.id, Number(route.params.id)).then(
                    (response: any) => {
                        challengeContainer.value = response.data
                        loading.value = false
                        ElNotification.success({
                            title: '开启容器成功',
                        })
                    }
                )
            },
            handleTimeOut: () => {
                getContainer().then(
                    (response: any) => {
                        challengeContainer.value = response.data
                    }
                )
            },
            handleRemoveContainer: () => {
                removeContainer(challengeContainer.value?.id).then(
                    (response: any) => {
                        challengeContainer.value = response.data
                        ElNotification.success({
                            title: '关闭容器成功',
                        })
                    }
                )
            },
            handleFlagSubmit: (flag: string) => {
                submitFlag(store.state.UserInfo.id, Number(route.params.id), flag).then(
                    (response: any) => {
                        ElNotification.success({
                            title: '解题成功',
                            message: 'flag正确'
                        })
                        store.dispatch('UserInfo/updateUserInfo', store.state.UserInfo.id)
                    },
                    (error: any) => {
                        ElNotification.error({
                            title: '解题失败',
                            message: 'flag错误'
                        })
                    }
                )
            },
            handleSubmitComment: (comment: string) => {
                addChallengeComment(store.state.UserInfo.id, Number(route.params.id), comment).then(
                    (response: any) => {
                        getChallengeCommentList(Number(route.params.id)).then(
                            (response: any) => {
                                challengeComment.value = response.data
                                ElNotification.success({
                                    title: '评论成功',
                                })
                            }
                        )
                    }
                )
            }
        })
        onMounted(() => {
            methods.loadAll()
        })
        return {
            host,
            loading,
            challengeInfo,
            challengeComment,
            challengeContainer,
            ...toRefs(methods)
        }
    }
})
</script>

<style scoped lang="scss">
.challenge {
    font-size: var(--el-font-size-extra-large);
    font-family: var(--el-font-family);
    margin-bottom: 1rem;

    .comment {
        margin-top: 1rem;
    }

    .challenge-source {
        margin-left: 1rem;
    }
}
</style>
