<template>
    <el-card class="solve-info" v-if="userSolveRecord">
        <h3>解题记录</h3>
        <el-table :data="userSolveRecord.results" stripe>
            <el-table-column prop="challenge" label="题目名称" show-overflow-tooltip>
                <template #default="scope">
                    <el-link :href="'/challenge/' + scope.row.challenge.id" type="primary">{{ scope.row.challenge.title
                    }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="challenge.category.name" label="类型" />
            <el-table-column prop="solvedTime" label="解题时间">
                <template #default="scope">
                    {{ formatTime(scope.row.created_time) }}
                </template> </el-table-column>>
        </el-table>
        <div class="pagination">
            <el-pagination small background layout="prev, pager, next" v-model:current-page="currentPage" :page-size="15"
                :total="userSolveRecord?.count" />
        </div>
    </el-card>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs, ref, reactive, watch } from 'vue'
import { IUserSolveRecordListPagination } from '~/types'
import moment from 'moment'

export default defineComponent({
    name: 'SolveRecord',
    props: {
        userSolveRecord: {
            type: Object as PropType<IUserSolveRecordListPagination>,
            default: () => {
                return {}
            }
        }
    },
    components: {},
    emits: ['userSolveRecordChange'],
    setup(props, context) {
        const currentPage = ref(1)
        const methods = reactive({
            formatTime: (time: string) => {
                console.log(props.userSolveRecord)
                return moment(time).format('YYYY-MM-DD HH:mm:ss')
            }
        })
        watch(currentPage, newValue => {
            context.emit('userSolveRecordChange', newValue)
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
.solve-info {
    margin-top: 2rem;
    text-align: center;

    .pagination {
        margin-top: 1rem;
    }
}
</style>
