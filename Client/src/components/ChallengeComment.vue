<template>
    <el-card class="comment-main" v-if="challengeComment">
        <el-input v-model="commentText" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }" placeholder="输入您的评论......" />
        <div class="upload-comment">
            <el-button type="primary" @click="submitComment">提交</el-button>
        </div>
        <div class="comment-list">
            <el-divider>
                <span class="header">评论区</span>
            </el-divider>
            <div class="comment-item" v-for="(item, index) in challengeComment?.results" :key="index">
                <el-link class="user" :href="'/user/' + item.user.id" target="_blank" :underline="false">{{
                    item.user.username }}</el-link>
                <el-tag class="time" effect="plain" round>{{
                    formatTime(item.time)
                }}</el-tag>
                <div class="text">{{ item.content }}</div>
                <el-divider />
            </div>
            <el-pagination v-model:current-page="currentPage" small background layout="prev, pager, next" :page-size="15"
                :total="challengeComment.count" />
        </div>
    </el-card>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, PropType, watch } from 'vue'
import { IChallengeInfo, IChallengeCommentListPagination } from '~/types'
import moment from 'moment'

export default defineComponent({
    name: 'ChallengeComment',
    props: {
        challengeComment: {
            type: Object as PropType<IChallengeCommentListPagination>,
            default: () => {
                {
                    return {}
                }
            }
        }
    },
    components: {},
    emits: ['challengeCommentListChange', 'submitComment'],
    setup(props, context) {
        const challengeInfo = ref<IChallengeInfo>()
        const commentText = ref('')
        const currentPage = ref(1)
        const methods = reactive({
            formatTime: (time: string) => {
                return moment(time).format('YYYY年MM月DD日')
            },
            submitComment: () => {
                if (commentText.value !== '') {
                    context.emit('submitComment', commentText.value)
                    commentText.value = ''
                }
            }
        })
        watch(currentPage, newValue => {
            context.emit('challengeCommentListChange', newValue)
        })
        return {
            commentText,
            currentPage,
            challengeInfo,
            ...toRefs(props),
            ...toRefs(methods)
        }
    }
})
</script>

<style scoped lang="scss">
.comment-main {
    .upload-comment {
        margin-top: 1rem;
        text-align: right;
    }

    .comment-list {
        font-size: var(--el-font-size-medium);
        color: var(--el-text-color-regular);

        .header {
            font-weight: bolder;
        }

        .comment-item {
            font-size: var(--el-font-size-medium);

            .user {
                font-weight: bolder;
            }

            .time {
                margin-left: 0.5rem;
            }

            .text {
                margin-top: 0.75rem;
                margin-bottom: 0.75rem;
            }
        }
    }
}
</style>
