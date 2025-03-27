<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import Header from "@/components/header.vue";
import {apiBankCard, apiBankList} from "../../../request/api";
import {showFailToast, showSuccessToast} from "vant";
import { useRouter } from "vue-router";
import {ref} from "vue";
const router = useRouter()
const active = ref(true)
const form = reactive({
  bank_name: '',
  branch_bank: '',
  card_number: '',
  real_name: ''
})
const AliForm = reactive({
  bank_name: '支付宝',
  card_number: '',
  real_name: ''
})
const bindBank = async()=>{
 if (active.value) {
   if (!form.bank_name) {
     showFailToast('请输入开户行')
     return
   }
   if (!form.real_name) {
     showFailToast('请输入开户人')
     return
   }
   if (!form.card_number) {
     showFailToast('请输入银行卡号')
     return
   }
   if (!form.branch_bank) {
     showFailToast('请输入开户行地址')
     return
   }
   await apiBankCard({...form})
 }else {
   if (!AliForm.real_name) {
     showFailToast('请输入姓名')
     return
   }
   if (!AliForm.card_number) {
     showFailToast('请输入支付宝账号')
     return
   }
    await apiBankCard({...AliForm})
  }
  showSuccessToast('绑定成功！')
  setTimeout(()=>{
    router.go(-1)
  },1000)
}
const bankList = ref([])
const AliList = ref([])
const getBankList = async()=>{
  const res = await apiBankList()
  bankList.value = res.data.list.filter(item => item.bank_name !== '支付宝')
  AliList.value = res.data.list.filter(item => item.bank_name === '支付宝')
  console.log(bankList.value)
}
onMounted(()=>{
  getBankList()
})
</script>

<template>
  <div class="bg-[#F2F2F2] md:pt-0 pt-[46px] md:mb-0 md:bg-[#F5F9FF] md:h-[100vh] relative">
    <template class="md:!hidden !block">
      <navBar :title="'绑定银行卡'" />
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="md:w-[1200px] md:!mx-auto md:!bg-white md:mt-[20px] md:rounded-2xl md:px-[24px]">
      <div class="md:!flex items-center hidden">
        <el-icon size="22px" class="ml-[20px] cursor-pointer" @click="$router.go(-1)"><IEpArrowLeftBold /></el-icon>
        <div class="text-[#333333] text-[14px] md:text-[18px] mx-auto font-bold px-[15px] md:py-[20px]">
          绑定卡号
        </div>
      </div>
    <div class="w-[240px] h-[36px] flex items-center mx-auto text-[14px] border-[#CECECE] border my-[25px] rounded-2xl overflow-hidden md:mt-[20px] md:mx-auto md:rounded-2xl cursor-pointer" style="line-height: 36px">
      <div class="w-[50%] text-center" :class="[active && 'bg-[#0077FF] text-white']" @click="active=!active">
        绑定卡号
      </div>
      <div class="w-[50%] text-center" :class="[!active && 'bg-[#0077FF] text-white']" @click="active=!active">
        绑定支付宝
      </div>
    </div>
    <div v-if="active" class="bg-white p-[10px] my-[20px] md:p-[25px] md:mt-[20px] md:mx-auto">
      <el-form :model="form"
               label-width="auto"
               :label-position="'top'"
               v-if="!bankList.length"
      >
        <el-form-item label="开户行">
          <el-input v-model="form.bank_name" class="!text-[12px]" size="large"  placeholder="请输入开户行"></el-input>
        </el-form-item>
        <el-form-item label="开户人">
          <el-input v-model="form.real_name" class="!text-[12px]" size="large" placeholder="请输入开户人"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="form.card_number" class="!text-[12px]" size="large" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="开户行地址">
          <el-input v-model="form.branch_bank" class="!text-[12px]" size="large" placeholder="请输入开户行地址"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="w-[100px] h-[36px] bg-[#0077FF] text-white text-[14px] text-center mx-auto rounded-xl cursor-pointer" style="line-height: 36px" @click="bindBank">确认绑定</div>
        </el-form-item>
      </el-form>
      <div v-else>
        <el-table
            :data="bankList"
            border style="width: 100%; table-layout: auto;" class="!text-[12px]"  :header-cell-style=" { 'text-align': 'center' }">
          <el-table-column
              prop="bank_name"
              label="银行名称"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="branch_bank"
              label="开户行"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="card_number"
              label="卡号"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="real_name"
              label="开户人"
              align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-else class="bg-white p-[10px] my-[20px] md:p-[25px] md:mt-[20px] md:mx-auto ">
      <el-form :model="AliForm"
               label-width="auto"
               :label-position="'top'"
               v-if="!AliList.length"
      >
        <el-form-item label="姓名">
          <el-input v-model="AliForm.real_name" class="!text-[12px]" size="large" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="支付宝账号">
          <el-input v-model="AliForm.card_number" class="!text-[12px]" size="large" placeholder="请输入支付宝账号"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="w-[100px] h-[36px] bg-[#0077FF] text-white text-[14px] text-center mx-auto rounded-xl cursor-pointer" style="line-height: 36px" @click="bindBank">确认绑定</div>
        </el-form-item>
      </el-form>
      <div v-else>
        <el-table
            :data="AliList"
            border style="width: 100%; table-layout: auto;" class="!text-[12px]"  :header-cell-style=" { 'text-align': 'center' }">
          <el-table-column
              prop="bank_name"
              label="银行名称"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="card_number"
              label="支付宝账号"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="real_name"
              label="姓名"
              align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>
