// 根据process.env.NODE_ENV 区分
// 开发环境: development
// 生成环境：production

let BASE_URL = ''

const TIME_OUT = 30000

if (process.env.NODE_ENV === 'development') {
    // 这里BASE_URL 后地址根据实际项目服务器地址填写，这里是示例
    BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'http://127.0.0.1/api'
} else {
    BASE_URL = 'http://127.0.0.1:8000'
}
export { BASE_URL, TIME_OUT }
