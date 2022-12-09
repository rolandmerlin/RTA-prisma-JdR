<template>
    <div class="fixed top-0 left-0 right-0 navbar bg-base-100 z-20 m-0 px-4 py-0" style="box-shadow:0 0 3px black;">
        <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">JdR Donjons et dragons</a>
        </div>
        <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
            <li tabindex="0">
            <a>
                Parent
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul class="p-2 bg-base-100">
                <li><a>Item 3</a></li>
            </ul>
            </li>
            <li v-if="!auth"><router-link to="/login" class="link no-underline">Login</router-link></li>
            <li v-if="!auth"><router-link to="/register" class="link no-underline">Register</router-link></li>
            <li v-if="auth"><router-link to="/logout" class="link no-underline">Logout</router-link></li>      
        </ul>
    </div>
</div>
</template>
<script setup lang="ts">
    import type { ComputedRef } from "vue";
    import { computed } from "vue";
    import { useStore } from "vuex";
    const store = useStore();
    const auth: ComputedRef<boolean> = computed( () => typeof store.getters.auth !== "boolean" );
</script>
<style lang="postcss">
    .link {
        @apply inline-block leading-10 px-2;
    }
</style>
