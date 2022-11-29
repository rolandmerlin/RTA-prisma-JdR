<template>
  <nav
    class="fixed top-0 left-0 right-0 leading-10 px-4 font-bold border-b-2 border-b-gray-300 text-xl"
  >
    <div class="flex justify-between w-full h-full">
      <router-link to="/" class="font-bold">Titre</router-link>
      <div class="inline-block h-full text-base no-underline">
        <router-link to="/login" class="link no-underline" v-if="!auth"
          >Login</router-link
        >
        <router-link to="/register" class="link no-underline" v-if="!auth"
          >Register</router-link
        >
        <router-link to="/logout" class="link no-underline" v-if="auth"
          >Logout</router-link
        >
        <div class="inline-block rotate-90 leading-10 w-10 h-10 text-center">&gt;</div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const auth: ComputedRef<boolean> = computed(
  () => typeof store.getters.auth !== "boolean"
);
</script>
<style lang="postcss">
.link {
  @apply inline-block leading-10 px-2;
}
</style>
