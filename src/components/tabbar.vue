<script setup lang="ts">
import {userStore} from "../store/user.store";
import {showFailToast} from "vant";
import {apiBanner} from "@/request/api";
const store = userStore()
const props = defineProps({
  active: {
        type: Number,
        default: 0
    }
})
const serviceLink = store.config.customer[0].link
const goService = () => {
  if (!store.token) {
    return showFailToast('请先登录')
  }
  window.open(serviceLink, '_blank')
}
const show = ref(false)
const noticePop = ref({})
const getBanner = async () => {
  const res = await apiBanner()
  noticePop.value = res.data.notice.pop
  console.log( noticePop.value)
}
onMounted(() => {
  getBanner()
})
</script>

<template>
  <div class="md:!hidden !block">
    <van-tabbar v-model="props.active">
      <van-tabbar-item replace to="/">
        <span>主页</span>
        <template #icon>
          <img src="@/assets/images/tabber/home-act.png" alt="" v-if="props.active==0">
          <img src="@/assets/images/tabber/home.png" alt="" v-else>
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click="show=true">
        <span>存款优惠</span>
        <template #icon>
          <img src="@/assets/images/tabber/ck-act.png" alt="" v-if="props.active==1">
          <img src="@/assets/images/tabber/ck.png" alt="" v-else>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace :to="'/ai/'+ store.gameId">
        <span>布局大厅</span>
        <template #icon>
          <img src="@/assets/images/tabber/ai-act.png" alt="" v-if="props.active==2">
          <img src="@/assets/images/tabber/ai.png" alt="" v-else>
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click="goService">
        <span>在线客服</span>
        <template #icon>
          <img src="@/assets/images/tabber/kf-act.png" alt="" v-if="props.active==3">
          <img src="@/assets/images/tabber/kf.png" alt="" v-else>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine">
        <span>个人中心</span>
        <template #icon>
          <img src="@/assets/images/tabber/mine-act.png" alt="" v-if="props.active==4">
          <img src="@/assets/images/tabber/mine.png" alt="" v-else>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <van-overlay :show="show" @click="show = false">
      <div class="flex justify-center items-center h-full relative">
        <div class="w-3/4 h-[400px] bg-white rounded-xl border-[#1e78f1] border-2 relative p-[10px]" >
            <div class="text-center font-bold text-[18px]">
              {{ noticePop.title }}
            </div>
            <div class="text-[14px] mt-[10px]" v-html="noticePop.content"></div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<style scoped>
.bg{
  background: url("@/assets/images/tz.png") no-repeat;
  background-size: 100% 100%;
}
</style>
