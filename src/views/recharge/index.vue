<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import TabBar from "@/components/tabbar.vue";
import Header from "@/components/header.vue";
import {userStore} from "@/store/user.store";
const store = userStore()
const config = store.config.config
console.log(config)
const form = reactive({
  name: 'test122',
  account: '2323',
  money: '',
  newPassword: '',
  type: '1'
})
const options = [
  {
    value: '1',
    label: '银行卡'
  },
  {
    value: '2',
    label: '支付宝'
  }
]

</script>

<template>
  <div class="bg-[#F2F2F2] md:pt-0 pt-[46px] md:mb-0 md:bg-[#F5F9FF] md:h-[100vh] relative">
    <template class="md:!hidden !block">
      <navBar :title="'充值'" :leftArrow="false"/>
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="bg-white p-[10px] my-[10px] md:p-[25px] md:mt-[20px] md:w-[1200px] md:mx-auto md:rounded-2xl md:shadow-xl">
      <el-form :model="form"
               label-width="auto"
               :label-position="'top'">
        <el-form-item label="选择充值类型">
          <el-select v-model="form.type" placeholder="Select" style="width: 100%" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="充值金额">
          <el-input v-model="form.money" class="!text-[12px]" size="large"  placeholder="请输入充值金额">
            <template #prepend>￥</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="w-[100px] h-[36px] bg-[#0077FF] text-white text-[14px] text-center mx-auto rounded-xl" style="line-height: 36px">确认</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>
