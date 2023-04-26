<template>
    <el-input v-model="searchInput" @change="handleChange" :placeholder="placeholderText" :suffix-icon="Search" />
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'

export default defineComponent({
    name: 'TextSearch',
    props: {
        placeholderText: {
            type: String,
            default: ''
        }
    },
    setup(props, context) {
        const searchInput = ref('')
        const methods = reactive({
            handleChange: (value: string) => {
                context.emit('searchChange', value)
                searchInput.value = ''
            }
        })
        return {
            Search,
            searchInput,
            ...toRefs(props),
            ...toRefs(methods)
        }
    }
})
</script>
<style scoped lang="scss"></style>
