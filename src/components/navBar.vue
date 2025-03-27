<script setup lang="ts">
import headImg1 from "@/assets/images/mine/mine-icon-1.png"
import headImg2 from "@/assets/images/mine/mine-icon-2.png"
import headImg3 from "@/assets/images/mine/home-icon-3.png"
import headImg4 from "@/assets/images/mine/home-icon-4.png"
import headImg5 from "@/assets/images/mine/home-icon-5.png"
import headImg6 from "@/assets/images/mine/home-icon-6.png"
import headImg7 from "@/assets/images/mine/home-icon-7.png"
import {userStore} from "@/store/user.store";
const store = userStore()
import {priceFormat} from "@/utils";
import {useRouter} from "vue-router";
const router = useRouter()
const slideList = ref([
  {
    icon: headImg1,
    text: '布局大厅',
    path: '/ai/' + store.gameId
  },{
    icon: headImg2,
    text: '个人中心',
    path: '/mine'
  },{
    icon: headImg3,
    text: '账变记录',
    path: '/mine/accountRecords'
  },{
    icon: headImg4,
    text: '布局记录',
    path: '/mine/transactionHistory'
  },{
    icon: headImg5,
    text: '平台公告'
  },{
    icon: headImg6,
    text: '刷新应用'
  },{
    icon: headImg7,
    text: '安全退出',
    path: '/login'
  }
])
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    leftText: {
        type: String,
        default: ''
    },
    leftArrow: {
        type: Boolean,
        default: true
    },
    safeAreaInsetTop: {
        type: Boolean,
        default: false
    }
})
const tabShow = ref(false)
const changePath = (item) => {
  if (item.text === '安全退出') {
    tabShow.value = false
    store.logout()
    router.push('/')
    return
  }
  router.push(item.path)
}
</script>

<template>
  <van-nav-bar
      :title="props.title"
      :left-text="leftArrow&&'返回'"
      :left-arrow="leftArrow"
      safe-area-inset-top
      @click-left="$router.back()"
      fixed
      style="z-index: 999;"
  >
    <template #right>
      <img src="@/assets/images/more.png" class="w-[24px]" @click="tabShow = true">
    </template>
  </van-nav-bar>
  <van-popup v-model:show="tabShow" class="w-2/3 h-full" position="right">
    <div class="p-[20px]">
      <div class="w-[228px] h-[92px] mine-login box-border px-[15px] py-[20px] flex flex-col justify-between">
        <div class="text-[14px] text-white">
          账号：{{store.userInfo.nickname || store.userInfo.username}}
        </div>
        <div class="text-[14px] text-white">
          账户余额：
          <span class="text-[16px]">{{ priceFormat(store.balance) }}</span>
        </div>
      </div>
      <div class="pl-[20px]">
        <div class="flex gap-[8px] items-center my-[32px]" v-for="(item,index) in slideList" :key="index" @click="changePath(item)">
          <img :src="item.icon" class="w-[20px]" />
          <span>{{ item.text }}</span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<style scoped>
.mine-login{
  background: url(@/assets/images/mine/mine-bg.png) no-repeat;
  background-size: cover;
}
</style>
