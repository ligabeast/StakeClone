export default defineNuxtPlugin((nuxtApp) => {
    if (nuxtApp.apolloProvider) {
        nuxtApp.apolloProvider.defaultClient.defaultOptions = {
            query: {
                fetchPolicy: 'no-cache',
            },
        };
    }
});
