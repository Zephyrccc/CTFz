<template>
    <el-row v-if="challengeList">
        <el-col v-for="challenge in challengeList.results" :key="challenge.id" :span="8">
            <el-card class="challenge" @click="handleClick(challenge)">
                <template #header>
                    <div class="header">
                        <el-tooltip effect="dark" :content="challenge.title" placement="top">
                            <span class="title">{{ challenge.title }}</span>
                        </el-tooltip>
                        <el-tooltip effect="dark" placement="top">
                            <template #content>难度：{{ challenge.difficulty }}</template>
                            <el-rate v-model="challenge.difficulty" disabled />
                        </el-tooltip>
                    </div>
                </template>
                <div class="describe">{{ challenge.describe }}</div>
                <el-tag class="tag" v-for="tag in challenge.tag" :key="tag.id">
                    {{ tag.value }}
                </el-tag>
            </el-card>
        </el-col>
    </el-row>
    <div class="pagination">
        <el-pagination v-model:current-page="currentPage" small background layout="prev, pager, next" :page-size="15"
            :total="challengeList.count" />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, reactive, PropType, watch } from 'vue'
import { useRouter } from 'vue-router'
import { IChallengeListPagination } from '~/types'

export default defineComponent({
    name: 'ChallengeList',
    props: {
        challengeList: {
            type: Object as PropType<IChallengeListPagination>,
            default: () => {
                return {}
            }
        }
    },
    emits: ['challengeListChange'],
    setup(props, context) {
        const router = useRouter()
        const currentPage = ref(1)
        const methods = reactive({
            handleClick: (challenge: any) => {
                router.push({
                    name: 'challenge',
                    params: {
                        id: challenge.id
                    }
                })
            }
        })
        watch(currentPage, newValue => {
            context.emit('challengeListChange', newValue)
        })
        return {
            currentPage,
            ...toRefs(methods),
            ...toRefs(props)
        }
    }
})
</script>

<style scoped lang="scss">
.challenge {
    height: 200px;
    margin: 0 0.5rem 1rem 0.5rem;
    overflow-y: auto;
    cursor: pointer;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-weight: bolder;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .describe {
        font-size: var(--el-font-size-base);
        margin-bottom: 10px;
        height: 55px;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }

    .tag {
        margin-right: 5px;
        margin-bottom: 2px;
    }
}

.pagination {
    margin: 1rem 0;
}
</style>
