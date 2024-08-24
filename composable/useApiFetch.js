import { useAuthStore } from '~/stores/auth';

export const useApiFetch = (url, options = {}) => {
    const config = useRuntimeConfig();

    const authStore = useAuthStore();

    const fetchConfig = {
        baseURL: config.public.baseUrl,
    };

    if (authStore.isAuthenticated) {
        fetchConfig.headers = {
            Authorization: `Bearer ${authStore.token}`,
        };
    }

    return $fetch(url, {
        ...fetchConfig,
        ...options,
    });
};
