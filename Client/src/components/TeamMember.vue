<template>
    <el-card v-if="memberList">
        <h3>成员列表</h3>
        <el-table :data="memberList.results" stripe>
            <el-table-column prop="username" label="用户" show-overflow-tooltip>
                <template #default="scope">
                    <el-link :href="'/user/' + scope.row.id" type="primary">
                        {{ scope.row.username }}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column prop="describe" label="个性签名" width="500" show-overflow-tooltip />
            <el-table-column prop="total_score" label="分数" />
            <el-table-column prop="solve_record.length" label="解题数" />
            <el-table-column label="操作" v-if="store.getters['UserInfo/isCaptain'](captain.id)">
                <template #default="scope">
                    <el-popconfirm width="200" confirm-button-text="确定" cancel-button-text="取消" title="请确定是否踢出该成员"
                        @confirm="dismissal(scope.row)" v-if="!store.getters['UserInfo/isCaptain'](scope.row.id)">
                        <template #reference>
                            <el-button size="small" type="danger">踢出</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm width="250" confirm-button-text="确认" cancel-button-text="取消" title="请确认是否转让队长给该成员"
                        @confirm="transfer(scope.row)" v-if="!store.getters['UserInfo/isCaptain'](scope.row.id)">
                        <template #reference>
                            <el-button size="small" type="warning">转让</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, PropType } from 'vue'
import { useStore } from 'vuex'
import { IUserInfo, ITeamListPagination } from '~/types'

export default defineComponent({
    name: 'TeamMember',
    components: {},
    props: {
        captain: {
            type: Object as PropType<IUserInfo>,
            default: () => {
                return {}
            }
        },
        memberList: {
            type: Object as PropType<ITeamListPagination>,
            default: () => {
                return {}
            }
        }
    },
    emits: ['dismissalClick', 'transferClick'],
    setup(props, context) {
        const store = useStore()
        const methods = reactive({
            dismissal: (user: any) => {
                context.emit('dismissalClick', user.id)
            },
            transfer: (user: any) => {
                context.emit('transferClick', user.id)
            }
        })

        return {
            store,
            ...toRefs(methods),
            ...toRefs(props)
        }
    }
})
</script>

<style scoped lang="scss"></style>
