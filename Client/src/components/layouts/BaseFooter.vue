<template>
    <div class="footer">
        <div class="footer-copyright">
            <el-link href="https://github.com/Zephyrccc">
                Build By Zephyr
            </el-link>
            <span>
                2022-2023 © CTFz All Rights Reserved.
            </span>
            <span>
                version：0.5
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
    name: 'BaseFooter',
    setup() {
        return {
        }
    }
})
</script>

<style scoped lang="scss">
.footer {
    width: 75%;
    margin: 0px auto;
    max-width: 1350px;
    min-width: 1100px;

    .footer-copyright {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: var(--el-text-color-regular);
    }
}
</style>
