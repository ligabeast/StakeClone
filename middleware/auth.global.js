import { useAuthStore } from "~/stores/auth";
import { useMyFetch } from "~/composable/useMyFetch";
export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) {
    return;
  }
  //store auth.js
  console.log("auth middleware");
  const authStore = useAuthStore();
  // get cookie
  setPageLayout("main");
  if (authStore.isAuthenticated) {
    if (decodedToken.exp < currentTime) {
      console.log("auth middleware, token has expired");
    } else {
      console.log("auth middleware, token is valid");
    }
    return;
  } else {
    console.log("auth middleware, no token");
    useMyFetch("/login", {
      method: "POST",
    })
      .then((data) => {
        authStore.setDeposit(data.deposit);
        authStore.setUsername(data.username);
        authStore.setToken(data.token);

        // $cookies.set("token", data.token, {
        //   maxAge: (60 * 60 * 24) / 24 / 60, // 1 minute
        // });
        // console.log("auth middleware, fetched token");
      })
      .catch((error) => {
        console.log("auth middlewate, error: ", error);
      });
  }
});
