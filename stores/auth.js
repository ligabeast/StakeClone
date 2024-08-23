import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import jwtDecode from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
    // Define state
    const token = ref('');
    const username = ref('');
    const deposit = ref(0);

    // Define actions
    function setToken(newToken) {
        token.value = newToken;
        try {
            const decodedToken = jwtDecode(newToken);
            username.value = decodedToken.username;
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }

    function setUsername(newUsername) {
        username.value = newUsername;
    }

    function setDeposit(newDeposit) {
        if (typeof newDeposit == 'number') {
            deposit.value = newDeposit;
        } else if (typeof newDeposit == 'string') {
            deposit.value = parseFloat(newDeposit);
        }
    }

    function subtractDeposit(amount) {
        deposit.value -= amount;
    }

    function reset() {
        token.value = '';
        username.value = '';
        deposit.value = 0;
    }

    // Define getters
    const isAuthenticated = computed(() => {
        return token.value !== '';
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
