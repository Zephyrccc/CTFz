<template>
    <el-card class="team-card">
        <el-row justify="space-evenly">
            <el-col :span="10"> 团队名：</el-col>
            <el-col :span="12">
                <el-link :href="'/team/' + selectedTeam.id" :underline="false">{{ selectedTeam.name }}
                </el-link>
            </el-col>
        </el-row>
        <el-row justify="space-evenly">
            <el-col :span="10"> 队长：</el-col>
            <el-col :span="12">
                <el-link :href="'/user/' + selectedTeam.captain?.id" :underline="false">{{ selectedTeam.captain?.username }}
                </el-link>
            </el-col>
        </el-row>
        <el-row justify="space-evenly">
            <el-col :span="10"> 创建时间：</el-col>
            <el-col :span="12">{{ formatTime(selectedTeam.created_time) }}</el-col>
        </el-row>
    </el-card>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, PropType } from 'vue'
import moment from 'moment'
import { ITeam } from '~/types'

export default defineComponent({
    name: 'TeamCardInfo',
    components: {},
    props: {
        selectedTeam: {
            type: Object as PropType<ITeam>,
            default: () => {
                return {}
            }
        }
    },
    setup(props) {
        const methods = reactive({
            formatTime: (time: string | undefined) => {
                return moment(time).format('YYYY-MM-DD')
            }
        })
        return {
            ...toRefs(props),
            ...toRefs(methods)
        }
    }
})
</script>
<style scoped lang="scss">
.team-card {
    font-size: var(--el-font-size-medium);

    .el-row {
        padding: 0.5rem;
        align-items: center;
    }

    .el-link {
        font-size: var(--el-font-size-medium);
        color: var(--el-text-color-primary);
    }
}
</style>
