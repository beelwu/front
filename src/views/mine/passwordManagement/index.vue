<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import Header from "@/components/header.vue";
import {userStore} from "../../../store/user.store";
const state = userStore()
import {apiUpdatePassword, apiUpdatePayPassword} from "../../../request/api";
import {showSuccessToast} from "vant";
const active = ref(true)
const form = reactive({
  password: '',
  new_password: '',
  password_confirm: ''
})
const payForm = reactive({
  password: '',
  new_password: '',
  password_confirm: ''
})
const updatePassword = async ()=>{
  if (active.value) {
    if (!form.password) {
      ElMessage.error('请输入旧密码')
      return
    }
    if (!form.new_password) {
      ElMessage.error('请输入新密码')
      return
    }
    if (!form.password_confirm) {
      ElMessage.error('请输入确认密码')
      return
    }
    if (form.new_password !== form.password_confirm) {
      ElMessage.error('两次密码不一致')
      return
    }
    await apiUpdatePassword({...form})
  } else {
    console.log(!state.userInfo.withdraw_password)
    if (!payForm.password && state.userInfo.withdraw_password) {
      ElMessage.error('请输入旧密码')
      return
    }
    if (!payForm.new_password) {
      ElMessage.error('请输入新提款密码')
      return
    }
    if (!payForm.new_password) {
      ElMessage.error('请确认输入提款密码')
      return
    }
    if (payForm.new_password !== payForm.new_password) {
      ElMessage.error('两次密码不一致')
      return
    }
    await apiUpdatePayPassword({...payForm})
    await state.changeUserInfo()
  }
  if (active.value) {
    form.password = ''
    form.new_password = ''
    form.password_confirm = ''
  } else {
    payForm.password = ''
    payForm.new_password = ''
    payForm.password_confirm = ''
  }
  showSuccessToast('修改成功！')
}

</script>

<template>
  <div class="bg-[#F2F2F2] md:pt-0 pt-[46px] md:mb-0 md:bg-[#F5F9FF] md:h-[100vh] relative">
    <template class="md:!hidden !block">
      <navBar :title="'修改密码'" />
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="md:w-[1200px] md:!mx-auto md:!bg-white md:mt-[20px] md:rounded-2xl md:px-[24px]">
      <div class="md:!flex items-center hidden">
        <el-icon size="22px" class="ml-[20px] cursor-pointer" @click="$router.go(-1)"><IEpArrowLeftBold /></el-icon>
        <div class="text-[#333333] text-[14px] md:text-[18px] mx-auto font-bold px-[15px] md:py-[20px]">
          修改密码
        </div>
      </div>
    <div class="w-[240px] h-[36px] flex items-center mx-auto text-[14px] border-[#CECECE] border my-[25px] rounded-2xl overflow-hidden cursor-pointer" style="line-height: 36px">
      <div class="w-[50%] text-center" :class="[active && 'bg-[#0077FF] text-white']" @click="active=!active">
        修改登入密码
      </div>
      <div class="w-[50%] text-center" :class="[!active && 'bg-[#0077FF] text-white']" @click="active=!active">
        {{ state.userInfo.withdraw_password ? '修改提款密码' : '设置提款密码' }}
      </div>
    </div>
    <div v-if="active" class="bg-white p-[10px] my-[20px] md:p-[25px] md:mt-[20px] md:mx-auto">
      <el-form :model="form"
               label-width="auto"
               :label-position="'top'">
        <el-form-item label="输入旧登入密码">
          <el-input v-model="form.password" class="!text-[12px]" size="large" type="password" show-password placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="输入新登入密码">
          <el-input v-model="form.new_password" class="!text-[12px]" size="large" type="password" show-password placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新登入密码">
          <el-input v-model="form.password_confirm" class="!text-[12px]" size="large" type="password" show-password placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="w-[100px] h-[36px] bg-[#0077FF] text-white text-[14px] text-center mx-auto rounded-xl cursor-pointer" style="line-height: 36px" @click="updatePassword">确认修改</div>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="bg-white p-[10px] my-[20px] md:p-[25px] md:mt-[20px] md:mx-auto">
      <el-form :model="payForm"
               label-width="auto"
               :label-position="'top'">
        <el-form-item label="输入旧提款密码" v-if="state.userInfo.withdraw_password ">
          <el-input v-model="payForm.password" class="!text-[12px]" size="large" type="password" show-password placeholder="请输入旧提款密码"></el-input>
        </el-form-item>
        <el-form-item label="输入新提款密码">
          <el-input v-model="payForm.new_password" class="!text-[12px]" size="large" type="password" show-password placeholder="请输入新提款密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新提款密码">
          <el-input v-model="payForm.password_confirm" class="!text-[12px]" size="large" type="password" show-password placeholder="请再次输入新提款密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="w-[100px] h-[36px] bg-[#0077FF] text-white text-[14px] text-center mx-auto rounded-xl cursor-pointer" style="line-height: 36px" @click="updatePassword">确认修改</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>
