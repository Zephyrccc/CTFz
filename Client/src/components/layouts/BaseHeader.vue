<template>
    <el-menu :default-active="route.meta?.index as string" mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="1" route="/index">首页</el-menu-item>
        <el-menu-item index="2" route="/challenges">题目</el-menu-item>
        <el-menu-item index="3" route="/rank">天梯</el-menu-item>
        <el-sub-menu index="4">
            <template #title>团队</template>
            <el-menu-item index="4-1" route="/teams">全部团队</el-menu-item>
            <el-menu-item index="4-2" route="/myteam">我的团队</el-menu-item>
        </el-sub-menu>
        <div class="flex-grow" />
        <el-menu-item index="5" v-if="!isLogin" route="/login">登录</el-menu-item>
        <el-sub-menu index="6" v-if="isLogin">
            <template #title>{{ store.state?.UserInfo?.username }}</template>
            <el-menu-item index="6-1" route="/myprofile">个人资料</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="7" v-if="!isLogin" route="/register">注册</el-menu-item>
        <el-menu-item index="8" v-if="isLogin" @click="logout">注销</el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'

export default defineComponent({
    name: 'BaseHeader',
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()

        const methods = reactive({
            logout: () => {
                ElNotification.success({ title: '注销成功' })
                store.dispatch('UserInfo/emptyUserInfo')
                router.replace('/')
            }
        })
        const isLogin = computed(() => {
            return store.getters['UserInfo/isLogin']
        })

        return {
            route,
            store,
            isLogin,
            ...toRefs(methods)
        }
    }
})
</script>

<style scoped lang="scss">
.el-menu {
    height: 100%;
    width: 75%;
    margin: 0px auto;
    max-width: 1350px;
    min-width: 1100px;
    border: none;

    .flex-grow {
        flex-grow: 1;
    }
}
</style>
