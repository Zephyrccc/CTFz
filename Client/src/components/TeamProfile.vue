<template>
    <div class="main" v-if="teamInfo">
        <el-card class="team-card" v-if="teamInfo">
            <!-- <el-avatar :size="130" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" /> -->
            <div class="name">{{ teamInfo?.name }}</div>
            <span>{{ teamInfo?.declare }}</span>
            <div class="button-box">
                <el-button type="primary" v-if="!store.getters['UserInfo/haveTeam']" @click="joinTeamClick">申请加入</el-button>
                <el-button type="primary" @click="visible = true"
                    v-if="store.getters['UserInfo/isCaptain'](teamInfo?.captain?.id)">修改信息</el-button>
                <el-popconfirm width="250" confirm-button-text="确认" cancel-button-text="取消" title="请确认是否退出团队"
                    @confirm="leaveTeamClick" v-if="visibleLeave">
                    <template #reference>
                        <el-button type="danger">退出团队</el-button>
                    </template>
                </el-popconfirm>
            </div>
            <el-divider />
            <el-row justify="space-between" class="info">
                <el-col :span="6" class="member">
                    <div class="value">{{ teamInfo?.member?.length }}</div>
                    <div>成员数</div>
                </el-col>
                <el-col :span="6" class="captain">
                    <el-link :href="'/user/' + teamInfo?.captain?.id" type="success" class="value">{{
                        teamInfo?.captain?.username }}
                    </el-link>
                    <div>队长</div>
                </el-col>
                <el-col :span="6" class="creation-time">
                    <div class="value">{{ formatTime(teamInfo?.created_time) }}</div>
                    <div>创建时间</div>
                </el-col>
            </el-row>
        </el-card>
    </div>
    <el-dialog v-model="visible" title="Warning" width="30%" align-center>
        <template #header="{ titleId }">
            <h3 :id="titleId">修改团队信息</h3>
        </template>
        <el-form label-width="100px">
            <el-form-item label="宣言">
                <el-input v-model="teamChangeInfo.declare" />
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="teamChangeInfo.describe" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="changeTeamInfoClick">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, PropType, computed } from 'vue'
import { useStore } from 'vuex'
import { ITeam } from '~/types'
import moment from 'moment'

export default defineComponent({
    name: 'TeamProfile',
    props: {
        teamInfo: {
            type: Object as PropType<ITeam>,
            default: () => {
                return {}
            }
        }
    },
    components: {},
    emits: ['joinTeamClick', 'changeTeamInfoClick', 'leaveTeamClick'],
    setup(props, context) {
        const store = useStore()
        const visible = ref(false)
        const teamChangeInfo = reactive({
            declare: '',
            describe: ''
        })
        const visibleLeave = computed(() => {
            return store.getters['UserInfo/haveTeam'] && (!store.getters['UserInfo/isCaptain'](store.state.UserInfo.team.captain))
        })
        const methods = reactive({
            formatTime: (time: string | undefined) => {
                return moment(time).format('YYYY-MM-DD')
            },
            joinTeamClick: () => {
                context.emit('joinTeamClick')
            },
            changeTeamInfoClick: () => {
                visible.value = false
                context.emit('changeTeamInfoClick', teamChangeInfo)
            },
            leaveTeamClick: () => {
                context.emit('leaveTeamClick')
            }
        })

        return {
            store,
            visible,
            visibleLeave,
            teamChangeInfo,
            ...toRefs(methods),
            ...toRefs(props)
        }
    }
})
</script>

<style scoped lang="scss">
.team-card {
    text-align: center;

    .name {
        font-size: 34px;
        font-weight: bolder;
        margin: 1rem 0;
        color: var(--el-color-black);
    }

    span {
        font-size: var(--el-font-size-medium);
    }

    .button-box {
        text-align: right;
    }

    .info {
        .member {
            color: var(--el-color-primary);
        }

        .captain {
            color: var(--el-color-success);
        }

        .creation-time {
            color: var(--el-color-danger);
        }

        .value {
            font-weight: bolder;
            font-size: var(--el-font-size-extra-large);
            margin-bottom: 0.5rem;
        }
    }
}
</style>
