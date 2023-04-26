<template>
    <div class="register">
        <el-form :model="registerForm" :rules="registerRules" status-icon ref="registerFormRef" label-width="120px"
            size="default">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model="registerForm.checkPassword" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleRegister(registerFormRef)">提交</el-button>
                <el-button @click="resetForm(registerFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { register } from '~/api'

export default defineComponent({
    name: 'RegisterView',
    components: {},
    setup() {
        const store = useStore()
        const router = useRouter()
        const registerFormRef = ref<FormInstance>()

        const methods = reactive({
            validateUsername: (rule: any, value: string, callback: Function) => {
                if (value === '') {
                    callback(new Error('请输入用户名'))
                } else if (!/^[a-zA-Z0-9]{5,15}$/.test(value)) {
                    callback(new Error('用户名必须是字母或数字的组合,长度在[5,15]'))
                } else {
                    callback()
                }
            },
            validatePassword(rule: any, value: string, callback: Function) {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else if (!/^[\S]{5,15}$/.test(value)) {
                    callback(
                        new Error('用户名必须是字母或数字或可见特殊字符的组合,长度在[5,15]')
                    )
                } else {
                    if (state.registerForm.checkPassword !== '') {
                        if (!registerFormRef.value) return
                        registerFormRef.value.validateField('checkPassword', () => null)
                    }
                    callback()
                }
            },
            validateConfirmPassword(rule: any, value: string, callback: Function) {
                if (value === '') {
                    callback(new Error('请再次输入密码以确认'))
                } else if (value !== state.registerForm.password) {
                    callback(new Error('两次输入的密码不匹配'))
                } else {
                    callback()
                }
            },
            handleRegister: (form: FormInstance | undefined) => {
                if (!form) return
                form.validate(valid => {
                    if (valid) {
                        console.log(state.registerForm.username)
                        console.log(state.registerForm.password)
                        register({
                            username: state.registerForm.username,
                            password: state.registerForm.password
                        }).then(
                            (response: any) => {
                                ElNotification.success({
                                    title: '注册成功',
                                    message: '欢迎进入CTFz'
                                })
                                store.dispatch('UserInfo/updateUserInfo', response.data)
                                router.replace('/')
                            },
                            (error: any) => {
                                ElNotification.error({ title: '注册失败', message: error })
                            }
                        )
                    } else {
                        return false
                    }
                })
            },
            resetForm: (form: FormInstance | undefined) => {
                if (!form) return
                form.resetFields()
            }
        })

        const state = reactive({
            registerForm: {
                username: '',
                password: '',
                checkPassword: ''
            },
            registerRules: {
                username: [{ validator: methods.validateUsername, trigger: 'blur' }],
                password: [{ validator: methods.validatePassword, trigger: 'blur' }],
                checkPassword: [
                    { validator: methods.validateConfirmPassword, trigger: 'blur' }
                ]
            }
        })
        return { registerFormRef, ...toRefs(state), ...toRefs(methods) }
    }
})
</script>
<style scoped lang="scss">
.register {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 107px);

    .el-form {
        width: 50%;
    }
}
</style>
