import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // Define state
  const token = ref("");
  const username = ref("");
  const deposit = ref(0);

  // Define actions
  function setToken(newToken) {
    token.value = newToken;
  }

  function setUsername(newUsername) {
    username.value = newUsername;
  }

  function setDeposit(newDeposit) {
    deposit.value = newDeposit;
  }

  function subtractDeposit(amount) {
    deposit.value -= amount;
  }

  function reset() {
    token.value = "";
    username.value = "";
    deposit.value = 0;
  }

  // Define getters
  const isAuthenticated = computed(() => {
    return token.value !== "";
  });

  return {
    // Expose state
    token,
    username,
    deposit,
    reset,
    // Expose actions
    subtractDeposit,
    setToken,
    setUsername,
    setDeposit,
    // Expose getters
    isAuthenticated,
  };
});
