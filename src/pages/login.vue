<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/30">
    <div class="w-full h-full flex justify-center items-center">
      <div class="border-2 border-gray-300 rounded-xl bg-white p-8">
        <form>
          <h1 class="text-center text-xl font-bold">S'authentifier</h1>
          &nbsp;<br />
          <label class="input-group">
            <span>Login</span>
            <input
              type="text"
              autocomplete="username"
              placeholder="login"
              class="input input-bordered"
              v-model="L"
            />
          </label>
          &nbsp;<br />
          <label class="input-group">
            <span>Email</span>
            <input
              type="password"
              autocomplete="current-password"
              placeholder="mot de passe"
              class="input input-bordered"
              v-model="P"
            />
          </label>
          <div v-if="E" v-html="E"></div>
          &nbsp;<br />
          <div class="flex justify-between">
            <button class="btn btn-primary" v-on:click.prevent="Login()">
              S'authentifier
            </button>
            <router-link to="/" class="btn btn-primary">Annuler</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, inject, watch } from "vue";
import type { Ref } from "vue";
import { LoginAuth } from "../type";
import { useRouter } from "vue-router";

const router = useRouter();

const L = ref<string>("");
const P = ref<string>("");
const E = inject<Ref<string>>("error");
const MsgError = ref<string>("");

const Login = () => {
  window.Wsocket?.SendAction("auth:login", { login: L.value, password: P.value });
};

watch(
  () => E,
  () => {
    if (typeof E !== "undefined") {
      switch (E.value) {
        case "login":
          MsgError.value = Message.login;
          break;
        case "email":
          MsgError.value = Message.email;
          break;
        case "password":
          MsgError.value = Message.password;
          break;
        case "auth:fail":
          MsgError.value = "Login/Mot de passe incrroect";
          break;
        default:
          MsgError.value = "";
      }
    }
  }
);

const Message = {
  email: `
        L'adresse mail doit :<br>
        - ne pas commencer ou finir par un point<br>
        - ne pas doit pas contenir d'espace<br>
        - ne pas contenir de caractères spéciaux<br>
        - contenir un @<br>
        <br>
        L'adresse mail peut contenir :<br>
        - contenir un point avant le @<br>
        - contenir un point après le @ ( par exemple : .gouv.fr )
        `,
  login: `
        Le pseudo doit commencer par :<br>
        - Une lettre masjucule ou minucules
        <br>
        Le pseudo doit contenir entre 4 et 255 caractères<br>
        <br>
        Le pseudo peut contenir :<br>
        - des lettres majuscules non accentués (A-Z) <br>
        - des lettres miniscules non accentués (a-z) <br>
        - des chiffres (0-9)
        `,
  password: `
        Le mot de passe doit contenir au moins <br>
        - un chiffre (0-9)<br>
        - une lettre majuscule (A-Z)<br>
        - une lettre miniscule (a-z)<br>
        - un caractère non-alpha numérique<br>
        &nbsp;<br>
        Le mot de passe ne doit pas contenir d'espace<br>
        &nbsp;<br>
        Le mot de passe doit comporter entre 8 et 32 caractères
        `,
};
</script>
<style lang="postcss"></style>
