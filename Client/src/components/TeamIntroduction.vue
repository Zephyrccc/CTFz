<template>
    <el-card v-if="teamInfo">
        <h3>团队简介</h3>
        <span>{{ teamInfo?.describe }}</span>
    </el-card>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue'
import { ITeam } from '~/types'

export default defineComponent({
    name: 'TeamIntroduction',
    props: {
        teamInfo: {
            type: Object as PropType<ITeam>,
            default: () => {
                return {}
            }
        }
    },
    components: {},
    setup(props) {
        return {
            ...toRefs(props)
        }
    }
})
</script>

<style scoped lang="scss"></style>
