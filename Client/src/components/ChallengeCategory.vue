<template>
    <ul class="category">
        <span class="title">类型:</span>
        <li v-for="item in categoryList" :key="item.id">
            <span @click="handleClick(item)" :class="{ is_active: selectedCategory.id == item.id }">{{ item.name }}
            </span>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType } from 'vue'
import { ICategory } from '~/types'

export default defineComponent({
    name: 'ChallengeCategory',
    props: {
        categoryList: {
            type: Array as PropType<ICategory[]>,
            default: () => []
        },
        selectedCategory: {
            type: Object as PropType<ICategory>,
            default: () => {
                return { id: 1 }
            }
        }
    },
    setup(props, context) {
        const methods = reactive({
            handleClick: (item: ICategory) => {
                context.emit('update:selectedCategory', item)
                context.emit('categoryChange')
            }
        })
        return {
            ...toRefs(methods),
            ...toRefs(props)
        }
    }
})
</script>

<style scoped lang="scss">
.category {
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
    display: flex;
    font-size: var(--el-font-size-base);

    span {
        display: block;
        cursor: pointer;
        padding: 0.4rem 0.6rem;
        color: #666;
    }

    .title {
        font-weight: bolder;
    }

    span:hover {
        color: #101b27;
        font-weight: 400;
    }

    li {
        list-style-type: none;
        list-style: none;
    }

    .is_active {
        border: 1px solid #3a8ee6;
        background: #3a8ee6;
        color: #fff;
        border-radius: 5px;
    }
}
</style>
