<script setup lang="ts">
import {userStore} from "../store/user.store";
import {showFailToast} from "vant";
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
const openDeposit = () => {
  store.changeDepositFlag(true)
}

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
      <van-tabbar-item @click="openDeposit">
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
  </div>
</template>

<style scoped>
</style>
