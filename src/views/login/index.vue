<script setup lang="ts">
import {apiLogin} from "@/request/api";
import { userStore } from '@/store/user.store';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'
import {ref, reactive, onMounted} from "vue";
import {showSuccessToast} from "vant";
const imgOrigin = import.meta.env.MODE === 'development' ? 'https://web.czbcw.com' : window.location.origin
const router = useRouter()
const store = userStore()
const loginForm = reactive({
  username: '',
  password: ''
})
const rememberMe = ref(false)
const login = async () => {

 const res = await apiLogin({
    username: loginForm.username,
    password: loginForm.password
  })
  if (rememberMe.value) {
    localStorage.setItem('loginInfo', JSON.stringify({
      username: loginForm.username,
      password: loginForm.password,
    }))
  }
  store.token = res.data.token
  await store.changeUserInfo()
  // ElMessage.success('登录成功')
  showSuccessToast('登录成功')
  setTimeout(()=>{
    router.push('/')
  },1000)
}

onMounted(()=>{
  const loginInfo = localStorage.getItem('loginInfo')
  if (loginInfo) {
    const { username, password } = JSON.parse(loginInfo)
    loginForm.username = username
    loginForm.password = password
    rememberMe.value = true
  }
})

</script>

<template>
  <div class="login-bg">
    <div class="md:w-[580px] px-[15px] md:px-[25px] md:h-[450px] w-[90%] login-box py-[40px]">
      <div class="w-[200px] ">
        <img :src="imgOrigin+'/'+store.config.config.app_logo">
      </div>
      <div class="w-full mt-[10px]">
        <el-input v-model="loginForm.username" size="large" placeholder="用户名" class="login-input !w-full">
          <template #prefix>
            <el-icon size="18" color="#409efc"><IEpUser/></el-icon>
          </template>
        </el-input>
        <el-input v-model="loginForm.password" type="password" show-password size="large" placeholder="密码" class="login-input !w-full mt-[15px]">
          <template #prefix>
            <el-icon size="18" color="#409efc"><IEpLock/></el-icon>
          </template>
        </el-input>
      </div>
      <div class="w-full mt-[20px] flex flex-col justify-center">
        <el-button type="primary" size="large" class="!w-full" @click="login">登录</el-button>
      </div>
      <div class="w-full mt-[20px] flex flex-col justify-center">
        <el-button type="primary" size="large" class="!w-full" @click="$router.push('/register')">注册账号</el-button>
      </div>
      <div class="w-full mt-[20px] flex justify-between">
        <el-checkbox v-model="rememberMe" label="记住密码"></el-checkbox>
        <el-link type="primary">在线客服</el-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-bg{
  background: url(@/assets/images/login_bg.jpg) no-repeat;
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
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    background-color: hsla(0, 0%, 100%, .7) !important;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
  }
}
</style>
