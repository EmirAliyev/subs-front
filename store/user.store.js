import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    user: {},
  }),

  getters: {
    getUser: (state) => state.user,
  },

  actions: {
    setUser(userData) {
      this.user = userData
    },
  },
})
