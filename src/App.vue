<script setup lang="ts">
import {userStore} from "@/store/user.store";
import { createWebSocket } from "@/scoket";
const store = userStore()
import {onMounted, watch} from "vue";
watch(() => store.token, async () => {
  if (store.token) {
    await store.changeUserInfo()
    await createWebSocket(store.gameId, store.wsId)
  }
})
onMounted(async () => {
  store.changeConfig()
  if (store.token) {
   await store.changeUserInfo()
   await createWebSocket(store.gameId, store.wsId)
  }
})
// import { useItemStore } from "@/store/item";
// import { useConnectionStore } from "@/store/connection";
// import { socket } from "@/scoket";
//
// const itemStore = useItemStore();
// const connectionStore = useConnectionStore();

// remove any existing listeners (after a hot module replacement)
// socket.off();
// itemStore.bindEvents();
// connectionStore.bindEvents();
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
