import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    user: {},
    isUserLogged: false,
  }),

  getters: {
    getUser: (state) => state.user,
  },

  actions: {
    setUser(userData) {
      this.user = userData
    },
    setUserLogged(bool) {
      this.isUserLogged = bool
    },
  },
})
