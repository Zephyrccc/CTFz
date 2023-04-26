<template>
    <el-table :data="teamList.results" @cell-click="handleCellClick" stripe>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="团队名" show-overflow-tooltip>
            <template #default="scope">
                <el-link :href="'/team/' + scope.row.id" type="primary" :underline="false">
                    {{ scope.row.name }}
                </el-link>
            </template>
        </el-table-column>
        <el-table-column prop="declare" label="宣言" />
        <el-table-column prop="captain" label="队长" show-overflow-tooltip>
            <template #default="scope">
                <el-link :href="'/user/' + scope.row.captain.id">{{
                    scope.row.captain.username
                }}</el-link>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination small background layout="prev, pager, next" :page-size="15" :total="teamList.count"
            v-model:current-page="currentPage" />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, watch, PropType } from 'vue'
import { ITeamListPagination } from '~/types'

export default defineComponent({
    name: 'TeamList',
    components: {},
    props: {
        teamList: {
            type: Object as PropType<ITeamListPagination>,
            default: () => {
                return {}
            }
        }
    },
    emits: ['teamListChange', 'selectedTeamItem'],
    setup(props, context) {
        const currentPage = ref(1)
        const methods = reactive({
            handleCellClick: (row: any) => {
                context.emit('selectedTeamItem', row)
            }
        })
        watch(currentPage, (newValue, oldValue) => {
            context.emit('teamListChange', newValue)
        })
        return {
            currentPage,
            ...toRefs(props),
            ...toRefs(methods)
        }
    }
})
</script>
<style scoped lang="scss">
.pagination {
    margin-top: 1rem;
}
</style>
