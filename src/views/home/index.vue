<script setup lang="ts">
import {apiBanner, apiGameId, apiGameList, getGameId} from '@/request/api.ts'
import Header  from "@/components/header.vue";
import TabBar from "@/components/tabbar.vue";
import {userStore} from "@/store/user.store";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {showDialog, showFailToast} from "vant";
import {isMobile} from "../../utils";
const store = userStore()
const bannerList = ref([])
const noticeTxt = ref('')
const gameId = ref(store.gameId)
const router = useRouter()
const imgOrigin = import.meta.env.MODE === 'development' ? 'https://web.czbcw.com' : window.location.origin
const getBanner = async () => {
  const res = await apiBanner()
  bannerList.value = res.data.banner
  if(res.data.notice.roll.content) {
    noticeTxt.value = res.data.notice.roll.content.replace(/<[^>]*>/g, '');
  }
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

const goGame = () => {
  if (!store.token) {
    return showFailToast('请先登录')
  }
  router.push(`/ai/${gameId.value}`)
}
const goService = () => {
  if (!store.token) {
    return showFailToast('请先登录')
  }
  window.open(serviceLink, '_blank')
}
const goMessage = () => {
  if (!store.token) {
    return showFailToast('请先登录')
  }
  router.push('/message')
}
onMounted(() => {
  getBanner()
})
</script>

<template>
  <div class="w-full">
    <Header />
    <div class="px-[10px] md:!px-0">
      <van-swipe class="w-full rounded-[10px] md:!rounded-[0]">
        <van-swipe-item class="w-full h-[600px]" v-for="item in bannerList" :key="item.id">
            <img :src="imgOrigin+'/'+item.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="md:max-w-[1200px] mx-auto px-[10px] md:!px-0">
      <div class="flex bg-[#F3F8FD] lg:h-[40px] mt-[20px] rounded-[10px] items-center">
        <div class="w-[34px] mx-[10px]">
          <img src="@/assets/images/notice-tit.png">
        </div>
        <div class="w-[2px] h-[16px] bg-[#666] rounded"></div>
        <van-notice-bar scrollable :text="noticeTxt" class="flex-1 !bg-[transparent] !text-[12px] md:!text-[14px]" />
      </div>
      <div class="flex justify-between md:my-[50px] my-[15px]">
        <div class="md:w-[360px] w-[105px] h-[118px] md:h-[162px] flex flex-col justify-center items-center bg-[#e8f3fe] rounded-[10px] cursor-pointer" @click="openService">
          <div class="md:w-[96px] md:h-[96px] w-[72px] h-[72px]">
            <img src="@/assets/images/ksck.png">
          </div>
          <span class="md:text-[16px] text-[14px] font-bold">快速存款</span>
        </div>
        <div class="md:w-[360px] w-[105px] h-[118px] md:h-[162px] flex flex-col justify-center items-center bg-[#e8f3fe] rounded-[10px] cursor-pointer" @click="goMessage">
          <div class="md:w-[96px] md:h-[96px] w-[72px] h-[72px]">
            <img src="@/assets/images/xxzx.png">
          </div>
          <span class="md:text-[16px] text-[14px] font-bold">消息中心</span>
        </div>
        <div class="md:w-[360px] w-[105px] h-[118px] md:h-[162px] flex flex-col justify-center items-center bg-[#e8f3fe] rounded-[10px] cursor-pointer">
          <div class="md:w-[96px] md:h-[96px] w-[72px] h-[72px]" @click="goService">
            <img src="@/assets/images/zxkf.png">
          </div>
          <span class="md:text-[16px] text-[14px] font-bold">在线客服</span>
        </div>
      </div>
    </div>
    <div class="w-full bg-[#EEF3F8] md:h-[580px] pb-[20px] md:!pb-0">
      <div class="md:max-w-[1200px] mx-auto">
        <div class="flex justify-between items-start md:h-[316px]">
          <div class="md:w-[474px] hidden md:block">
            <img src="@/assets/images/sele-bg.png" class="w-full">
          </div>
          <div class="md:w-[600px]">
            <div class="text-[#0077FF] md:text-[24px] text-[18px] font-bold md:mt-[25px] md:mb-[45px] my-[35px] text-center md:text-left">AI智能</div>
            <div class="text-[#000] md:text-[16px] mt-[10px] md:leading-10 leading-5 text-[14px] px-[15px] md:px-0">
              人工智能将主要围绕工业企 业数字化转型升级中迫切需 要变革的场景进行命题,鼓 励选手脑洞大开,寻找新的 创意和算法,帮助解决行业 实际问题,寻找可落地的解 决方案。
            </div>
            <div @click="goGame"  class="cursor-pointer hidden md:flex md:w-[200px] md:h-[44px] md:mt-[30px] text-white  justify-center items-center bg-gradient-to-r from-[#009DFF] to-[#005EFF] rounded-[50px]">
              进入智能
            </div>
          </div>
        </div>
        <div class="w-[300px] block md:hidden mx-auto">
          <img src="@/assets/images/sele-bg.png" class="w-full">
        </div>
        <div @click="goGame" class="flex md:hidden w-[200px] h-[44px] my-[20px] mx-auto text-white  justify-center items-center bg-gradient-to-r from-[#009DFF] to-[#005EFF] rounded-[50px] cursor-pointer">
          进入智能
        </div>
        <div class="bg-[#CAD7E4] md:h-[216px] rounded-[10px] text-center px-[20px] md:!mx-0 mx-[15px]">
          <div class="text-[#003976] text-[20px] font-bold py-[20px]">
            关于国际声通AI智能
          </div>
          <div class="md:text-[16px] md:leading-8 text-left leading-6 pb-[10px]">
            爲交互式人工智能市场的领导者,具有极强的技术优势和突出的产品特点。公司基于自研的融合通信及人工智能核心技术,打造了丰富的、高度标准化的产品模块,爲客户提供高效、稳定的产品体验。公司主要的业务场景爲智慧城市、智慧交通、智慧通信和智慧金融,同时公司也在积极将解决方案拓展至可被交互式人工智能赋能的其他场景。公司的核心管理团队具备多年的行业经验,且拥有近二十年的合作经历,有助于公司稳健的业务发展。由声通资深技术骨干带领的技术团队、首席科学家何积丰院士带领的学术团队、以及由声通研究院院长林祥博士领导的与上海交大成立的AI联合实验室共同构成了公司的研发团队。与此同时,公司还与百度文心一言等公司达成了战略合作伙伴关係。
          </div>
        </div>
      </div>
    </div>
    <div class="md:max-w-[1200px] md:mx-auto mx-[15px]">
      <div class="text-[#003976] md:text-[24px] text-[18px] text-center font-bold md:mt-[50px] md:mb-[30px] my-[25px]">AI智能引领科技创新，开创未来</div>
      <div class="text-[20px] text-center">信誉口碑、高质量服务的象征。GARP国际认证保障公平，提供最完整全面的服务。让AI智能引领您的未来之路。</div>
      <div class="md:w-[560px] mx-auto">
        <img src="@/assets/images/zs.png" class="my-[20px]">
      </div>
      <div class="md:w-[707px] mx-auto">
        <img src="@/assets/images/zs-txt.png" class="my-[20px]">
      </div>
      <div class="flex justify-between mt-[20px] flex-wrap">
        <div class="md:w-[360px] md:h-[364px] w-full rounded-2xl bg-[#EEF3F8] md:my-0 my-[15px] pb-[10px] ">
          <div class="text-[#003976] md:text-[24px] text-[18px] py-[10px] text-center md:py-[30px]">服务优势</div>
          <div class="px-[20px] md:text-[20px] text-[14px] md:leading-10 leading-6">
            本着和谐、开放、互利、共赢的理念，致力为平台与投资人群体之间，建立快捷、及时的双向互动和信息交流渠道。既为投资平台提供专业化、多样化的推广策划与运营优化，同时也为投资人创造一个信息交流的快乐家园。最终实现平台、投资人与论坛之间的三方共赢
          </div>
        </div>
        <div class="md:w-[360px] md:h-[364px] w-full rounded-2xl bg-[#EEF3F8] flex flex-col items-center pb-[10px]">
          <div class="text-[#003976] md:text-[24px] text-[18px] py-[10px] text-center md:py-[30px]">安全支付</div>
          <div class="px-[20px] md:w-[280px] w-[180px] flex">
            <img src="@/assets/images/home-icon-c.png">
          </div>
        </div>
        <div class="md:w-[360px] md:h-[364px] w-full rounded-2xl bg-[#EEF3F8] md:my-0 my-[15px] pb-[10px]">
          <div class="text-[#003976] md:text-[24px] text-[18px] py-[10px] text-center md:py-[30px]">监管机构</div>
          <div class="px-[20px] md:text-[20px] text-[14px] md:leading-10 leading-6">
            『国际声通』由国家税务监管，整合世界各地区资源，汇聚宏观经济数据，共享政府、企业和社会三方数据，受社会认可的十四五规划项目，注册操作时请确保已满18岁！
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-[#EEF3F8] md:mt-[45px] py-[40px]">
      <div class="md:max-w-[1200px] mx-auto flex flex-wrap">
        <div class="md:w-[200px] w-[120px]"><img src="@/assets/images/f-icon-1.png"></div>
        <div class="md:w-[200px] w-[120px]"><img src="@/assets/images/f-icon-2.png"></div>
        <div class="md:w-[200px] w-[120px]"><img src="@/assets/images/f-icon-3.png"></div>
        <div class="md:w-[200px] w-[120px]"><img src="@/assets/images/f-icon-4.png"></div>
        <div class="md:w-[200px] w-[120px]"><img src="@/assets/images/f-icon-5.png"></div>
        <div class="md:w-[200px] w-[120px]"><img src="@/assets/images/f-icon-6.png"></div>
      </div>
    </div>
    <div class="w-full bg-[#B4C6D7] mb-[44px] md:!mb-0">
      <div class="py-[20px] text-center md:text-[16px] text-[12px]">
        copyright © 2025 版权归属声明：所有版权归国际声通所有，违者必究！
      </div>
    </div>
    <TabBar :active="0"/>
  </div>
</template>

<style scoped>

</style>
