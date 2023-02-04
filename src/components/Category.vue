<template class="category">
  <el-col :span="18">
    <ul class="category">
      <span class="title">题目类型:</span>
      <li v-for="item in categoryList" :key="item.id">
        <span
          @click="categoryClick(item.id)"
          :class="{ is_active: activeItem == item.id }"
          >{{ item.category }}
        </span>
      </li>
    </ul>
  </el-col>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Category",
  props: {},
  setup() {
    const activeItem = ref(0);
    const categoryList = [
      { id: 0, category: "ALL" },
      { id: 1, category: "Web" },
      { id: 2, category: "Pwn" },
      { id: 3, category: "Reverse" },
      { id: 4, category: "Crypto" },
      { id: 5, category: "Misc" },
      { id: 6, category: "Other" },
    ];
    const categoryClick = (id: number) => {
      activeItem.value = id;
    };
    return { activeItem, categoryList, categoryClick };
  },
});
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
  .title:hover {
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
