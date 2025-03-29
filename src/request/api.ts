import request from './request'
import { convertObjectToQuery } from '@/utils'

// 网站配置
export const apiConfig = () => request.get('/config')
// 用户注册
export const apiRegister = (data) => request.post('/register', data)
// 用户登录
export const apiLogin = (data) => request.post('/login', data)
// 用户信息
export const apiUserInfo = () => request.get('/member/info')
// 退出登录
export const apiLogout = () => request.post('/logout')
// 首页banner
export const apiBanner = (params) => request.get('/index', {params})
// game list
export const apiGameList = () => request.get('/game/list')
// game detail
export const apiGameDetail = (data) => request.get('/game/index'+ convertObjectToQuery(data))
// 投注
export const apiBet = (data) => request.post('/game/bet', data)
// 投注记录
export const apiBetRecord = (params) => request.get('/game/order', {params})
// 链接id
export const apiGameId = () => request.get('/getConnect')
// 银行卡绑定
export const apiBankCard = (data) => request.post('/member_bank/create', data)
// 获取账单列表
export const apiBillList = (params) => request.get('/trade/page_list', {params})
// 获取账单类型
export const apiBillType = () => request.get('/trade/type')

// 修改用户信息
export const apiUpdateUserInfo = (data) => request.post('/member/update', data)

// 获取充值记录
export const apiRechargeList = (params) => request.get('/recharge/page_list', {params})

// 获取提现记录
export const apiWithdrawList = (params) => request.get('/withdraw/page_list', {params})
// 获取用户报表
export const apiReport = (params) => request.get('/member/report', {params})
// 获取银行卡列表
export const apiBankList = () => request.get('/member_bank/list')
// 修改登录密码
export const apiUpdatePassword = (data) => request.post('/member/update_password', data)
// 修改资金密码
export const apiUpdatePayPassword = (data) => request.post('/member/update_pay_password', data)
// 提现申请
export const apiWithdraw = (data) => request.post('/withdraw/create', data)

// 获取站内信
export const apiMessageList = (params) => request.get('/message/page_list', {params})

// 开奖信息
export const apiPrizeList = (params) => request.get('/game/result', {params})

// 创建下级
export const agentCreateApi = (data) => request.post('/agent/create', data)
// 代理总览
export const agentDashboardApi = (params) => request.get('/agent/dashboard', {params})
// 代理首页
export const agentIndexdApi = (params) => request.get('/agent/index', {params})
// 下级投注记录
export const agentRecordApi = (params) => request.get('/agent/record', {params})
// 下级报表
export const agentReportApi = (params) => request.get('/agent/report', {params})
// 下级账变记录
export const agentTradeApi = (params) => request.get('/agent/trade', {params})
// 下级提现记录
export const agentWithdrawApi = (params) => request.get('/agent/withdraw', {params})
// 公告列表
export const noticeListApi = (params) => request.get('/notice/page_list', {params})
// 撤单
export const cancelOrderApi = (data) => request.post('/game/order/cancel', data)
