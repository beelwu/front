<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import Header from "@/components/header.vue";
import {apiReport} from "../../../request/api";
import {onMounted, reactive} from "vue";
import {formatDate, priceFormat} from "../../../utils";
// 获取当前月份
const currentMonth = ref(new Date().getMonth());
// 获取当前年份
const currentYear = ref(new Date().getFullYear());
// 获取当前日期
const currentDay = ref(new Date().getDate());
const startDate = ref([currentYear.value, currentMonth.value+1, currentDay.value]);
const endDate = ref([currentYear.value, currentMonth.value+1, currentDay.value]);
const minDate = ref(new Date(2020, 0, 1));
const maxDate = ref(new Date(currentYear.value, currentMonth.value, currentDay.value));
const openData = ref(false);
const openEndData = ref(false);
const params = reactive({
  start_time:'',
  end_time:''
})
const reportData = ref({
  bet_amount: 0,
  bet_reward_amount: 0,
  bet_win: 0,
  activity_reward_amount: 0,
  discount_amount: 0,
  register_count: 0,
  recharge_amount: 0,
  withdraw_amount: 0
})
const getData = () => {
  openData.value = false;
}
const getReport = async () => {
  const res = await apiReport({...params})
  reportData.value = res.data
}
onMounted(() => {
  getReport()
})

</script>

<template>
  <div class="bg-[#F2F2F2] md:pt-0 pt-[46px] md:h-[100vh] md:mb-0 md:bg-[#F5F9FF] relative">
    <template class="md:!hidden !block">
      <navBar :title="'个人报表'" />
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="md:w-[1200px] md:!mx-auto md:!bg-white md:mt-[20px] md:rounded-2xl md:px-[24px]">
      <div class="md:!flex items-center hidden">
        <el-icon size="22px" class="ml-[20px] cursor-pointer" @click="$router.go(-1)"><IEpArrowLeftBold /></el-icon>
        <div class="text-[#333333] text-[14px] md:text-[18px] mx-auto font-bold px-[15px] md:py-[20px]">
          个人报表
        </div>
      </div>
      <div class="p-[10px] bg-white my-[10px] flex flex-col md:flex-row md:mt-[20px] items-center md:!justify-start justify-around md:mx-auto ">
        <div class="flex justify-around md:justify-normal items-center">
          <div class="bg-[#F4F4F4] text-[#333333] border-[#D2D2D2] border rounded-sm px-[10px] h-[36px] text-[14px] text-center" style="line-height: 36px" @click="openData=true">
            {{formatDate(startDate)}}
          </div>
          <div class="text-[20px] px-[10px]"> — </div>
          <div class="bg-[#F4F4F4] text-[#333333] border-[#D2D2D2] border rounded-sm px-[10px] h-[36px] text-[14px] text-center" style="line-height: 36px" @click="openEndData=true">
            {{formatDate(endDate)}}
          </div>
        </div>
        <div class="text-[#fff] bg-gradient-to-r from-[#009DFF] to-[#005EFF] mt-[10px] md:!mt-0  rounded-xl w-[180px] mx-auto md:!mx-0 md:!ml-[30px] h-[36px] text-[14px] text-center" style="line-height: 36px" @click="searchTime">
          查询
        </div>
      </div>
      <el-divider />
      <div class="py-[20px] px-[10px] md:!pt-0 md:!px-0 mb:!pb-[20px] bg-white md:mx-auto md:rounded-2xl">
      <div class="text-[14px] flex justify-between items-end">
        个人报表
        <span class="text-[12px] text-[#999]">
          盈亏计算为，分红总额-布局总额=总盈亏
        </span>
      </div>
      <van-cell-group class="mt-[20px]">
        <van-cell title="布局金额" :value="'¥' + priceFormat(reportData.bet_amount)" />
        <van-cell title="布局返点" :value="'¥' + priceFormat(reportData.bet_reward_amount)" />
        <van-cell title="盈利金额" :value="'¥' + priceFormat(reportData.bet_win)" />
        <van-cell title="活动奖励" :value="'¥' + priceFormat(reportData.activity_reward_amount)" />
        <van-cell title="优惠金额" :value="'¥' + priceFormat(reportData.discount_amount)" />
        <van-cell title="直推人数" :value="'¥' + priceFormat(reportData.register_count)" />
        <van-cell title="团队充值" :value="'¥' + priceFormat(reportData.recharge_amount)" />
        <van-cell title="团队提现" :value="'¥' + priceFormat(reportData.withdraw_amount)" />
      </van-cell-group>
    </div>
      <div class="absolute bottom-0 w-full md:w-[1200px]">
        <van-date-picker
            v-model="startDate"
            title="选择日期"
            v-if="openData"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="openData=false"
            @cancel="openData=false"
        />
      </div>
      <div class="absolute bottom-0 w-full md:w-[1200px]">
        <van-date-picker
            v-model="endDate"
            title="选择日期"
            v-if="openEndData"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="openEndData=false"
            @cancel="openEndData=false"
        />
      </div>
  </div>
  </div>
</template>

<style scoped>

</style>
