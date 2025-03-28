<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import Header from "@/components/header.vue";
import {apiWithdraw} from "../../request/api";
import {userStore} from "../../store/user.store";
import {showFailToast, showSuccessToast} from "vant";
import { useRouter } from "vue-router";
const router = useRouter()

const state = userStore()
const form = reactive({
  name: 'test122',
  money: state.userInfo.balance,
  amount: '',
  withdraw_password: '',
  type: 1
})
const options = [
  {
    value: 2,
    label: '银行卡'
  },
  {
    value: 1,
    label: '支付宝'
  }
]
const submit = async ()=>{
  if (!form.amount) {
    showFailToast('请输入提款金额')
    return
  }
  if (!form.withdraw_password) {
    showFailToast('请输入提款密码')
    return
  }
  if (form.money < form.amount) {
    showFailToast('提款金额不能大于可提款金额')
    return
  }
  const params = {
    amount: form.amount,
    withdraw_password: form.withdraw_password,
    type: form.type
  }
   await apiWithdraw({...params})
  showSuccessToast('已发起申请')
  setTimeout(()=>{
    router.go(-1)
  },1000)
}
</script>

<template>
  <div class="bg-[#F2F2F2] md:pt-0 pt-[46px] md:mb-0 md:bg-[#F5F9FF] relative md:h-[100vh]">
    <template class="md:!hidden !block">
      <navBar :title="'提现'" />
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="md:w-[1200px] md:!mx-auto md:!bg-white md:mt-[20px] md:rounded-2xl md:px-[24px]">
      <div class="md:!flex items-center hidden">
        <el-icon size="22px" class="ml-[20px] cursor-pointer" @click="$router.go(-1)"><IEpArrowLeftBold /></el-icon>
        <div class="text-[#333333] text-[14px] md:text-[18px] mx-auto font-bold px-[15px] md:py-[20px]">
          提现
        </div>
      </div>
    <div class="bg-white p-[10px] my-[10px] md:p-[25px] md:mt-[20px]">
      <el-form :model="form"
               label-width="auto"
               :label-position="'top'">
        <el-form-item label="用户名">
          <el-input v-model="form.name" class="!text-[12px]" size="large" disabled ></el-input>
        </el-form-item>
        <el-form-item label="可提款金额">
          <el-input v-model="form.money" class="!text-[12px]" size="large" disabled placeholder="" :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')">
            <template #prepend>￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="提款金额">
          <el-input v-model="form.amount" class="!text-[12px]" size="large"  placeholder="输入提款金额" :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')">
            <template #prepend>￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="提款密码">
          <el-input v-model="form.withdraw_password" class="!text-[12px]" size="large" show-password type="password"  placeholder="请输入提款密码"></el-input>
        </el-form-item>
        <el-form-item label="收款方式">
          <el-select v-model="form.type" placeholder="Select" style="width: 100%" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="w-[100px] h-[36px] bg-[#0077FF] text-white text-[14px] text-center mx-auto rounded-xl cursor-pointer" style="line-height: 36px" @click="submit">确认</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>
