<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/30">
    <div class="w-full h-full flex justify-center items-center">
      <div class="border-2 border-gray-300 rounded-xl bg-white text-center p-8">
        Voulez-vous vous déconnecter ?<br />
        &nbsp;<br />
        <div class="grid grid-cols-2 gap-8">
          <button class="btn btn-primary" v-on:click="logout()">Se déconnecter</button>
          <router-link to="/" class="btn btn-primary">Annuler</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, inject, watch } from "vue";
import type { Ref } from "vue";
const L = ref("");
const P = ref("");
const E = ref("");

type LoginAuth = {
  login: Ref<string>;
  passwd: Ref<string>;
  errorLogin: Ref<string>;
  time: Ref<number>;
};

const logout = () => {
  window.Wsocket?.SendAction("auth:logout", {});
};
</script>
<style lang="postcss"></style>
