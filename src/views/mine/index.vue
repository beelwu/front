<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import TabBar from "@/components/tabbar.vue";
import myIcon1 from "@/assets/images/my/my-icon-1.png"
import myIcon2 from "@/assets/images/my/my-icon-2.png"
import myIcon3 from "@/assets/images/my/my-icon-3.png"
import myIcon4 from "@/assets/images/my/my-icon-4.png"
import myIcon5 from "@/assets/images/my/my-icon-5.png"
import myIcon6 from "@/assets/images/my/my-icon-6.png"
import myIcon7 from "@/assets/images/my/my-icon-7.png"
import myIcon8 from "@/assets/images/my/my-icon-8.png"
import Header from "@/components/header.vue";
import {userStore} from "../../store/user.store";
import {priceFormat} from "../../utils";
const store = userStore()
const slideList = ref([
  {
    icon: myIcon1,
    text: '个人资料',
    path: '/mine/userInfo'
  },{
    icon: myIcon2,
    text: '资金明细',
    path: '/mine/fundingDetails'
  },{
    icon: myIcon3,
    text: '提款记录',
    path: '/mine/withdrawalRecord'
  },{
    icon: myIcon4,
    text: '交易记录',
    path: '/mine/transactionHistory'
  },{
    icon: myIcon5,
    text: '账变记录',
    path: '/mine/accountRecords'
  },{
    icon: myIcon6,
    text: '个人报表',
    path: '/mine/personalReport'
  },{
    icon: myIcon7,
    text: '绑定卡号',
    path: '/mine/bindCard'
  },{
    icon: myIcon8,
    text: '密码管理',
    path: '/mine/passwordManagement'
  }
])
</script>

<template>
  <div class="mb-[44px]  md:min-h-[100vh] md:pt-0 pt-[46px] md:mb-0 md:bg-[#F5F9FF]">
    <template class="md:!hidden !block">
      <navBar :title="'账号管理'" :leftArrow="false"/>
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="p-[20px] md:w-[1200px] md:!mx-auto md:!bg-white md:mt-[20px] md:rounded-2xl md:px-[24px]">
      <div class="indent-4 text-[16px] mb-[10px]" v-if="store.token">
        欢迎您，<span class="text-[#0077FF]">{{ store.userInfo.nickname || store.userInfo.username }}</span>
      </div>
      <div class="h-[96px] mine-login rounded-2xl box-border px-[15px] py-[20px] flex items-center justify-between bg-gradient-to-r from-[#009DFF] to-[#005EFF]">
        <div class="flex-col flex h-full justify-between" v-if="store.token">
          <div class="text-[14px] text-white">
            钱包余额
          </div>
          <div class="text-[14px] md:!text-[16px] text-white" v-if="store.token">
            ¥ <span class="text-[18px] md:!text-[24px]">{{ priceFormat(store.userInfo.balance) }}</span>
          </div>
        </div>
        <div class="bg-gradient-to-r text-[#0077FF] from-[#C8DEFF] to-[#EAF3FF] px-[15px] py-[5px] text-[12px] rounded-[10px] cursor-pointer" @click="$router.push('/withdrawal')" v-if="store.token">
          取款
        </div>
        <div class="flex flex-col justify-between h-full" v-if="!store.token">
          <div class="text-[14px] text-white">
            欢迎来到{{ store.config.config.app_name }}，请
            <span class="text-[#07c160] cursor-pointer font-bold" @click="$router.push('/login')">登录</span>！
          </div>
          <div class="text-[12px] text-white">
            还没有账号？请
            <span class="text-[#07c160] cursor-pointer" @click="$router.push('/register')">注册</span>！
          </div>
        </div>
      </div>

      <div class="block md:hidden" v-if="store.token">
        <div class="flex gap-[8px] items-center my-[12px]" v-for="(item,index) in slideList" :key="index" @click="$router.push(item.path)">
          <van-cell :title="item.text" :icon="item.icon" is-link>
          </van-cell>
        </div>
      </div>
      <div class="gap-[18px] cursor-pointer  items-center my-[32px] hidden md:flex flex-wrap justify-around" v-if="store.token">
          <div class="flex items-center bg-gradient-to-t from-[#E2F0FF] to-[#F3F8FD] flex-col gap-[8px] rounded-xl  justify-center w-[270px] h-[96px] shadow" v-for="(item,index) in slideList" :key="index" @click="$router.push(item.path)">
            <img :src="item.icon" class="w-[20px]">
            <span class="text-[16px]">{{ item.text }}</span>
          </div>
      </div>
    </div>
    <TabBar :active="4"/>
  </div>
</template>

<style scoped>
 :deep(.van-cell__left-icon){
  display: flex;
  align-items: center !important;
}
</style>
