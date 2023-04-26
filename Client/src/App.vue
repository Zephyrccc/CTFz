<template>
    <el-container>
        <el-header height="45px">
            <BaseHeader />
        </el-header>
        <el-main class="main">
            <router-view />
        </el-main>
        <el-footer>
            <BaseFooter />
        </el-footer>
    </el-container>
</template>
  
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import BaseHeader from '~/components/layouts/BaseHeader.vue'
import BaseFooter from '~/components/layouts/BaseFooter.vue'

export default defineComponent({
    name: 'HomeView',
    components: { BaseHeader, BaseFooter },
    setup() {
        const store = useStore()
        const methods = reactive({
            prepare: () => {
                // 页面加载时读取localStorage的状态信息
                if (localStorage.getItem('store')) {
                    const oldStore = localStorage.getItem('store')
                    store.replaceState(
                        Object.assign(
                            {},
                            store.state,
                            JSON.parse(oldStore == null ? '' : oldStore)
                        )
                    )
                }
                // 在页面刷新时将store保存到localStorage中
                window.addEventListener('beforeunload', () => {
                    const state = JSON.stringify(store.state)
                    localStorage.setItem('store', state == null ? '' : state)
                })
            }
            // loadAll: () => {
            //   getTagList().then((response: any) => {
            //     // 从后端获取tag列表
            //     store.commit(`ChallengeInfo/${TYPES.UPDATE_TAG_LIST}`, response.data);
            //   });
            // }
        })
        onMounted(() => {
            methods.prepare()
        })
    }
})
</script>
  
<style scoped lang="scss">
* {
    padding: 0px;
    margin: 0px;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
}

.main {
    width: 75%;
    margin: 0px auto;
    margin-top: 1rem;
    max-width: 1350px;
    min-width: 1100px;
    min-height: calc(100vh - 107px);
}

.el-header {
    border-bottom: solid 1px var(--el-menu-border-color);
}

.el-footer {
    // border-top: 1px solid var(--el-text-color-regular);
    border-top: 1px solid var(--el-text-color-regular);
    height: 30px;
    line-height: 30px;
}
</style>
  