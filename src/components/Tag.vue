<template>
  <div class="tag-list">
    <span class="tag-title">标签:</span>
    <el-tag v-for="tag in checkedTag" :key="tag.id" :disable-transitions="false" @close="handleClose(tag)"
      class="tag-item" closable>
      {{ tag.value }}
    </el-tag>
    <el-autocomplete :fetch-suggestions="querySearch" v-model="text" ref="tagAutocomplete" clearable
      placeholder="+ New Tag" @select="handleSelect" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { AutocompleteInstance } from "element-plus";
import { ITagItem, TYPES } from "@/types";

export default defineComponent({
  name: "Tag",
  props: {},
  setup() {
    const store = useStore();
    const text = ref("");
    const checkedTag = ref<ITagItem[]>([]);
    const tagList = ref<ITagItem[]>([]);
    const tagAutocomplete = ref<AutocompleteInstance>();

    const createFilter = (queryString: string) => {
      return (tag: ITagItem) => {
        return tag.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    };
    const methods = reactive({
      querySearch: (queryString: string, callback: Function) => {
        const results = queryString
          ? tagList.value.filter(createFilter(queryString))
          : tagList.value;
        callback(results);
      },
      handleSelect: (item: ITagItem) => {
        checkedTag.value.push(item);
        tagList.value.splice(tagList.value.indexOf(item), 1);
        tagAutocomplete.value?.inputRef?.clear();
        tagAutocomplete.value?.blur();
      },
      handleClose: (item: ITagItem) => {
        checkedTag.value.splice(checkedTag.value.indexOf(item), 1);
        tagList.value.unshift(item);
      },
    });
    onMounted(() => {
      tagList.value = JSON.parse(JSON.stringify(store.state.ChallengeInfo.tagList));
    });
    return {
      text,
      checkedTag,
      tagAutocomplete,
      ...toRefs(methods),
    };
  },
});
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