<template>
    <el-card v-if="userInfo">
        <!-- <el-avatar :size="130" :src="userInfo?.avatar" /> -->
        <div class="username">{{ userInfo?.username }}</div>
        <span>{{ userInfo?.describe }}</span>
        <div class="button-box" v-if="store.getters['UserInfo/isUserSelf'](userInfo?.id)">
            <el-button type="primary" @click="changeProfilevisible = true">修改资料</el-button>
            <el-button type="primary" @click="changePasswordVisible = true">修改密码</el-button>
        </div>
        <el-divider />
        <el-row justify="space-between" class="user-info">
            <el-col :span="6" class="score">
                <div class="value">{{ userInfo?.total_score }}</div>
                <div>分数</div>
            </el-col>
            <el-col :span="6" class="solve">
                <div class="value">{{ userInfo?.solve_record?.length }}</div>
                <div>解题数</div>
            </el-col>
            <el-col :span="6" class="team">
                <el-link v-if="userInfo?.team" :href="'/team/' + userInfo?.team?.id" type="danger" class="value">{{
                    userInfo?.team?.name }}</el-link>
                <el-link type="danger" class="value" :underline="false" v-else>-</el-link>
                <div>团队</div>
            </el-col>
        </el-row>
    </el-card>
    <el-dialog v-model="changeProfilevisible" title="Warning" width="30%" align-center>
        <template #header="{ titleId }">
            <h3 :id="titleId">修改个人信息</h3>
        </template>
        <el-form label-width="100px">
            <el-form-item label="个人简介">
                <el-input v-model="userChangeInfo.describe" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="changeProfilevisible = false">取消</el-button>
                <el-button type="primary" @click="changeUserInfo">确认</el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="changePasswordVisible" title="Warning" width="30%" align-center>
        <template #header="{ titleId }">
            <h3 :id="titleId">修改密码</h3>
        </template>
        <el-form label-width="100px" ref="ruleFormRef" :model="passwordInfo" :rules="rules">
            <el-form-item label="原密码" prop="oldPassword">
                <el-input v-model="passwordInfo.oldPassword" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="修改密码" prop="newPassword">
                <el-input v-model="passwordInfo.newPassword" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model="passwordInfo.checkPassword" type="password" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="changePasswordVisible = false">取消</el-button>
                <el-button type="primary" @click="submitPasswordForm(ruleFormRef)">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, PropType } from 'vue'
import type { FormInstance } from 'element-plus'
import { useStore } from 'vuex'
import { IUserInfo } from '~/types'

export default defineComponent({
    name: 'UserProfile',
    props: {
        userInfo: {
            type: Object as PropType<IUserInfo>,
            default: () => {
                return {}
            }
        }
    },
    emits: ['changePassword', 'changeUserInfo'],
    components: {},
    setup(props, context) {
        const store = useStore()
        const changeProfilevisible = ref(false)
        const changePasswordVisible = ref(false)
        const ruleFormRef = ref<FormInstance>()
        const userChangeInfo = reactive({
            describe: ''
        })

        const methods = reactive({
            validateOldPassword: (rule: any, value: string, callback: Function) => {
                if (value === '') {
                    callback(new Error('请输入原密码'))
                } else if (!/^[\S]{5,15}$/.test(value)) {
                    callback(
                        new Error('用户名必须是字母或数字或可见特殊字符的组合,长度在[5,15]')
                    )
                } else {
                    callback()
                }
            },
            validateNewPassword(rule: any, value: string, callback: Function) {
                if (value === '') {
                    callback(new Error('请输入新密码'))
                } else if (!/^[\S]{5,15}$/.test(value)) {
                    callback(
                        new Error('用户名必须是字母或数字或可见特殊字符的组合,长度在[5,15]')
                    )
                } else {
                    if (state.passwordInfo.checkPassword !== '') {
                        if (!ruleFormRef.value) return
                        ruleFormRef.value.validateField('checkPassword', () => null)
                    }
                    callback()
                }
            },
            validateConfirmPassword(rule: any, value: string, callback: Function) {
                if (value === '') {
                    callback(new Error('请再次输入新密码以确认'))
                } else if (value !== state.passwordInfo.newPassword) {
                    callback(new Error('两次输入的密码不匹配'))
                } else {
                    callback()
                }
            },
            submitPasswordForm: (formEl: FormInstance | undefined) => {
                if (!formEl) return
                formEl.validate(valid => {
                    if (valid) {
                        changePasswordVisible.value = false
                        context.emit(
                            'changePassword',
                            store.state.UserInfo.id,
                            state.passwordInfo.oldPassword,
                            state.passwordInfo.newPassword
                        )
                    } else {
                        changePasswordVisible.value = false
                        return false
                    }
                })
            },
            changeUserInfo: () => {
                changeProfilevisible.value = false
                context.emit(
                    'changeUserInfo',
                    store.state.UserInfo.id,
                    userChangeInfo.describe
                )
            }
        })
        const state = reactive({
            passwordInfo: {
                oldPassword: '',
                newPassword: '',
                checkPassword: ''
            },
            rules: {
                oldPassword: [
                    { validator: methods.validateOldPassword, trigger: 'blur' }
                ],
                newPassword: [
                    { validator: methods.validateNewPassword, trigger: 'blur' }
                ],
                checkPassword: [
                    { validator: methods.validateConfirmPassword, trigger: 'blur' }
                ]
            }
        })
        return {
            store,
            ruleFormRef,
            userChangeInfo,
            changeProfilevisible,
            changePasswordVisible,
            ...toRefs(methods),
            ...toRefs(props),
            ...toRefs(state)
        }
    }
})
</script>

<style scoped lang="scss">
.username {
    font-size: 34px;
    font-weight: bolder;
    margin: 1rem 0;
    color: var(--el-color-black);
}

span {
    font-size: var(--el-font-size-medium);
}

.button-box {
    text-align: right;
}

.user-info {
    .score {
        color: var(--el-color-primary);
    }

    .solve {
        color: var(--el-color-success);
    }

    .team {
        color: var(--el-color-danger);
    }

    .value {
        font-weight: bolder;
        font-size: var(--el-font-size-extra-large);
        margin-bottom: 0.5rem;
    }
}
</style>
