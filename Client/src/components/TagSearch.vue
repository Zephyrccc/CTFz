<template>
    <div class="tag-list">
        <span class="tag-title">标签:</span>
        <el-tag v-for="tag in selectedTag" :key="tag.id" :disable-transitions="false" @close="handleClose(tag)"
            class="tag-item" closable>
            {{ tag.value }}
        </el-tag>
        <el-autocomplete :fetch-suggestions="querySearch" v-model="text" ref="tagAutocomplete" clearable
            placeholder="+ New Tag" @select="handleSelect" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, watch, PropType } from 'vue'
import { AutocompleteInstance } from 'element-plus'
import { ITagItem } from '~/types'

export default defineComponent({
    name: 'TagSearch',
    props: {
        tagList: {
            type: Array as PropType<ITagItem[]>,
            default: () => []
        },
        selectedTag: {
            type: Array as PropType<ITagItem[]>,
            default: () => []
        },
        isRefresh: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        const text = ref('')
        const selectedTag = ref<ITagItem[]>([])
        const tagList = ref<ITagItem[]>([])
        const tagAutocomplete = ref<AutocompleteInstance>()

        const createFilter = (queryString: string) => {
            return (tag: ITagItem) => {
                return tag.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            }
        }
        watch(
            () => props.tagList,
            newValue => {
                tagList.value = newValue
            }
        )
        watch(
            () => props.isRefresh,
            () => {
                selectedTag.value.forEach(item => {
                    selectedTag.value.splice(selectedTag.value.indexOf(item), 1)
                    tagList.value.unshift(item)
                })
                context.emit('update:isRefresh', false)
            }
        )
        const methods = reactive({
            querySearch: (queryString: string, callback: Function) => {
                const results = queryString
                    ? tagList.value.filter(createFilter(queryString))
                    : tagList.value
                callback(results)
            },
            handleSelect: (item: ITagItem) => {
                selectedTag.value.push(item)
                tagList.value.splice(tagList.value.indexOf(item), 1)
                context.emit('update:selectedTag', selectedTag.value)
                tagAutocomplete.value?.inputRef?.clear()
                tagAutocomplete.value?.blur()
                context.emit('selectedTagChange')
            },
            handleClose: (item: ITagItem) => {
                selectedTag.value.splice(selectedTag.value.indexOf(item), 1)
                tagList.value.unshift(item)
                context.emit('update:selectedTag', selectedTag.value)
                context.emit('selectedTagChange')
            }
        })
        return {
            text,
            tagAutocomplete,
            ...toRefs(methods)
        }
    }
})
</script>

<style scoped lang="scss">
.tag-list {
    display: flex;
    height: 24px;

    .tag-title {
        font-size: var(--el-font-size-base);
        font-weight: bolder;
        color: #666;
        margin: 0.4rem 0.6rem;
    }

    span {
        align-self: center;
        cursor: pointer;
    }

    .tag-item {
        margin-right: 0.4rem;
    }

    :deep(.el-input__inner) {
        --el-input-inner-height: calc(var(--el-input-height, 32px) - 10px);
        font-size: 12px;
        width: 4rem;
    }
}
</style>
