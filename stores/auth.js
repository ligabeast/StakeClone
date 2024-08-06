import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    username: "",
    deposit: 0,
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUsername(username) {
      this.username = username;
    },
    setDeposit(deposit) {
      this.deposit = deposit;
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== "";
    },
  },
});
