<script setup lang="ts">
import navBar from "@/components/navBar.vue";
import Header from "@/components/header.vue";
// import {showFailToast, showSuccessToast} from "vant";
import { useRouter } from "vue-router";
import {reactive, ref} from "vue";
import {apiMessageList} from "../../request/api";
import {dateFormat} from "../../utils";
// const router = useRouter()
const list = ref([])
const params = reactive({
  page: 1,
  page_size: 10
})
const total = ref(0)
const getMessage = async()=>{
  const res = await apiMessageList({...params})
  list.value = res.data.list
  total.value = res.data.page.total
}
const changePage = (val)=>{
  params.page = val
  getMessage()
}
onMounted(()=>{
  getMessage()
})
</script>

<template>
  <div class="bg-[#F2F2F2] md:pt-0 pt-[46px] md:mb-0 md:bg-[#F5F9FF] md:h-[100vh] relative">
    <template class="md:!hidden !block">
      <navBar :title="'站内信'" />
    </template>
    <template class="md:!block !hidden">
      <Header />
    </template>
    <div class="md:w-[1200px] md:!mx-auto md:!bg-white md:mt-[20px] md:rounded-2xl md:px-[24px]">
      <div class="md:!flex items-center hidden">
        <el-icon size="22px" class="ml-[20px] cursor-pointer" @click="$router.go(-1)"><IEpArrowLeftBold /></el-icon>
        <div class="text-[#333333] text-[14px] md:text-[18px] mx-auto font-bold px-[15px] md:py-[20px]">
          站内信
        </div>
      </div>
      <div  v-if="!list.length">
        <van-empty description="暂无消息" />
      </div>
      <div class="bg-white p-[10px] my-[20px] md:p-[25px] md:mt-[20px] md:mx-auto" v-else>
        <div class="text-[18px] text-[#333] text-center border rounded-xl border-[#999]">
          <div class="flex flex-col justify-between items-start p-[10px]" v-for="i in list" :key="i.id">
            <div class="flex justify-between items-end w-full">
              <div class="text-[#333] text-[18px] py-[10px]">{{ i.title }}</div>
              <div class="text-[#999] text-[12px]">
                {{dateFormat(i.time)}}
              </div>
            </div>
            <div class="text-[#666] text-[14px]">{{ i.content }}</div>
          </div>
        </div>
        <van-pagination class="mt-[10px]" v-model="params.page" :page-count="total" mode="simple" @change="changePage" />
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
