<template>
  <div class="fixed bottom-0 right-0 h-auto w-96 border-2 border-b-0 border-r-0 border-gray p-4 cursor-pointer z-10 bg-white">
    <div v-on:click="toogle = !toogle" class="font-bold">Debug</div>
    <div v-if="toogle">
      <template v-if="typeof error !== 'undefined'">
        <hr>
        <div class="grid grid-cols-[1fr_2fr]">
          <b>Erreur : </b>
          <span>{{ error }}</span>
        </div>
      </template>
      <template v-if="typeof success !== 'undefined'">
        <hr>
        <div class="grid grid-cols-[1fr_2fr]">
          <b>Success :</b>
          <span>{{ success }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, inject } from "vue";
import type { Ref } from "vue";
import { LoginAuth } from "../type";
const toogle = ref(false);

const error = inject<Ref<string>>("error");
const success = inject<Ref<string>>("success");


</script>
<style lang="postcss"></style>
