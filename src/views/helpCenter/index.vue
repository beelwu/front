<script setup>
import navBar from "@/components/navBar.vue";
import Header from "@/components/header.vue";
import {userStore} from "@/store/user.store";
const store = userStore()
const activeIndex = ref(0)
const changeAct = (index) => {
  activeIndex.value = index
}
const serviceLink = store.config.customer[0].link
const goService = () => {
  window.open(serviceLink, '_blank')
}
</script>

<template>
  <div class="mb-[290px] h-[100vh] md:min-h-[100vh] md:pt-0 pt-[46px] md:mb-0 md:bg-[#F5F9FF]">
    <template class="md:!hidden !block">
      <navBar :title="'帮助中心'" />
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="md:py-[20px]">
      <div class="bg-white p-[10px] my-[10px] md:p-[0] h-[800px] md:mt-[20px] md:w-[1200px] md:mx-auto md:rounded-2xl flex">
        <div class="w-[240px] text-center border-r border-[#ECECEC]">
          <div class="text-[24px] font-bold py-[20px]">常见问题</div>
          <div class="text-[14px] mt-[10px]">
            <div class="text-[14px] mt-[10px] h-[48px] flex items-center justify-center cursor-pointer" :style="activeIndex === 0 && 'background:linear-gradient(44deg, #009DFF, #005EFF);color:#fff' " @click="changeAct(0)">1.如何注册？</div>
            <div class="text-[14px] mt-[10px] h-[48px] flex items-center justify-center cursor-pointer" :style="activeIndex === 1 && 'background:linear-gradient(44deg, #009DFF, #005EFF);color:#fff' " @click="changeAct(1)">2.如何存款？</div>
            <div class="text-[14px] mt-[10px] h-[48px] flex items-center justify-center cursor-pointer" :style="activeIndex === 2 && 'background:linear-gradient(44deg, #009DFF, #005EFF);color:#fff' " @click="changeAct(2)">3.如何提现？</div>
            <div class="text-[14px] mt-[10px] h-[48px] flex items-center justify-center cursor-pointer" :style="activeIndex === 3 && 'background:linear-gradient(44deg, #009DFF, #005EFF);color:#fff' " @click="changeAct(3)">4.忘记密码？</div>
          </div>
        </div>

        <div class="p-[20px] flex-1">
          <div v-if="activeIndex === 0">
            <div class="text-[22px] font-bold">如何注册？</div>
            <div class="text-[16px] mt-[30px] bg-[#F5F9FF] p-[25px] rounded-md">
              <div class="mb-[35px]">1.打开网站首页，点击注册按钮</div>
              <div class="mb-[35px]">2.填写注册信息，点击注册</div>
              <div class="mb-[35px]">3.注册成功后，登录账号</div>
            </div>
          </div>
          <div v-if="activeIndex === 1">
            <div class="text-[22px] font-bold">如何存款？</div>
            <div class="text-[16px] mt-[30px] bg-[#F5F9FF] p-[25px] rounded-md">
              温馨提示：如需存款,请联系 <span class="text-[#0077FF] cursor-pointer" @click="goService">在线客服</span>
            </div>
          </div>
          <div v-if="activeIndex === 2">
            <div class="text-[22px] font-bold">如何提现？</div>
            <div class="text-[16px] mt-[30px] bg-[#F5F9FF] p-[25px] rounded-md">
              <div class="mb-[35px]">1. 请登录会员账号，点击右上方“财务中心-我要提现”</div>
              <div class="mb-[35px]">2. 完善银行资料信息，绑定银行账户（如您已完善信息，请跳过）</div>
              <div class="mb-[35px]">3. 在我要提现页面中，请输入提现金额和提现密码，点击“申请提现”，完成取款</div>
            </div>
          </div>
          <div v-if="activeIndex === 3">
            <div class="text-[22px] font-bold">忘记密码？</div>
            <div class="text-[16px] mt-[30px] bg-[#F5F9FF] p-[25px] rounded-md">
              <div class="mb-[35px]">1. 检查您的用户名及密码大小写，不要有空格</div>
              <div class="mb-[35px]">2. 请联系 <span class="text-[#0077FF] cursor-pointer" @click="goService">在线客服</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
