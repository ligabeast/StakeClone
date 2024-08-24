import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on server
    if (import.meta.server) return;
    const nuxtApp = useNuxtApp();
    if (import.meta.client && nuxtApp.isHydrating) {
        console.log('auth middleware');
        const token = useCookie('token');
        token.value = token.value || '';

        const authStore = useAuthStore();
        authStore.setToken(token.value);

        if (!authStore.isAuthenticated) {
            console.log('auth middleware, no token');
        } else {
            console.log('auth middleware, token exists');
            const queryGetDeposit = gql`
                query getDepositOfUser($username: String!) {
                    getDepositOfUser(username: $username)
                }
            `;

            console.log('Stored Username: ', authStore.username);

            const variables = {
                username: authStore.username,
            };

            const { data } = await useAsyncQuery(queryGetDeposit, variables);

            authStore.setDeposit(data.value.getDepositOfUser);
            console.log(
                'auth middleware, fetched deposit:',
                data.value.getDepositOfUser
            );
        }
    }
});
