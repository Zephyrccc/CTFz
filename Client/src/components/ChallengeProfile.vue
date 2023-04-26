<template>
    <el-card class="info" v-if="challengeInfo" v-loading="loading">
        <div class="title">
            <span>{{ challengeInfo?.title }}</span>
        </div>
        <div class="body">
            <p>
                难度：
                <el-rate v-model="difficulty" size="default" disabled show-score score-template="{value}" />
            </p>
            <p>
                标签：
                <el-tag v-for="tag in challengeInfo?.tag" :key="tag.id">
                    {{ tag.value }}
                </el-tag>
            </p>
            <p>分数： {{ challengeInfo?.score }}</p>
            <p>描述： {{ challengeInfo?.describe }}</p>
            <p v-if="challengeInfo?.attachment">
                附件：
                <el-link :href="challengeInfo.attachment" :underline="false">
                    <el-button type="primary">
                        下载
                        <el-icon>
                            <Download />
                        </el-icon>
                    </el-button>
                </el-link>
            </p>
        </div>
        <div class="footer">
            <div class="start" v-show="challengeInfo.environment_type && !isChallengeSelf">
                <el-button type="primary" @click="addContainer"> 启动环境 </el-button>
            </div>
            <div class="starting" v-if="isChallengeSelf">
                <div>
                    <span>靶机地址：</span>
                    <el-link type="warning" :href="host.name + ':' + containerInfo.port" target="_blank">{{ host.name + ':'
                        +
                        containerInfo.port }}</el-link>
                </div>
                <el-progress type="dashboard" :percentage="percentage" :color="colors">
                    <span>剩余:{{ time }}秒</span>
                </el-progress>
                <div class="control-pannel">
                    <el-button type="danger" text bg @click="removeContainer">关闭环境</el-button>
                </div>
            </div>
            <div class="upload-flag">
                <el-input v-model="flagValue" placeholder="flag{......}">
                    <template #append>
                        <el-button type="primary" @click="submit">提交</el-button>
                    </template>
                </el-input>
            </div>
        </div>
    </el-card>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, PropType, computed, onUnmounted, watch } from 'vue'
import { Download } from '@element-plus/icons-vue'
import { IHost, IChallengeInfo, IContainerInfo } from '~/types'

export default defineComponent({
    name: 'ChallengeProfile',
    props: {
        host: {
            type: Object as PropType<IHost>,
            default: () => {
                return { name: 'http://127.0.0.1' }
            }
        },
        challengeInfo: {
            type: Object as PropType<IChallengeInfo>,
            default: () => {
                return {}
            }
        },
        containerInfo: {
            type: Object as PropType<IContainerInfo>,
            default: () => {
                return {}
            }
        },
        loading: {
            type: Boolean,
            default: () => {
                return false
            }
        }
    },
    components: { Download },
    emits: ['addContainer', 'removeContainer', 'timeOut', 'flagSubmit'],
    setup(props, context) {
        const flagValue = ref('')
        const difficulty = computed(() => {
            return props.challengeInfo.difficulty
        })
        const time = ref(0)
        const isChallengeSelf = computed(() => {
            return props.challengeInfo.id === props.containerInfo.challenge
        })
        const percentage = computed(() => {
            return Math.floor((time.value / props.containerInfo.time_limit) * 100)
        })
        const colors = [
            { color: '#f56c6c', percentage: 20 },
            { color: '#e6a23c', percentage: 40 },
            { color: '#5cb87a', percentage: 60 },
            { color: '#1989fa', percentage: 80 },
            { color: '#6f7ad3', percentage: 100 },
        ]
        let timer: any = null
        watch(isChallengeSelf, (newValue) => {
            if (newValue) {
                time.value = methods.getTime(props.containerInfo.created_time, props.containerInfo.time_limit)
                timer = setInterval(() => {
                    if (time.value >= 0) {
                        time.value--
                    }
                    else {
                        methods.timeOut()
                    }
                }, 1000)
            }
        })
        const methods = reactive({
            getTime: (startTime: string, timeLimit: number) => {
                const start = new Date(startTime);
                const deadLine = new Date(start.getTime() + timeLimit * 1000)
                const now = new Date();
                return Math.floor((deadLine.getTime() - now.getTime()) / 1000)
            },
            timeOut: () => {
                context.emit('timeOut')
                clearInterval(timer)
            },
            removeContainer: () => {
                context.emit('removeContainer')
                clearInterval(timer)
            },
            addContainer: () => {
                context.emit('addContainer')
            },
            submit: () => {
                context.emit('flagSubmit', flagValue.value)
                flagValue.value = ''
            }
        })
        onUnmounted(() => {
            clearInterval(timer)
        })
        return {
            time,
            colors,
            difficulty,
            flagValue,
            isChallengeSelf,
            percentage,
            ...toRefs(methods),
            ...toRefs(props)
        }
    }
})
</script>

<style scoped lang="scss">
.info {
    .title {
        text-align: center;
    }

    .body {
        font-size: var(--el-font-size-large);
        color: var(--el-text-color-regular);

        :deep(.el-tag) {
            margin-right: 0.4rem;
        }

        :deep(.el-rate) {
            .el-rate__text {
                font-size: var(--el-font-size-large);
                color: var(--el-text-color-regular);
            }
        }
    }

    .footer {
        text-align: center;

        div {
            margin-bottom: 1rem;
        }

        .starting {
            div {
                font-size: var(--el-font-size-large);
                color: var(--el-text-color-regula);
            }

            :deep(.el-progress) {
                margin-bottom: 0;
                color: var(--el-text-color-regular);
            }

            :deep(.el-link__inner) {
                font-size: var(--el-font-size-large);
            }
        }

        .upload-flag {
            :deep(.el-button) {
                background-color: var(--el-button-bg-color);
                color: var(--el-button-text-color);
            }

            :deep(.el-button:hover) {
                background-color: var(--el-button-active-color);
                color: var(--el-button-hover-text-color);
            }
        }
    }
}
</style>
