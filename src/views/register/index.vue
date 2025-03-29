<script setup lang="ts">
import {apiLogin, apiRegister} from "@/request/api";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {userStore} from "@/store/user.store";
import {ref} from "vue";
const store = userStore()
const router = useRouter()
const imgOrigin = import.meta.env.MODE === 'development' ? 'https://web.czbcw.com' : window.location.origin
const loginForm = reactive({
  username: '',
  password: '',
  rePassword: '',
  inviteCode: ''
})
const checked = ref(false)
const userIpt = ref(false)
const passwordIpt = ref(false)
const passwordIpt1 = ref(false)
const loading = ref(false)
const register = async () => {
   loading.value = true
  if (!loginForm.username) {
    return showFailToast('请输入用户名')
  }
  if (!loginForm.password) {
    return showFailToast('请输入密码')
  }
  if (!loginForm.rePassword) {
    return showFailToast('请再次输入密码')
  }
  if (loginForm.password !== loginForm.rePassword) {
    return showFailToast('两次密码输入不一致')
  }
  if (!checked.value) {
    return showFailToast('请先同意用户协议')
  }
   const res = await apiRegister({
    username: loginForm.username,
    password: loginForm.password,
    re_password: loginForm.rePassword,
    inviteCode: loginForm.inviteCode
  })
  if (res.code === 0) {
    showSuccessToast('注册成功')
    apiLogin({
      username: loginForm.username,
      password: loginForm.password
    }).then(async res => {
      store.token = res.data.token
      await store.changeUserInfo()
      loading.value = false
      setTimeout(()=>{
        router.push('/')
      },1000)
    })

  } else {
    showFailToast(res.msg)
  }
}
const serviceLink = store.config.customer[0].link
const goService = () => {
  window.open(serviceLink, '_blank')
}
</script>

<template>
  <div class="login-bg">
    <div class="md:w-[580px] px-[15px] md:px-[25px] w-[90%] login-box py-[40px]">
      <div class="w-[200px]" @click="$router.push('/')">
        <img :src="imgOrigin+'/'+store.config.config.app_logo">
      </div>
      <div class="w-full mt-[10px]">
        <el-input v-model="loginForm.username" size="large" placeholder="请输入您的账号" class="login-input !w-full"  @focus="userIpt = true" @blur="userIpt = false">
          <template #prefix>
            <img src="@/assets/images/user-act.png" class="w-[16px]" v-if="userIpt">
            <img src="@/assets/images/user-icon.png" class="w-[16px]" v-else>
          </template>
        </el-input>
        <el-input v-model="loginForm.password" size="large" type="password" show-password placeholder="请输入您的密码" class="login-input !w-full mt-[15px]" @focus="passwordIpt = true" @blur="passwordIpt = false">
          <template #prefix>
            <img src="@/assets/images/password-act.png" class="w-[16px]" v-if="passwordIpt">
            <img src="@/assets/images/password-icon.png" class="w-[16px]" v-else>
          </template>
        </el-input>
        <el-input v-model="loginForm.rePassword" size="large" type="password" show-password placeholder="请再次确认您的密码" class="login-input !w-full mt-[15px]" @focus="passwordIpt1 = true" @blur="passwordIpt1 = false">
          <template #prefix>
            <img src="@/assets/images/password-act.png" class="w-[16px]" v-if="passwordIpt1">
            <img src="@/assets/images/password-icon.png" class="w-[16px]" v-else>
          </template>
        </el-input>
        <el-input v-model="loginForm.inviteCode" size="large" placeholder="请输入您的邀请码" class="login-input !w-full mt-[15px]">
          <template #prefix>
            <el-icon size="18" color="#409efc"><IEpLink/></el-icon>
          </template>
        </el-input>
      </div>
      <div class="w-full mt-[5px] flex justify-between">
        <el-checkbox v-model="checked" label="我已满18周岁并同意"></el-checkbox>
      </div>
      <div class="w-full mt-[5px] flex flex-col justify-center">
        <el-button type="primary" size="large" class="!w-full" @click="register" v-loading="loading">注册</el-button>
      </div>
      <div class="w-full mt-[20px] flex justify-center">
        <el-button type="primary" size="large" class="!w-[40%] !rounded-2xl" @click="$router.push('/login')">已有账号</el-button>
        <el-button type="primary" size="large" class="!w-[40%] !rounded-2xl" @click="goService">联系客服</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-bg{
  background: url(@/assets/images/login_bg.png) no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .login-box{
    text-align: center;
    background-color: hsla(0, 0%, 100%, .7) !important;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
}
</style>
