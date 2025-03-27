import { defineStore } from 'pinia'
export const lotteryStore = defineStore('lottery', {
    // persist: true,
    state: () => ({
        prizeList: {},
    }),
    getters: {
    },
    actions: {
        setPrizeList(value) {
            this.prizeList = value
        },
    }
})
