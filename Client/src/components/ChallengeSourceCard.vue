<template>
    <el-card class="source-information" v-if="challengeInfo">
        <el-row justify="space-evenly">
            <el-col :span="8"> 上传用户： </el-col>
            <el-col :span="8"> 管理员 </el-col>
        </el-row>
        <el-row justify="space-evenly">
            <el-col :span="8"> 上传时间： </el-col>
            <el-col :span="8"> {{ formatTime(challengeInfo?.created_time) }} </el-col>
        </el-row>
        <el-row justify="space-evenly">
            <el-col :span="8"> 题目状态： </el-col>
            <el-col :span="8">
                <el-tag type="success" round effect="dark" v-if="isSloved">已解出</el-tag>
                <el-tag type="warning" round effect="dark" v-else>未解出</el-tag>
            </el-col>
        </el-row>
    </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, PropType, computed } from 'vue'
import moment from 'moment'
import { IChallengeInfo } from '~/types'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'ChallengeProfile',
    props: {
        challengeInfo: {
            type: Object as PropType<IChallengeInfo>,
            default: () => {
                return {}
            }
        }
    },
    components: {},
    setup(props) {
        const store = useStore()
        const methods = reactive({
            formatTime: (time: string | undefined) => {
                return moment(time).format('YYYY-MM-DD')
            }
        })
        const isSloved = computed(() => {
            if (
                store.state?.UserInfo?.solve_record.find(
                    (t: any) => t.challenge_id === props.challengeInfo.id
                )
            )
                return true
            return false
        })
        return {
            ...toRefs(methods),
            ...toRefs(props),
            isSloved
        }
    }
})
</script>

<style scoped lang="scss">
.source-information {
    font-size: var(--el-font-size-medium);

    .el-row {
        padding: 0.5rem;
    }
}
</style>
