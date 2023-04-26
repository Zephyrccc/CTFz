<template>
    <el-row>
        <el-col :span="18"> </el-col>
        <el-col :span="6" class="search-bar">
            <TextSearch placeholderText="搜索用户" @searchChange="handleSearchChange" />
        </el-col>
    </el-row>
    <el-divider>
        <el-tag type="success" effect="dark" round>
            您的积分:{{ store.state?.UserInfo?.total_score }}
        </el-tag>
    </el-divider>
    <div class="rank-list">
        <el-table :data="rankUserList?.results" stripe>
            <el-table-column label="用户" width="200" :show-overflow-tooltip="true">
                <template #default="scope">
                    <el-link :underline="false" :href="'/user/' + scope.row.id" type="primary" class="username">
                        {{ scope.row.username }}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column prop="describe" label="个性签名" width="400" :show-overflow-tooltip="true" />
            <el-table-column label="团队" width="200" :show-overflow-tooltip="true">
                <template #default="scope">
                    <el-link v-if="scope.row.team" :href="'/team/' + scope.row.team.id">{{
                        scope.row.team.name
                    }}</el-link>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column prop="total_score" label="积分" />
            <el-table-column prop="solve_record.length" label="解题数" />
        </el-table>
    </div>
    <div class="pagination">
        <el-pagination v-model:current-page="currentPage" small background layout="prev, pager, next" :page-size="15"
            :total="rankUserList?.count" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted, watch } from 'vue'
import { getUserList } from '~/api'
import { IUserListPagination } from '~/types'
import { useStore } from 'vuex'
import TextSearch from '~/components/TextSearch.vue'

export default defineComponent({
    name: 'RankView',
    components: { TextSearch },
    setup() {
        const store = useStore()
        const currentPage = ref(1)
        const rankUserList = ref<IUserListPagination>()
        const methods = reactive({
            loadAll: () => {
                getUserList().then((response: any) => {
                    rankUserList.value = response.data
                })
            },
            handleSearchChange: (value: string) => {
                const params = { username: value }
                getUserList(params).then((response: any) => {
                    rankUserList.value = response.data
                })
            }
        })
        watch(currentPage, newValue => {
            const params = { page: newValue }
            getUserList(params).then((response: any) => {
                rankUserList.value = response.data
            })
        })
        onMounted(() => {
            methods.loadAll()
        })
        return {
            store,
            currentPage,
            rankUserList,
            ...toRefs(methods)
        }
    }
})
</script>
<style scoped lang="scss">
.search-bar {
    align-self: center;
}

.username {
    font-weight: bolder;
}

.rank-list {
    margin-bottom: 1rem;
}

.pagination {
    margin: 1rem 0;
}
</style>
