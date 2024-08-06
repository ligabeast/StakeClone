import { useAuthStore } from "~/stores/auth";
import { useMyFetch } from "~/composable/useMyFetch";
export default defineNuxtRouteMiddleware((to, from) => {
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
      useMyFetch("/login", {
        method: "POST",
      })
        .then((data) => {
          authStore.setDeposit(data.deposit);
          authStore.setUsername(data.username);
          authStore.setToken(data.token);

          token.value = data.token;
          console.log("auth middleware, fetched token");
        })
        .catch((error) => {
          console.log("auth middlewate, error: ", error);
        });
    } else {
      console.log("auth middleware, token exists");
    }
  }
});
