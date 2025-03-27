import { defineStore } from 'pinia'
import {apiLogout, apiUserInfo, apiConfig, apiGameId,apiGameList} from "../request/api";
import {showToast} from "vant";
export const userStore: any = defineStore('user', {
    // 持久化
    persist: true,
    state: () => {
        return {
            token: "",
            balance: 0,
            wsId:'',
            prizeList: {},
            gameId: 0,
            gameName:'',
            userInfo: {
                balance: 0,
                id: 0,
                invite_code: '',
                withdraw_password: 0,
                username: '',
                mobile: '',
                nickname: '',
                status: 0,
            },
            config: {},
            socketStatus:false
        }
    },
    getters: {},
    actions: {
        // 更新个人信息
        async changeUserInfo() {
            if (this.token === '') return
            const { data } = await apiUserInfo()
            this.userInfo = data
            this.balance = data.balance
            const res = await apiGameId()
            this.wsId = res.data
            const id = await apiGameList()
            this.gameId= id.data.list[0].id
            this.gameName= id.data.list[0].name
        },
        // 获取系统配置
        async changeConfig() {
            const { data } = await apiConfig()
            this.config = data
        },
        // socket连接状态
        changeSocket(data){
            this.prizeList = data
            console.log(this.prizeList,"接收到的数据")
        },
        // 退出登录
        logout() {
            this.balance = 0
            this.token = ''
            this.userInfo = {}
            showToast('退出成功')
        },
    }
})
