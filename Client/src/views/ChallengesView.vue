<template>
    <el-row>
        <el-col :span="18">
            <ChallengeCategory @categoryChange="handleCategoryAndSelectedTagChange" :categoryList="categoryList"
                v-model:selectedCategory="selectedCategory" />
        </el-col>
        <el-col :span="6" class="search-bar">
            <TextSearch @searchChange="handleSearchChange" placeholderText="搜索题目" />
        </el-col>
    </el-row>
    <TagSearch :tagList="tagList" v-model:selectedTag="selectedTag" @selectedTagChange="handleCategoryAndSelectedTagChange"
        v-model:isRefresh="isRefresh" />
    <div class="challenge-list">
        <ChallengeList :challengeList="challengeList" @challengeListChange="handleChallengeListChange" />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, onMounted } from 'vue'
import { ITagItem, ICategory, IChallengeListPagination } from '~/types'
import { getTagList, getCategoryList, getChallengeList } from '~/api'
import ChallengeCategory from '~/components/ChallengeCategory.vue'
import TextSearch from '~/components/TextSearch.vue'
import TagSearch from '~/components/TagSearch.vue'
import ChallengeList from '~/components/ChallengeList.vue'

export default defineComponent({
    name: 'ChallengesView',
    components: { ChallengeCategory, TextSearch, TagSearch, ChallengeList },
    setup() {
        const tagList = ref<ITagItem[]>([])
        const categoryList = ref<ICategory[]>([])
        const challengeList = ref<IChallengeListPagination>()
        const selectedCategory = ref<ICategory>()
        const selectedTag = ref<ITagItem[]>([])
        const isRefresh = ref<boolean>(false)
        const methods = reactive({
            loadAll: () => {
                getTagList().then((response: any) => {
                    tagList.value = response.data
                })
                getCategoryList().then((response: any) => {
                    categoryList.value = response.data
                })
                getChallengeList().then((response: any) => {
                    challengeList.value = response.data
                })
            },
            handleCategoryAndSelectedTagChange: () => {
                const params = {
                    category: selectedCategory.value?.id,
                    tag: selectedTag.value.map(item => item.id)
                }
                getChallengeList(params).then((response: any) => {
                    challengeList.value = response.data
                })
            },
            handleSearchChange: (value: string) => {
                selectedCategory.value = { id: 1, name: 'All' }
                isRefresh.value = !isRefresh.value
                const params = { title: value }
                getChallengeList(params).then((response: any) => {
                    challengeList.value = response.data
                })
            },
            handleChallengeListChange: (page: number) => {
                const params = {
                    category: selectedCategory.value,
                    tag: selectedTag.value.map(item => item.id),
                    page: page
                }
                getChallengeList(params).then((response: any) => {
                    challengeList.value = response.data
                })
            }
        })
        onMounted(() => {
            methods.loadAll()
        })
        return {
            tagList,
            categoryList,
            challengeList,
            selectedCategory,
            selectedTag,
            isRefresh,
            ...toRefs(methods)
        }
    }
})
</script>
<style scoped lang="scss">
.search-bar {
    align-self: center;
}

.challenge-list {
    margin-top: 1rem;
}
</style>
