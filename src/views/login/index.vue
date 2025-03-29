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
const loginLoading = ref(false)
const rememberMe = ref(false)
const userIpt = ref(false)
const passwordIpt = ref(false)
const show = ref(false)
const login = async () => {
  loginLoading.value = true
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
  loginLoading.value = false
  showSuccessToast('登录成功')
  setTimeout(()=>{
    router.push('/')
  },1000)
}
const serviceLink = store.config.customer[0].link
const goService = () => {
  window.open(serviceLink, '_blank')
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
  <div class="login-bg md:!flex-row flex-col">
    <div class="md:w-[900px] hidden md:block">
      <img src="@/assets/images/login_bg1.png">
    </div>
    <div class="outline_login">
      <div class="md:w-[500px] px-[15px] md:px-[55px] md:h-[520px] w-[100%] bg-white login-box py-[40px]">
        <div class="w-[200px]" @click="$router.push('/')">
          <img :src="imgOrigin+'/'+store.config.config.app_logo">
        </div>
        <div class="w-full mt-[40px] mb-[20px]">
          <el-input v-model="loginForm.username" size="large" placeholder="用户名" class="login-input !h-[44px] !w-full" @focus="userIpt = true" @blur="userIpt = false">
            <template #prefix>
                <img src="@/assets/images/user-act.png" class="w-[16px]" v-if="userIpt">
                <img src="@/assets/images/user-icon.png" class="w-[16px]" v-else>
            </template>
          </el-input>
          <el-input v-model="loginForm.password" type="password" show-password size="large" placeholder="密码" class="login-input !h-[44px] !w-full mt-[15px]" @focus="passwordIpt = true" @blur="passwordIpt = false">
            <template #prefix>
              <img src="@/assets/images/password-act.png" class="w-[16px]" v-if="passwordIpt">
              <img src="@/assets/images/password-icon.png" class="w-[16px]" v-else>
            </template>
          </el-input>
        </div>
        <div class="w-full mt-[-10px] flex justify-between items-center">
          <el-checkbox v-model="rememberMe" label="记住密码"></el-checkbox>
          <span class="text-[#0077FF] cursor-pointer hidden md:block"  @click="show = true">《{{ store.config.config.app_name }}协议》</span>
        </div>
        <div class="w-full mt-[30px] flex flex-col  justify-center">
          <el-button type="primary" size="large" class="!w-full !h-[54px] !text-[18px]" @click="login" v-loading="loginLoading">登录</el-button>
        </div>
        <div class="w-full mt-[50px] flex justify-center">
          <div type="primary" size="large" class="pr-[10px] cursor-pointer hover:!text-[#0077FF]" @click="$router.push('/register')">注册账号</div>
          |
          <div class="pl-[10px] hover:!text-[#0077FF] cursor-pointer" @click="goService">在线客服</div>
        </div>
      </div>
    </div>

    <van-overlay :show="show" :lock-scroll="false">
      <div class="!w-full !h-full flex justify-center items-center">
          <div class="popup_bg bg-white rounded-[10px] p-[20px] md:!w-[800px] w-9/10">
              <div class="text-[24px] font-bold flex items-center justify-between">
                {{ store.config.config.app_name }}协议
                <el-icon size="28" color="#000" class="cursor-pointer" @click="show = false"><IEpClose/></el-icon>
              </div>
              <div class="mt-[20px] md:text-[14px]">
                <p class="my-2">
                  一、为避免于本网站{{ store.config.config.app_name }}之争议，所有用户请务必于进入网站前详阅本平台所定之各项规则，客户一旦进入本网站进行布局时，即被视为已接受本平台的所有协议与规则。
                </p>
                <p class="my-2">
                  二、请定期修改自己的登录密码及资金密码，布局者有责任确保自己的帐户以及登入资料的保密性，以布局者帐号及密码进行的任何网上布局，将被视为有效。敬请不定时做密码变更之动作。若帐号密码被盗用，进行的布局，本公司一概不负赔偿责任。
                </p>
                <p class="my-2">
                  三、布局相关条款：①网上布局如未能成功提交，布局将被视为无效。②凡布局者于分红途中且尚无结果前自动或强制断线时，并不影响分红结算之结果。③因官网分红不稳定，为了保证公平公正公开的规则，本平台做出以下决定：若遇官网分红延迟，满足以下两个条件即可撤单，且一旦撤单后官网补开后也属无效，a:在下期分红后上期还未分红，该期所有订单将视为无效并做撤单处理！b:若分红延迟时间超过30分钟官网还一直不分红，则该期所有订单视为无效（此外超过6期不分红则补开无效）并做撤单处理！④如遇发生不可抗拒之灾害，骇客入侵，网络问题造成数据丢失的情况，以本公司公告为最终方案。⑤本公司将会对所有的电子交易进行记录，如有任何争议，本公司将会以注单记录为准。
                </p>
                <p class="my-2">
                  四、若经本公司发现布局者以不正当手法< 利用外挂程式> 进行布局或以任何非正常方式进行的个人、团体布局有损公司利益之布局情事发生，本公司保留权利取消该类注单以及注单产生之红利，并停用该布局者帐号。无论代理还是布局者，发现漏洞隐瞒不报，利用漏洞恶意刷钱、通过非法手段作弊、或造谣污蔑，攻击平台者，经平台核实后一律无条件永久冻结账号处理，账号所有金钱概不退还。
                </p>
                <p class="my-2">
                  五、若本公司发现布局者有重复申请帐号行为时，保留取消、收回布局者所有优惠红利，以及优惠红利所产生的盈利之权利。每位布局者、每一住址、每一电子邮箱、每一电话号码、相同支付卡/信用卡号码，以及共享电脑环境
                  (例如:网吧、其他公共用电脑等)只能够拥有一个布局者帐号，各项优惠只适用于每位客户在本公司唯一的帐户。
                </p>
                <p class="my-2">
                  六、平台存取款时间为{{store.config.config.withdraw_start_time}} - {{store.config.config.withdraw_end_time}}，本平台面对广大布局者不收取任何存取款手续费  ，单笔最低提款 {{store.config.config.withdraw_min_amount}}元，  单笔最高{{store.config.config.withdraw_max_amount}}元，每日累计次数为{{store.config.config.withdraw_count}}次；
                </p>
                <p class="my-2">
                  七、为了防止有人恶意洗钱，布局者提款必须要消费充值的30%（第三方消费100%）方可进行，否则财务不予受理。
                </p>
                <p class="my-2">
                  八、平台客服没有任何QQ及其他联系方式，唯一途经点击菜单栏客服热线跳转至在线客服，其他均为假冒，请牢记，因此类问题上当受骗平台慨不负责。
                </p>
                <p class="my-2">
                  九 、银行或财付通充值账号不定期更换，请每次存款前务必打开充值界面获取最新收款账号，如自己充错造成的任何损失自由承担，与平台无关。
                </p>
                <p class="my-2">
                  十 、本公司保留不定时修改或增加本协定或规则或保密条例等的操作权利，更改之条款将从更改发生后立即生效，并保留一切有争议事项及最后的决策权。
                </p>
              </div>
            <div class="flex justify-end">
              <van-button type="default"  @click="show = false">取消</van-button>
              <van-button type="primary" class="!ml-10"  @click="show = false">同意并关闭</van-button>
            </div>
          </div>
      </div>
    </van-overlay>
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
  //flex-direction: column;
  .login-box{
    text-align: center;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .outline_login{
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #fff;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.4);
  }
  .popup_bg{
    //background: url(@/assets/images/popup_bg.png) no-repeat;
    //background-size: cover;
  }
}
</style>
