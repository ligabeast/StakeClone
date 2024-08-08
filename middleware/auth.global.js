import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    return;
  }
  console.log("auth middleware");
  if (import.meta.client) {
    const token = useCookie("token");
    token.value = token.value || "";

    const authStore = useAuthStore();
    authStore.setToken(token.value);

    setPageLayout("main");
    if (!authStore.isAuthenticated) {
      console.log("auth middleware, no token");
    } else {
      console.log("auth middleware, token exists");
      const queryGetDeposit = gql`
        query {
          getDepositOfUser(userid: "1")
        }
      `;
      const { data } = await useAsyncQuery(queryGetDeposit);

      authStore.setDeposit(data.value.getDepositOfUser);
      console.log(
        "auth middleware, fetched deposit:",
        data.value.getDepositOfUser
      );
    }
  }
});
