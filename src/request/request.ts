import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { closeToast } from 'vant';
import router from '../routes/index';
import { userStore } from '../store/user.store';
const baseURL = import.meta.env.MODE === 'development' ? import.meta.env.VITE_APP_BASE_API : '/api/v1'
console.log(baseURL)
const service = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 20000,
})
console.log(baseURL)
// 请求拦截器
service.interceptors.request.use((config: any) => {
    const user_store = userStore()
    config.headers['token'] = user_store.token
    return config
}, (error) => {
    // 错误抛到业务代码
    // error.data = {}
    // error.data.msg = '服务器异常，请联系管理员！'
    // return Promise.resolve(error)
})

// 响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
    closeToast()
    const user_store = userStore()
    const { data: { code, msg: message } } = response
    if (code === 10000) {
        ElMessage({
            type: 'error',
            message: '还未登录，请登录后再试！',
            grouping: true,
        });
        user_store.logout()
        router.push('/')
        return Promise.reject()
    }
    if (code != 0) {
        ElMessage({
            message: message,
            type: 'error',
            grouping: true,
        });
        return Promise.reject()
    }
    return response?.data || response
}, (error) => {
    closeToast()
    if (axios.isCancel(error)) {
        console.log('repeated request: ' + error.message)
    } else {
        // handle error code
        // 错误抛到业务代码
        error.data = {}
        error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
        ElMessage({
            message:error.data.msg,
            type: 'error',
            grouping: true,
        });
    }
    return Promise.reject(error)
})

export default service


