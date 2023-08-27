<template>
    <h1> Sign Up </h1>
    <div v-if="!isReset">
        <div class="inputContainer">
            <label for="email"> Email: </label>
            <input type="email" id="email" v-model="email">
        </div>

        <div class="inputContainer">
            <label for="email"> Password: </label>
            <input type="password" id="password" v-model="password">
        </div>

        <div class="inputContainer">
            <label for="firstName"> First Name </label>
            <input type="firstName" id="firstName" v-model="firstName">
        </div>

    </div>
    <div v-else class="inputContainer">
        <label for="email"> Email: </label>
        <input type="email" id="email" v-model="email">
    </div>


    <div class="buttonContainer">
        <div v-if="!isReset" class="buttonContainer">
            <button @click="createAccount"> Create </button>
        </div>
        <button v-if="isReset" @click="isReset = !isReset"> Back </button>
        <button v-if="isReset" @click="send"> Send </button>

    </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../clients/supabase"
import router from '../router';

let email = ref("");
let password = ref("");
let firstName = ref("");
let isReset = ref(false)

async function createAccount() {
    const { user, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
            data: {
                first_name: firstName.value
            }
        }
    })
    alert('link sent to your email, please confirm')
    router.push("/login");
    if (user) {
        alert('')
    }
    if (error) {
        alert(error)
        console.log(error);
    }
    else {
        console.log(user);
    }
}


async function send() {
    await supabase.auth.resetPasswordForEmail(email.value)
    alert('please check your email')
}


</script>

<style scoped>
.inputContainer {
    display: flex;
    flex-direction: column;
}

input {
    font-size: 1.5em;
}

.buttonContainer {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
}

button {
    margin-bottom: 1em;
    padding: 1em 2em 1em 2em;
}
</style>