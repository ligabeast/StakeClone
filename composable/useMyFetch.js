export const useMyFetch = (path, options = {}) => {
  const config = useRuntimeConfig();

  options.baseURL = config.public.baseUrl;
  return useFetch(path, options).then((res) => res.data.value);
};
