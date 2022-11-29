<template>
  <debug />
  <navigation />
  <div class="app--content">
    <router-view />
    <ceditormap class="w-[600px] h-[600px]" :grille="12" />
  </div>
</template>
<script setup lang="ts">
import ceditormap from "./components/editor_map.vue";
import navigation from "./components/navigation.vue";
import debug from "./components/debug.vue";
import { ref, provide, watch } from "vue";
import type { Ref } from "vue";
import { useStore } from "vuex";
import Socket from "./lib/websocket";
import { Tmessage } from "./type";
import { useRouter } from "vue-router";
//// Connexion
window.Wsocket = new Socket();
let Wsocket = window.Wsocket;
const store = useStore();
const router = useRouter();

//// Synchro avec la fenetre de login
const login: Ref<string> = ref<string>("");
const passwd: Ref<string> = ref<string>("");
const error: Ref<string> = ref<string>("");
const success: Ref<string> = ref<string>("");
const time: Ref<number> = ref(0);
provide("auth", { login, passwd, time });
provide("error", error);
provide("success", success);

if (localStorage.getItem("auth"))
  window.Wsocket.SendAction("auth:reauth", {
    ...JSON.parse(localStorage.getItem("auth") || "{}"),
  });

///// Action d'authentification
watch(time, () => {
  Wsocket.SendAction("auth:login", { login: login.value, password: passwd.value });
});
Wsocket.OnMessage("auth:accept", (message: Tmessage) => {
  localStorage.setItem("auth", JSON.stringify(message));
  store.commit("auth", message);
});
Wsocket.OnMessage("auth:logout", (message: Tmessage) => {
  localStorage.setItem("auth", "");
  store.commit("auth", false);
});
Wsocket.OnMessage("error", (message: Tmessage) => {
  error.value = (typeof message.error === "undefined" && message.error) || "";
});
Wsocket.OnMessage("success", (message: Tmessage) => {
  console.log("SUCCESS = ", message);
  if (typeof message.success === "undefined") return;
  success.value = message.success || "";
  switch (message.success) {
    case "ReAuth":
      localStorage.setItem("auth", JSON.stringify(message.user));
      store.commit("auth", message.user);
      break;
    case "Logout":
      console.log("--- Logout ---");
      localStorage.setItem("auth", "");
      store.commit("auth", false);
      router.push("/");
      break;
    case "auth:accept":
      localStorage.setItem("auth", JSON.stringify(message.user));
      store.commit("auth", message.user);
      router.push("/");
      break;
    case "RegisterOK":
      router.push("/");
  }
});
</script>
<style>
.app--content {
  @apply absolute top-[42px] bottom-0 left-0 right-0 py-2;
}
</style>
