<template>
    <h3>Update Your Password </h3>
    <div class="inputContainer">
        <label for="email"> New Password: </label>
        <input type="password" id="password" v-model="newPassword">
    </div>
    <div class="buttonContainer">
        <button @click="update"> Update </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from "../clients/supabase"
import router from '../router';

let newPassword = ref("");

const update = async () => {
    await supabase.auth.updateUser({ password: newPassword.value })
    router.push("/login");
}

</script>

<style>
.inputContainer {
    display: flex;
    flex-direction: column;
}

button {
    margin-bottom: 1em;
    padding: 1em 2em 1em 2em;
}

input {
    font-size: 1.5em;
}

.buttonContainer {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
}
</style>