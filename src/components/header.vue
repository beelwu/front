<script setup lang="ts">
import { userStore } from "@/store/user.store";
import { useRouter } from "vue-router";
const router = useRouter()
const store = userStore()
const tabShow = ref(false)
import headImg1 from "@/assets/images/mine/mine-icon-1.png"
import headImg2 from "@/assets/images/mine/mine-icon-2.png"
import headImg3 from "@/assets/images/mine/home-icon-3.png"
import headImg4 from "@/assets/images/mine/home-icon-4.png"
import headImg5 from "@/assets/images/mine/home-icon-5.png"
import headImg6 from "@/assets/images/mine/home-icon-6.png"
import headImg7 from "@/assets/images/mine/home-icon-7.png"
import {showDialog, showLoadingToast} from "vant";
import {apiGameList} from "@/request/api";
import {priceFormat} from "@/utils";
import {isMobile} from "../utils";
const imgOrigin = import.meta.env.MODE === 'development' ? 'https://web.czbcw.com' : window.location.origin
const routerName = ref('')
watch(
    () => router.currentRoute.value.name,
    (newRouterName: any) => {
      routerName.value = newRouterName
    },
    {immediate: true}
)
const gameId = ref(null)
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
const refresh = () => {
  showLoadingToast('刷新中')
  store.changeUserInfo()
}
const changePath = (item) => {
  if (item.text === '安全退出') {
    tabShow.value = false
    store.logout()
    router.push('/')
    return
  }
  router.push(item.path)
}
const serviceLink = store.config.customer[0].link
const openService = () => {
  showDialog({
    title: '提示',
    message: '请联系客服进行充值',
    confirmButtonText: '联系客服',
    confirmButtonColor: '#0077FF',
    showCancelButton: true,
    width: isMobile()? '80%' : '400px',
  }).then(() => {
    window.open(serviceLink, '_blank')
  })
}

onMounted(() => {

})
</script>

<template>
  <div>
    <div class="w-full h-[40px] bg-[#edf5ff] md:block hidden" v-if="store.token">
        <div class="md:max-w-[1200px] mx-auto flex justify-between items-center px-[10px] md:!px-0">
          <div class=" text-[14px] leading-[40px]">
            <span>你好，{{store.userInfo.nickname || store.userInfo.username}}</span>！
          </div>
          <div class="text-[#0077FF] text-[14px]" v-if="store.token">
            <div class="justify-between md:flex hidden">
              <div class="text-center cursor-pointer mr-[20px] text-[#333] flex items-center" style="line-height: 36px;">余额：{{ priceFormat(store.balance) }}
                <img src="@/assets/images/re.png" class="w-[16px] ml-[5px]" @click="refresh">
              </div>
              <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;" @click="openService">充值</div>
              <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;" @click="$router.push('/withdrawal')">提现</div>
              <div class="w-[64px] text-center cursor-pointer text-[#FF2828]" style="line-height: 36px" @click="store.logout()">登出</div>
            </div>
          </div>
        </div>
    </div>
    <div class="bg-white py-[10px] md:!py-0">
      <div class="md:max-w-[1200px] mx-auto flex justify-between items-center px-[10px] md:!px-0">
        <div class="md:w-[200px] w-[140px] h-[50px] overflow-hidden">
          <img :src="imgOrigin+'/'+store.config.config.app_logo" class="w-full h-full">
        </div>
        <div class="justify-between text-[#0077FF] md:flex hidden" v-if="!store.token">
          <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px;">首页</div>
          <div class="w-[83px] h-[36px] bg-gradient-to-r from-[#009DFF] to-[#005EFF] text-center rounded text-white cursor-pointer" style="line-height: 36px" @click="$router.push('/login')">登录</div>
          <div class="w-[64px] text-center cursor-pointer" style="line-height: 36px" @click="$router.push('/register')">注册</div>
        </div>
        <div class="justify-between md:flex items-center hidden text-[16px]" v-else style="font-weight: 400;height: 60px">
          <div class="w-[100px] text-center cursor-pointer h-full leading-20" :style="routerName == 'home'&&'background:linear-gradient(#0077FF00, #0077FF1A);border-bottom:2px solid #0077FF;color:#0077FF ' " @click="$router.push('/')">首页</div>
          <div class="w-[100px] text-center cursor-pointer h-full leading-20" style="">存款优惠</div>
          <div class="w-[100px] text-center cursor-pointer h-full leading-20" :style="routerName == 'Ai'&&'background:linear-gradient(#0077FF00, #0077FF1A);border-bottom:2px solid #0077FF;color:#0077FF ' " @click="$router.push('/ai/'+store.gameId)">布局大厅</div>
          <div class="w-[100px] text-center cursor-pointer h-full leading-20" :style="routerName == 'mine'&&'background:linear-gradient(#0077FF00, #0077FF1A);border-bottom:2px solid #0077FF;color:#0077FF ' " @click="$router.push('/mine')">个人中心</div>
        </div>
        <div class="flex gap-4 md:hidden">
          <div class="w-[24px]">
            <img src="@/assets/images/msg-icon.png">
          </div>
          <div class="w-[24px]" @click="tabShow = true">
            <img src="@/assets/images/more.png">
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model:show="tabShow" class="w-2/3 h-full" position="right">
      <div class="p-[20px]">
        <div class="w-[228px] h-[92px] mine-login box-border px-[15px] py-[20px] flex flex-col justify-between">
          <div class="text-[14px] text-white" v-if="store.token">
            账号：{{store.userInfo.nickname || store.userInfo.username}}
          </div>
          <div class="text-[14px] text-white" v-if="store.token">
            账户余额：
            <span class="text-[16px]">{{ priceFormat(store.balance) }}</span>
          </div>
          <div class="text-[14px] text-white" v-if="!store.token">
            欢迎来到{{ store.config.config.app_name }}，请
            <span class="text-[#07c160] cursor-pointer font-bold" @click="$router.push('/login')">登录</span>！
          </div>
          <div class="text-[12px] text-white" v-if="!store.token">
            还没有账号？请
            <span class="text-[#07c160] cursor-pointer" @click="$router.push('/register')">注册</span>！
          </div>
        </div>
        <div class="pl-[20px]" v-if="store.token">
            <div class="flex gap-[8px] items-center my-[32px]" v-for="(item,index) in slideList" :key="index" @click="changePath(item)">
              <img :src="item.icon" class="w-[20px]" />
              <span>{{ item.text }}</span>
            </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style scoped>
.mine-login{
  background: url(@/assets/images/mine/mine-bg.png) no-repeat;
  background-size: cover;
}
</style>
