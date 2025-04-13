import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    user: {},
    isUserLogged: false,
  }),

  getters: {
    getUser: (state) => state.user,
    isHasUser: (state) => Object.keys(state.user).length > 0,

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
