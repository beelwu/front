<script setup lang="ts">
import { userStore } from "@/store/user.store";
const store = userStore()
</script>

<template>
  <div class="w-full bg-black">
    <div class="md:max-w-[1200px] mx-auto py-[10px] flex justify-between items-center px-[10px] md:!px-0">
      <div class="md:w-[200px] w-[140px]">
        <img src="@/assets/images/logo1.png">
      </div>
<!--      未登录-->

<!--      <div class="justify-between text-[#0077FF] md:flex hidden">-->
<!--        <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;">首页</div>-->
<!--        <div class="w-[83px] h-[36px] bg-gradient-to-r from-[#009DFF] to-[#005EFF] text-center rounded text-white cursor-pointer" style="line-height: 36px">登录</div>-->
<!--        <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px">注册</div>-->
<!--      </div>-->

<!--      登录-->
      <div class="justify-between text-[#fff] md:flex hidden">
        <div class="w-[88px] line-clamp-1 text-center cursor-pointer mr-[20px]" style="line-height: 36px;">您好，test0001</div>
        <div class="text-center cursor-pointer mr-[20px]" style="line-height: 36px;">余额：3232.00</div>
        <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;" @click="$router.push('/recharge')">充值</div>
        <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;" @click="$router.push('/withdrawal')">提款</div>
        <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px" @click="store.logout()">退出</div>
      </div>
    </div>
    <div class="md:max-w-[1200px] mx-auto py-[10px] text-[16px] flex justify-between items-center px-[10px] md:!px-0 text-white">
      <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;" @click="$router.push('/')">首页</div>
      <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;" @click="$router.push('/mine')">账号管理</div>
      <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;" @click="$router.push('/ai')">投资中心</div>
      <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;">团队管理</div>
      <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;" @click="$router.push('/mine/fundingDetails')">财务中心</div>
      <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;">帮助中心</div>
      <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;">公告中心</div>
      <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;">在线客服</div>
      <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;" @click="$router.push('/recharge')">存款优惠</div>
    </div>
  </div>
</template>

<style scoped>

</style>
