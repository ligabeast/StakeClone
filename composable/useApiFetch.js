export const useApiFetch = (url, options = {}) => {
    const config = useRuntimeConfig();

    return $fetch(url, {
        baseURL: config.public.baseUrl,
        ...options,
    });
};
