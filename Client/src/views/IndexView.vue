<template>
    <div class="index">
        <div class="title">Wellcome to CTFz</div>
        <el-link :underline="false" href="/challenges">Have a nice day</el-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IndexView',
})
</script>
<style scoped lang="scss">
.index {
    min-height: calc(100vh - 107px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 107px);

    .title {
        font-size: 120px;
        font-weight: bold;
    }

    .el-link {
        font-size: 70px;
        color: black;
        font-weight: bold;

        :hover {
            color: var(--el-color-primary-dark-2);
        }
    }
}
</style>
