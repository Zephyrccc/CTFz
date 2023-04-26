<template>
    <el-card class="my-team">
        <el-row justify="space-evenly">
            <el-col :span="10"> 我的团队</el-col>
            <el-col :span="12">
                <el-button @click="visible = true" type="primary" round v-if="!myTeam">创建团队</el-button>
            </el-col>
        </el-row>
        <el-row justify="space-evenly" v-if="myTeam">
            <el-col :span="10"> 团队名：</el-col>
            <el-col :span="12">
                <el-link :href="'/team/' + myTeam.id" :underline="false">{{
                    myTeam.name
                }}</el-link>
            </el-col>
        </el-row>
        <el-row justify="space-evenly" v-if="myTeam">
            <el-col :span="10"> 创建时间：</el-col>
            <el-col :span="12">{{ formatTime(myTeam.created_time) }}</el-col>
        </el-row>
    </el-card>
    <el-dialog v-model="visible" title="Warning" width="30%" align-center>
        <template #header="{ titleId }">
            <h3 :id="titleId">创建团队</h3>
        </template>
        <el-form label-width="100px" :model="teamInfo">
            <el-form-item label="团队名">
                <el-input v-model="teamInfo.name" />
            </el-form-item>
            <el-form-item label="宣言">
                <el-input v-model="teamInfo.declare" />
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="teamInfo.describe" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="handleCreateTeam">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, PropType } from 'vue'
import moment from 'moment'
import { ITeam } from '~/types'

export default defineComponent({
    name: 'MyTeamCardInfo',
    components: {},
    props: {
        myTeam: {
            type: Object as PropType<ITeam>,
            default: () => {
                return {}
            }
        }
    },
    emits: ['createTeamClick'],
    setup(props, context) {
        const visible = ref(false)
        const teamInfo = reactive({
            name: '',
            declare: '',
            describe: ''
        })
        const methods = reactive({
            formatTime: (time: string | undefined) => {
                return moment(time).format('YYYY-MM-DD')
            },
            handleCreateTeam: () => {
                visible.value = false
                context.emit('createTeamClick', teamInfo)
            }
        })
        return {
            visible,
            teamInfo,
            ...toRefs(methods)
        }
    }
})
</script>
<style scoped lang="scss">
.my-team {
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
