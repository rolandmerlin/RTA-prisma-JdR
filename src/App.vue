<template>
  <navigation />
  <div class="app--content">
    <router-view />
    <ceditormap class="w-screen h-[800px]" :grille="12" />
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
import { Tmessage, Tterrain } from "./type";
import { useRouter } from "vue-router";
//// Connexion
window.Wsocket = new Socket();
let Wsocket = window.Wsocket;
const store = useStore();
const router = useRouter();

//// Synchro avec la fenetre de login
const error: Ref<string> = ref<string>("");
provide("error", error);  
const success: Ref<string> = ref<string>("");
provide("success", success);  
const terrain: Ref<Tterrain[]> = ref<Tterrain[]>([]);
provide("terrain", { terrain });
Wsocket.SendAction('terrain:get',{})

if (localStorage.getItem("auth"))
  window.Wsocket.SendAction("auth:reauth", {
    ...JSON.parse(localStorage.getItem("auth") || "{}"),
  });

///// Action d'authentification
Wsocket.OnMessage("terrain:get",(message: Tmessage) => {
  if (typeof message.terrain == 'object') terrain.value = message.terrain
})
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
