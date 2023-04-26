<template>
    <el-card>
        <h3>申请信息</h3>
        <el-table :data="joinRequestInfoList" stripe>
            <el-table-column label="用户" show-overflow-tooltip>
                <template #default="scope">
                    <el-link :href="'/user/' + scope.row.user.id" type="primary">{{
                        scope.row.user.username
                    }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="申请时间" width="300">
                <template #default="scope">
                    {{ formatTime(scope.row.time) }}
                </template>
            </el-table-column>
            <el-table-column label="分数">
                <template #default="scope">
                    {{ scope.row.user.total_score }}
                </template>
            </el-table-column>
            <el-table-column label="解题数">
                <template #default="scope">
                    {{ scope.row.user.solve_record.length }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="success" @click="option(scope.row, 1)">同意</el-button>
                    <el-button size="small" type="danger" @click="option(scope.row, 0)">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script lang="ts">
import moment from 'moment'
import { defineComponent, reactive, toRefs, PropType } from 'vue'
import { IJoinRequestInfo } from '~/types'

export default defineComponent({
    name: 'JoinInfo',
    props: {
        joinRequestInfoList: {
            type: Object as PropType<IJoinRequestInfo[]>,
            default: () => []
        }
    },
    emits: ['optionClick'],
    components: {},
    setup(props, context) {
        const methods = reactive({
            option: (joinInfo: IJoinRequestInfo, option: number) => {
                context.emit('optionClick', joinInfo.id, option)
            },
            formatTime: (time: string) => {
                return moment(time).format('YYYY-MM-DD HH:mm:ss')
            },
        })
        return {
            ...toRefs(methods),
            ...toRefs(props)
        }
    }
})
</script>

<style scoped lang="scss"></style>
