<script setup lang="ts">
import PcHeader from "@/components/pcHeader.vue";
import navBar from "@/components/navBar.vue";
import Header from "@/components/header.vue";
import {apiRechargeList} from "../../../request/api";
import {reactive} from "vue";
import {dateFormat, formatDate} from "../../../utils";
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
  page: 1,
  page_size: 10,
  status: '',
  start_time:'',
  end_time:''
})
const total = ref(0)
// 获取充值列表
const getRechargeList = async () => {
  const res = await apiRechargeList({...params})
  tableData.value = res.data.list
  total.value = res.data.page.total
}
const tableData = ref([])
const searchTime= ()=>{
  params.page = 1
  params.start_time = formatDate(startDate.value)
  params.end_time = formatDate(endDate.value)
  getRechargeList()
}
const issue = ref('1')
const options = ref([
  {
    value: '1',
    label: '审核中'
  },
  {
    value: '2',
    label: '通过'
  },
  {
    value: '3',
    label: '驳回'
  }
])
const changePage = (val)=>{
  params.page = val
  getRechargeList()
}
const changeStatus = (val)=>{
  params.status = val
  params.page = 1
  getRechargeList()
}
onMounted(() => {
  getRechargeList()
})
</script>

<template>
  <div class="bg-[#F2F2F2] md:pt-0 pt-[46px] md:!h-[100vh] md:mb-0 md:bg-[#F5F9FF] h-[100vh] relative">
    <template class="md:!hidden !block">
      <navBar :title="'资金记录'" />
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="md:w-[1200px] md:!mx-auto md:!bg-white md:mt-[20px] md:rounded-2xl md:px-[24px]">
      <div class="md:!flex items-center hidden">
        <el-icon size="22px" class="ml-[20px] cursor-pointer" @click="$router.go(-1)"><IEpArrowLeftBold /></el-icon>
        <div class="text-[#333333] text-[14px] md:text-[18px] mx-auto font-bold px-[15px] md:py-[20px]">
          充值记录
        </div>
      </div>
      <div class="p-[10px] bg-white my-[10px] flex flex-col md:flex-row md:mt-[20px] items-center md:!justify-start justify-around md:mx-auto ">
        <div class="flex justify-around md:justify-normal items-center">
          <div class="bg-[#F4F4F4] text-[#333333] border-[#D2D2D2] border rounded-sm px-[10px] h-[36px] text-[14px] text-center" style="line-height: 36px" @click="openData=true">
            {{ formatDate(startDate) }}
          </div>
          <div class="text-[20px] px-[10px]"> — </div>
          <div class="bg-[#F4F4F4] text-[#333333] border-[#D2D2D2] border rounded-sm px-[10px] h-[36px] text-[14px] text-center" style="line-height: 36px" @click="openEndData=true">
            {{ formatDate(endDate) }}
          </div>
        </div>
        <div class="text-[#fff] bg-gradient-to-r from-[#009DFF] to-[#005EFF] mt-[10px] md:!mt-0  rounded-xl w-[180px] mx-auto md:!mx-0 md:!ml-[30px] h-[36px] text-[14px] text-center" style="line-height: 36px" @click="searchTime">
          查询
        </div>
      </div>
      <el-divider />
      <div class="py-[20px] px-[10px] md:!pt-0 md:!px-0 mb:!pb-[20px]  bg-white md:mx-auto md:rounded-2xl ">
        <div class="flex justify-between">
          <el-select
              v-model="params.status"
              placeholder="请选择订单状态"
              class="md:!w-[120px] !w-[100px]"
              @change="changeStatus"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
<!--          <el-input v-model="searchData" style="width: 120px" placeholder="">-->
<!--            <template #prefix>-->
<!--              <el-icon class="el-input__icon">-->
<!--                <IEpSearch />-->
<!--              </el-icon>-->
<!--            </template>-->
<!--          </el-input>-->
        </div>
        <el-table
            :data="tableData"
            border style="width: 100%; table-layout: auto;" :height="tableData.length ? '500' : 'auto'" class="mt-[20px] !text-[12px] " empty-text="暂无充值记录" :header-cell-style=" { 'text-align': 'center' }">
          <el-table-column
              prop="create_time"
              label="时间"
              align="center"
          >
            <template #default="{row}">
              <span>{{ dateFormat(row.create_time) }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="order_sn"
              label="订单号"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="method"
              label="充值类别"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="amount"
              label="充值金额"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态"
              align="center"
          >
            <template #default="{row}">
              <el-tag v-if="row.status == 1" type="info">审核中</el-tag>
              <el-tag v-if="row.status == 2" type="success">通过</el-tag>
              <el-tag v-if="row.status == 3" type="danger">驳回</el-tag>
            </template>
          </el-table-column>
         <el-table-column
              prop="remark"
              label="备注"
              align="center"
         >
          </el-table-column>
          <el-table-column
              prop="update_time"
              label="审核时间"
              align="center"
          >
            <template #default="{row}">
              <span>{{ dateFormat(row.update_time) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <van-pagination class="mt-[10px]" v-model="params.page" :page-count="total" mode="simple" @change="changePage" />
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
:deep(.el-table__header-wrapper){
  overflow: auto !important;
}
</style>
