<script setup lang="ts">
import {isMobile} from "@/utils/index.ts";
import Header from "@/components/header.vue";
import {apiUpdateUserInfo} from "@/request/api";
import {showFailToast} from "vant";
import {userStore} from "@/store/user.store";
import {priceFormat} from "../../../utils";
const store = userStore()
console.log()
const dialogVisible = ref(false)
const dialogTit = ref('修改昵称')
const openDialog = (type:any) =>{
  if(type === '1'){
    dialogTit.value = '修改昵称'
  }else{
    dialogTit.value = '修改预留信息'
  }
  dialogVisible.value = true
}
const nickname = ref('')
const description = ref('')
const params = ref({})
// 修改用户信息
const upDataUserInfo = async () => {
  if (dialogTit.value === '修改昵称') {
    if (!nickname.value) {
      return showFailToast('请输入昵称')
    }
    params.value = {
      nickname: nickname.value
    }
  } else {
    if (!description.value) {
      return showFailToast('请输入预留信息')
    }
    params.value = {
      description: description.value
    }
  }
  const res = await apiUpdateUserInfo({...params.value})
  store.changeUserInfo()
  dialogVisible.value = false
}
</script>

<template>
  <div class="mb-[44px] bg-[#F2F2F2] pb-[40px] md:pt-0 pt-[46px] md:mb-0 md:bg-[#F5F9FF] md:!h-[100vh]">
    <template class="md:!hidden !block">
      <navBar :title="'个人资料'" />
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="md:w-[1200px] md:!mx-auto md:!bg-white md:mt-[20px] md:rounded-2xl">
      <div class="md:!flex items-center hidden">
        <el-icon size="22px" class="ml-[20px] cursor-pointer" @click="$router.go(-1)"><IEpArrowLeftBold /></el-icon>
        <div class="text-[#333333] text-[14px] md:text-[18px] mx-auto font-bold px-[15px] md:py-[20px]">
          个人资料
        </div>
      </div>
      <van-cell-group inset class="bg-white !my-[15px] block ">
        <van-cell title="会员账户" class="md:!bg-[#F5F9FF]" :value="store.userInfo.username" />
        <van-cell title="会员昵称" class="md:!bg-[#F5F9FF]" :value="store.userInfo.nickname || '未设置'" is-link  @click="openDialog('1')"/>
        <van-cell title="预留信息" class="md:!bg-[#F5F9FF]" is-link  @click="openDialog('2')"/>
        <van-cell title="可用余额" class="md:!bg-[#F5F9FF]" :value="'¥'+priceFormat(store.balance)" />
      </van-cell-group>
      <div class="px-[15px] md:mx-auto md:bg-white md:py-[20px] md:rounded-2xl md:pb-[200px]">
        <div class="text-[#333333] text-[14px] md:text-[16px] font-bold">
          账户安全
        </div>
        <div class="text-[12px] text-[#666] md:leading-10 leading-6 mt-5">
          <p>1,我们采用了目前最好的加密技术（1024位RSA密钥交 换和448位blowfish)和防火墙系统保护你的安全、私 隐,并保证您享受公平的布局。</p>
          <p>2,客户在本平台的所有活动均严格保密,我们不会向第 三方包括政府透露客户资料。</p>
          <p>3,所有银行交易由国际金融机构在高标准的安全和机密 的网络中进行。进入布局者账号资料也必须有布局者唯 一的登录ID和密码,确保客户的资金安全有保障。</p>
        </div>
      </div>
    </div>
    <el-dialog :title="dialogTit" v-model="dialogVisible" :width="isMobile()?'80%':'40%'" class="h-[200px]" center :show-close="false" lock-scroll
    :close-on-click-modal="false" :close-on-press-escape="false" >
      <div class="py-[20px]" v-if="dialogTit == '修改昵称'">
        <el-input placeholder="请输入昵称" v-model="nickname"  clearable></el-input>
      </div>
      <div class="py-[20px]" v-else>
        <el-input placeholder="请输入预留信息" v-model="description"  clearable></el-input>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upDataUserInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>
