<template>
    <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/30">
        <div class="w-full h-full flex justify-center items-center">
            <div class="border-2 border-gray-300 rounded-xl bg-white p-8">
                <form>
                <h1 class="text-center text-xl font-bold">S'authentifier  {{ success }}</h1>
                &nbsp;<br/>
                <label class="input-group">
                    <span>Pseudo</span>
                    <input type="text" placeholder="login" class="input input-bordered" v-model="pseudo" />
                </label>
                &nbsp;<br/>
                <label class="input-group">
                    <span>Email</span>
                    <input type="email" autocomplete="username" placeholder="adresse électronique" class="input input-bordered" v-model="email" />
                </label>
                &nbsp;<br/>
                <label class="input-group">
                    <span>Mot de passe</span>
                    <input type="password" autocomplete="new-password" placeholder="mot de passe" class="input input-bordered" v-model="password" />
                </label>
                &nbsp;<br/>
                <label class="input-group">
                    <span>Confirmation</span>
                    <input type="password" autocomplete="new-password" placeholder="comfirmer mot de passe" class="input input-bordered" v-model="password2" />
                </label>
                <div v-if="error" v-html="error"></div>
                &nbsp;<br/>
                <div class="flex justify-between">
                    <button class="btn btn-primary" v-on:click.prevent="register()">S'authentifier</button>
                    <router-link to="/" class="btn btn-primary">Annuler</router-link>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, inject } from 'vue'
    const pseudo = ref<string>('')
    const password = ref<string>('')
    const password2= ref<string>('')
    const email = ref<string>('')

    const error = inject('error')
    const success = inject('success')

    const register = () => {
        window.Wsocket?.SendAction('auth:register',{
            pseudo:pseudo.value,
            password:password.value,
            email:email.value
        })        
    }
</script>
<style lang="postcss" scoped>
    .input-group {
        @apply grid grid-cols-[1fr_2fr];
    }
</style>