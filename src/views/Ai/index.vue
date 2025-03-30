<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import TabBar from "@/components/tabbar.vue";
import { ElMessage } from 'element-plus';
import {apiBet, apiBetRecord, apiGameDetail} from "@/request/api";
import { useRoute } from "vue-router";
import { userStore } from "@/store/user.store";
import { lotteryStore } from "@/store/item";
import { reactive, ref, watch, computed, onUnmounted} from "vue";
import Header from "@/components/header.vue";
import {apiPrizeList} from "../../request/api";
import {showSuccessToast} from "vant";
import { createWebSocket, websocketClose } from "@/scoket";
const user_store = userStore()
const store = lotteryStore()

const route = useRoute()
const itemsList = ref([])
const tableData = ref([])
const activeNum = ref(1)
const itemsText = ref('')
const selectType = ref([])
const num = ref(1)
const issueId = ref(null)
const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  toolbox: {
    feature: {
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  legend: {
    data: ['category', 'value']
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar'
    }
  ]
})
const prizeParams = reactive({
  game_id: route.params.id || 1,
  limit: 10
})
const prizeResult = ref([])
const resultShow = ref(false)
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
const pageParams = reactive({
  page: 1,
  page_size: 10
})
const total = ref(0)
const getGame = async (id)=>{
  const data = await apiGameDetail({game_id:id})
  const oddsNames = data.data.tend.map(item => item.odds_name);
  const counts = data.data.tend.map(item => item.count);
  option.value.xAxis.data = oddsNames
  option.value.series[0].data = counts
  itemsList.value = data.data.odds
  issueId.value = data.data.issue_id
}
// 游戏投注
const gameBet = async ()=>{
  if (!selectType.value.length) return ElMessage.error('请选择投注项')
  if (!activeNum.value) return ElMessage.error('请选择投注金额')
  if (!issueId.value) return ElMessage.error('获取期号失败')
  if (!user_store.balance || (activeNum.value * num.value > user_store.balance)) return ElMessage.error('余额不足')
  const res = await apiBet({
    game_id: Number(route.params.id),
    odds_id: selectType.value.join(','),
    issue_id: issueId.value,
    multiple: Number(num.value),
    amount: activeNum.value
  })
  if(res.code === 0){
   showSuccessToast({
      message: '投注成功',
      duration: 2500
   })
    selectType.value = []
    num.value = 1
    user_store.changeUserInfo()
  }
}
// 投注记录
const getBetRecord = async ()=>{
  const res = await apiBetRecord(pageParams)
  tableData.value = res.data.list
  total.value = res.data.page.total
}
const taskInfo = computed(() => store.prizeList);
watch(taskInfo, (val) => {
  if (val.time == 0) {
    getGame(route.params.id || 1)
    prizeParams.limit = 10
    getPrizeList()
  }
  if (val.result){
    itemsText.value = itemsList.value.find(i => i.id === val.result).name
  }
})

const getPrizeList = async () => {
  const res = await apiPrizeList({...prizeParams})
  prizeResult.value = res.data.list
  if (prizeParams.limit === 10) {
    itemsText.value = res.data.list[0].result
  }
}
const moreResult = () => {
  prizeParams.limit += 10
  getPrizeList()
}
onMounted(async ()=>{
  getGame(route.params.id || 1)
  getBetRecord()
  getPrizeList()
  await user_store.changeUserInfo()
  await createWebSocket(user_store.gameId, user_store.wsId)
})
const select=(item)=>{
  if (selectType.value.includes(item.id)) {
    selectType.value = selectType.value.filter(i => i !== item.id)
  } else {
    selectType.value.push(item.id)
  }
}
onUnmounted(() => {
  websocketClose()
}) 
</script>

<template>
  <div class="mb-[290px] h-[100vh] md:min-h-[100vh] md:pt-0 pt-[46px] md:mb-0 md:bg-[#F5F9FF]">
    <template class="md:!hidden !block">
      <navBar :title="'Ai布局'"/>
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="md:py-[20px]">
      <div class="bg-white p-[10px] my-[10px] md:p-[25px] md:mt-[20px] md:w-[1200px] md:mx-auto md:rounded-2xl">
        <div class="text-[18px] text-[#333] font-bold text-center">
          {{ user_store.gameName }}
        </div>
      <div class="px-[15px] mt-[20px]">
        <div class="h-[94px] bg-gradient-to-r from-[#009DFF] to-[#005EFF] rounded-[10px] md:!rounded-[0]">
          <div class="flex flex-col justify-around h-full px-[25px]">
            <div class="flex items-center">
              <span class="text-[14px] text-white">{{ issueId}}</span>
              <div class="px-[5px] py-[2px] text-[12px] text-center bg-[#FFEAEA] rounded-[5px] ml-[10px] leading-[20px]">
                {{ itemsText }}</div>
              <div class="px-[10px] py-[2px] text-[12px] text-[#0077FF] text-center bg-[#fff] rounded-[15px] !ml-[auto] leading-[24px] cursor-pointer" @click="resultShow = !resultShow">
                历史分红
              </div>
            </div>
            <div class="text-[14px] text-white">
              截止分红时间：<span class="text-[20px] text-[#FBFF00]">{{ formatTime(taskInfo.time || 0)  }}</span>
            </div>
          </div>
          <div class="md:h-[380px] h-[350px] w-full bg-[#F6F6F6] relative rounded-b-lg py-[20px]" style="z-index: 99" v-if="resultShow">
            <div class="flex justify-center items-center flex-col">
              <img src="@/assets/images/result_tit.png" alt="" class="md:w-[118px] w-[100px]">
              <div class="overflow-y-auto md:h-[290px] h-[250px] px-[20px]">
                <div class="pt-[10px] text-[12px] md:text-[14px] md:gap-[100px] gap-[30px] flex text-[#666666]" v-for="i in prizeResult" :key="i.id">
                  <span>{{i.issue_id}}</span>
                  <span>{{i.result}}</span>
                </div>
              </div>
              <div class="flex gap-[20px] mt-[10px]">
                <div class="w-[72px] h-[28px] flex justify-center cursor-pointer items-center border-[#449BFF] text-[#449BFF] border rounded-sm" @click="moreResult">
                  查看更多
                </div>
                <div class="w-[72px] h-[28px] flex justify-center cursor-pointer items-center border-[#FF2828] text-[#FF2828] border rounded-sm" @click="resultShow = false">
                  收起分红
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="h-[350px] mt-[20px] w-full" >
          <e-charts class="chart" :option="option" />
        </div>
        <div class="md:py-[20px]">
          <div class="text-[14px] text-[#333] md:text-[18px] font-bold text-center">
            {{ user_store.gameName }}
          </div>
          <div class="flex flex-wrap md:!gap-[20px] gap-[10px] mt-[30px] md:justify-center">
            <div class="text-[14px] bg-[#E9E9E9] cursor-pointer text-[#999] py-[10px] px-[15px] rounded-[10px]" v-for="(item,i) in itemsList" :class="[selectType.includes(item.id) ? '!bg-[#0077FF] text-white' : 'text-[14px]']"  :key="i" @click="select(item)">
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="flex-col px-[15px] py-[20px] md:flex hidden">
          <div class="flex items-center">
            <div class="text-[14px] bg-[#E9E9E9] text-[#999] py-[10px] px-[15px] rounded-[5px] flex items-center" :class="[activeNum == 1 && '!bg-[#0077FF] text-white']" @click="activeNum = 1">1元</div>
            <div class="text-[14px] bg-[#E9E9E9] text-[#999] py-[10px] px-[15px] rounded-[5px] flex items-center ml-[10px]" :class="[activeNum == 2 && '!bg-[#0077FF] text-white']"  @click="activeNum = 2">2元</div>
            <div class="flex items-center ml-[18px] gap-[4px]">
              <el-input v-model="num"  class="!w-[80px] !text-center"/> 手
            </div>
          </div>
          <div class="flex mt-[25px] items-center w-full">
            <div class="text-[14px] text-[#666]">
              已选：<span class="text-[#FF2828] text-[16px]">{{ num }}</span> 手
            </div>
            <div class="text-[14px] text-[#666] ml-[10px]">
              共计：<span class="text-[#FF2828] text-[16px]">{{ num * activeNum }}</span> 元
            </div>
            <div class="!ml-auto">
              <el-button type="primary" class="!h-[50px] !w-[150px]" @click="gameBet">确认布局</el-button>
            </div>
            <div @click="$router.push('/mine/transactionHistory')" class="text-[#0077FF] text-[14px] ml-[20px] cursor-pointer">
              布局记录
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="fixed bottom-[50px] px-[15px] w-full py-[25px] bg-white md:hidden block">
      <div class="flex items-center">
        <div class="text-[14px] bg-[#E9E9E9] text-[#999] py-[10px] px-[15px] rounded-[5px] flex items-center" :class="[activeNum == 1 && '!bg-[#0077FF] text-white']" @click="activeNum = 1">1元</div>
        <div class="text-[14px] bg-[#E9E9E9] text-[#999] py-[10px] px-[15px] rounded-[5px] flex items-center ml-[10px]" :class="[activeNum == 2 && '!bg-[#0077FF] text-white']"  @click="activeNum = 2">2元</div>
        <div class="flex items-center ml-[18px] gap-[4px]">
          <el-input v-model="num"  class="!w-[80px] !text-center"/> 手
        </div>
        <div class="text-[#0077FF] text-[14px] !ml-auto" @click="$router.push('/mine/transactionHistory')">
          布局记录
        </div>
      </div>
      <div class="flex mt-[25px] items-center w-full">
        <div class="text-[14px] text-[#666]">
          总手数：<span class="text-[#FF2828] text-[16px]">{{ num }}</span> 手
        </div>
        <div class="text-[14px] text-[#666] ml-[10px]">
          总金额：<span class="text-[#FF2828] text-[16px]">{{ num * activeNum }}</span> 元
        </div>
        <div class="!ml-auto">
          <el-button type="primary" class="!h-[50px] !w-[150px]" @click="gameBet">确认布局</el-button>
        </div>
      </div>
    </div>
    <TabBar :active="2"/>
  </div>
</template>

<style scoped>

</style>
