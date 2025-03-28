<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import TabBar from "@/components/tabbar.vue";
import { ElMessage, ElForm,ElFormItem } from 'element-plus';
import { agentRecordApi, agentReportApi, agentDashboardApi, agentIndexdApi, agentTradeApi, agentWithdrawApi, agentCreateApi } from "@/request/api";
import { reactive, ref } from "vue";
import Header from "@/components/header.vue";
import { isMobile } from "../../utils";

// 代理总览
const dashboardData = ref({})
const getDashboardData = async () => {
  const res = await agentDashboardApi()
  dashboardData.value = res.data
}

// 代理首页
const indexParams = reactive({
  page: 1,
  page_size: 10
})
const indexTotal = ref(0)
const agentData = ref([])
const getAgentIndex = async () => {
  const res = await agentIndexdApi(indexParams)
  agentData.value = res.data.list
  indexTotal.value = res.data.page.total
}
const changeIndexPage = (val) => {
  indexParams.page = val
  getAgentIndex()
}

// 下级投注记录
const recordParams = reactive({
  page: 1,
  page_size: 10
})
const recordTotal = ref(0)
const recordData = ref([])
const getRecordData = async () => {
  const res = await agentRecordApi(recordParams)
  recordData.value = res.data.list
  recordTotal.value = res.data.page.total
}
const changeRecordPage = (val) => {
  recordParams.page = val
  getRecordData()
}

// 下级报表
const reportParams = reactive({
  page: 1,
  page_size: 10
})
const reportTotal = ref(0)
const reportData = ref([])
const getReportData = async () => {
  const res = await agentReportApi(reportParams)
  reportData.value = res.data.list
  reportTotal.value = res.data.page.total
}
const changeReportPage = (val) => {
  reportParams.page = val
  getReportData()
}

// 下级账变记录
const tradeParams = reactive({
  page: 1,
  page_size: 10
})
const tradeTotal = ref(0)
const tradeData = ref([])
const getTradeData = async () => {
  const res = await agentTradeApi(tradeParams)
  tradeData.value = res.data.list
  tradeTotal.value = res.data.page.total
}
const changeTradePage = (val) => {
  tradeParams.page = val
  getTradeData()
}

// 下级提现记录
const withdrawParams = reactive({
  page: 1,
  page_size: 10
})
const withdrawTotal = ref(0)
const withdrawData = ref([])
const getWithdrawData = async () => {
  const res = await agentWithdrawApi(withdrawParams)
  withdrawData.value = res.data.list
  withdrawTotal.value = res.data.page.total
}
const changeWithdrawPage = (val) => {
  tradeParams.page = val
  getWithdrawData()
}


// 创建下级
const formRef = ref()
const dialogVisible = ref(false)
const formData = reactive({
  username: '',
  is_agent: '',
  password: '',
  re_password: '',
  rebate_rate: '',
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  re_password: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    } // 校验确认密码
  ],
  rebate_rate: [
    { required: true, message: '请输入返点', trigger: 'blur' },
    { type: 'number', min: 0, message: '返点必须为数字且大于等于 0', trigger: 'blur' }
  ],
  is_agent: [
    { required: true, message: '请选择是否代理', trigger: 'blur' }
  ]
}
const handleAgeAntCreate = () => {
  dialogVisible.value = true
  formData.username = ''
  formData.is_agent = ''
  formData.password = ''
  formData.re_password = ''
  formData.rebate_rate = ''
}

const confirmCreate = (formEl) => {
  formEl.validate(valid => {
    if (valid) {
      agentCreateApi(formData).then(res => {
        console.log("🚀 ~ agentCreateApi ~ res:", res)
        if (res.code === 0) {
          ElMessage.success('创建成功')
          dialogVisible.value = false
          getAgentIndex()
        }
      })
    }
  })
}

onMounted(() => {
  getDashboardData()
  getAgentIndex()
  getRecordData()
  getReportData()
  getTradeData()
  getWithdrawData()
})
</script>

<template>
  <div class="mb-[290px] h-[100vh] md:min-h-[100vh] md:pt-0 pt-[46px] md:mb-0 md:bg-[#F5F9FF]">
    <template class="md:!hidden !block">
      <navBar :title="'代理统计'" />
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="md:py-[20px]">
      <div class="bg-white p-[10px] my-[10px] md:p-[25px] md:mt-[20px] md:w-[1200px] md:mx-auto md:rounded-2xl">

        <div class="mb-[30px]">
          <div class="text-[18px] text-[#333] font-bold text-center mb-[20px]">
            代理总览
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div
              class="flex items-center bg-gradient-to-t from-[#E2F0FF] to-[#F3F8FD] flex-col gap-[8px] rounded-xl  justify-center  h-[84px] shadow">
              <div class="text-center">在线总数</div>
              <div class="text-center text-gray-500 mt-2">{{ dashboardData.online }}</div>
            </div>
            <div
              class="flex items-center bg-gradient-to-t from-[#E2F0FF] to-[#F3F8FD] flex-col gap-[8px] rounded-xl  justify-center  h-[84px] shadow">
              <div class="text-center">团队余额</div>
              <div class="text-center text-gray-500 mt-2">{{ dashboardData.team_balance }}</div>
            </div>
            <div
              class="flex items-center bg-gradient-to-t from-[#E2F0FF] to-[#F3F8FD] flex-col gap-[8px] rounded-xl  justify-center  h-[84px] shadow">
              <div class="text-center">所有下线人数</div>
              <div class="text-center text-gray-500 mt-2">{{ dashboardData.all_child }}</div>
            </div>
            <div
              class="flex items-center bg-gradient-to-t from-[#E2F0FF] to-[#F3F8FD] flex-col gap-[8px] rounded-xl  justify-center  h-[84px] shadow">
              <div class="text-center">用户名</div>
              <div class="text-center text-gray-500 mt-2">{{ dashboardData.username }}</div>
            </div>
            <div
              class="flex items-center bg-gradient-to-t from-[#E2F0FF] to-[#F3F8FD] flex-col gap-[8px] rounded-xl  justify-center  h-[84px] shadow">
              <div class="text-center">昵称</div>
              <div class="text-center text-gray-500 mt-2">{{ dashboardData.nickname || '-' }}</div>
            </div>
            <div
              class="flex items-center bg-gradient-to-t from-[#E2F0FF] to-[#F3F8FD] flex-col gap-[8px] rounded-xl  justify-center  h-[84px] shadow">
              <div class="text-center">余额</div>
              <div class="text-center text-gray-500 mt-2">{{ dashboardData.balance }}</div>
            </div>
            <div
              class="flex items-center bg-gradient-to-t from-[#E2F0FF] to-[#F3F8FD] flex-col gap-[8px] rounded-xl  justify-center  h-[84px] shadow">
              <div class="text-center">是否代理</div>
              <div class="text-center text-gray-500 mt-2">{{ dashboardData.is_agent === 0 ? '用户' : '代理' }}</div>
            </div>
            <div
              class="flex items-center bg-gradient-to-t from-[#E2F0FF] to-[#F3F8FD] flex-col gap-[8px] rounded-xl  justify-center  h-[84px] shadow">
              <div class="text-center">直属下线人数</div>
              <div class="text-center text-gray-500 mt-2">{{ dashboardData.child }}</div>
            </div>
          </div>

        </div>
        <el-divider />

        <div class="md:py-[20px] mb-[30px]">
          <div class="text-[18px] text-[#333] md:text-[18px] font-bold text-center mb-[20px]">
            代理首页
          </div>
          <div class="mb-[12px]">
            <el-button type="primary" @click="handleAgeAntCreate">创建下级</el-button>
          </div>
          <el-table :data="agentData" border stripe style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180" />
            <el-table-column prop="balance" label="余额" />
            <el-table-column prop="rebate_rate" label="返点比例" />
            <el-table-column prop="is_agent" label="是否代理">
              <template #default="{ row }">
                <span>{{ row.is_agent === 1 ? '代理' : '用户' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="is_online" label="是否在线">
              <template #default="{ row }">
                <span>{{ row.is_online === 1 ? '在线' : '离线' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <span>{{ row.status === 1 ? '正常' : '禁用' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="reg_time" label="注册时间" />
          </el-table>
          <van-pagination class="mt-[10px]" v-model="indexParams.page" :page-count="indexTotal" mode="simple"
            @change="changeIndexPage" />
        </div>
        <el-divider />
        <div class="md:py-[20px] mb-[30px]">
          <div class="text-[18px] text-[#333] md:text-[18px] font-bold text-center mb-[20px]">
            下级投注记录
          </div>
          <el-table :data="recordData" border stripe style="width: 100%">
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="bet_amount" label="投注金额" />
            <el-table-column prop="win_amount" label="赢亏金额" />
            <el-table-column prop="issue_id" label="期号" />
            <el-table-column prop="game_name" label="游戏名称" />
            <el-table-column prop="odds_name" label="投注内容" />
            <el-table-column prop="result_name" label="开奖内容" />
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <span>{{ row.status === 1 ? '已开奖' : '未开奖' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="投注时间" />
          </el-table>
          <van-pagination class="mt-[10px]" v-model="recordParams.page" :page-count="recordTotal" mode="simple"
            @change="changeRecordPage" />
        </div>
        <el-divider />
        <div class="md:py-[20px] mb-[30px]">
          <div class="text-[18px] text-[#333] md:text-[18px] font-bold text-center mb-[20px]">
            下级报表
          </div>
          <el-table :data="reportData" border stripe style="width: 100%">
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="bet_amount" label="投注金额" />
            <el-table-column prop="commission_amount" label="佣金" />
            <el-table-column prop="rebate_amount" label="返点金额" />
            <el-table-column prop="recharge_amount" label="充值金额" />
            <el-table-column prop="win_amount" label="赢亏金额" />
            <el-table-column prop="withdraw_amount" label="提现金额" />
          </el-table>
          <van-pagination class="mt-[10px]" v-model="reportParams.page" :page-count="reportTotal" mode="simple"
            @change="changeReportPage" />
        </div>
        <el-divider />
        <div class="md:py-[20px] mb-[30px]">
          <div class="text-[18px] text-[#333] md:text-[18px] font-bold text-center mb-[20px]">
            下级账变记录
          </div>
          <el-table :data="tradeData" border stripe style="width: 100%">
            <el-table-column prop="username" label="用户名" width="180" />
            <el-table-column prop="type_name" label="名称" />
            <el-table-column prop="amount" label="金额" />
            <el-table-column prop="before" label="账变前余额" />
            <el-table-column prop="after" label="账变后余额" />
            <el-table-column prop="create_time" label="账变时间" />
          </el-table>
          <van-pagination class="mt-[10px]" v-model="tradeParams.page" :page-count="tradeTotal" mode="simple"
            @change="changeTradePage" />
        </div>
        <el-divider />
        <div class="md:py-[20px] mb-[30px]">
          <div class="text-[18px] text-[#333] md:text-[18px] font-bold text-center mb-[20px]">
            下级提现记录
          </div>
          <el-table :data="withdrawData" border stripe style="width: 100%">
            <el-table-column prop="order_sn" label="订单号" />
            <el-table-column prop="username" label="用户名" width="180" />
            <el-table-column prop="amount" label="提现金额" />
            <el-table-column prop="bank_name" label="银行名称" />
            <el-table-column prop="branch_bank" label="开户行" />
            <el-table-column prop="card_number" label="卡号" />
            <el-table-column prop="real_name" label="开户人" />
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <span>{{ row.status === 1 ? '正常' : '禁用' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" />
          </el-table>
          <van-pagination class="mt-[10px]" v-model="withdrawParams.page" :page-count="withdrawTotal" mode="simple"
            @change="changeWithdrawPage" />
        </div>
      </div>
    </div>

    <el-dialog title="创建下级" v-model="dialogVisible" :width="isMobile() ? '80%' : '40%'" class="h-[560px]" center
      :show-close="false" lock-scroll :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto" :label-position="'top'">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" class="!text-[12px]" size="large" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" class="!text-[12px]" size="large" placeholder="请输入密码"
            show-password></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="re_password">
          <el-input v-model="formData.re_password" class="!text-[12px]" size="large" placeholder="请输入再次输入密码"
            show-password></el-input>
        </el-form-item>
        <el-form-item label="是否代理" prop="is_agent">
          <el-select v-model="formData.is_agent" class="!text-[12px]" size="large" placeholder="请选择是否代理">
            <el-option label="代理" :value="1"></el-option>
            <el-option label="用户" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="返点" prop="rebate_rate">
          <el-input-number v-model="formData.rebate_rate" class="!text-[12px] !w-full" size="large" placeholder="请输入返点"
            :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCreate(formRef)">确 定</el-button>
      </div>
    </el-dialog>

    <TabBar :active="4" />
  </div>
</template>

<style scoped></style>
