import { useAuthStore } from '~/stores/auth';

export const useMyFetch = (path, options = {}) => {
    const config = useRuntimeConfig();

    const store = useAuthStore();

    options.baseURL = config.public.baseUrl;
    if (store.isAuthenticated) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${store.token}`,
        };
    }

    return useFetch(path, options).then((res) => res.data.value);
};
