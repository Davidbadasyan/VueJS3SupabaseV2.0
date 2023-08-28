<template>
	<h1> Login </h1>
	<div v-if="!isReset">
		<div class="inputContainer">
			<label for="email"> Email: </label>
			<input type="email" id="email" v-model="email">
		</div>

		<div class="inputContainer">
			<label for="email"> Password: </label>
			<input type="password" id="password" v-model="password">
		</div>

	</div>
	<div v-else class="inputContainer">
		<label for="email"> Email: </label>
		<input type="email" id="email" v-model="email">
	</div>


	<div class="buttonContainer">
		<div v-if="!isReset" class="buttonContainer">
			<button @click="login"> Login </button>
			<button @click="loginWithGoogle"> Login with Google </button>
			<button @click="loginWithAzure"> Login with Azure </button>
			<button @click="isReset = !isReset"> Reset </button>
		</div>
		<button v-if="isReset" @click="isReset = !isReset"> Back </button>
		<button v-if="isReset" @click="send"> Send </button>

	</div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../clients/supabase"
import router from "../router";

let email = ref("");
let password = ref("");
let isReset = ref(false)


async function login() {
	console.log("run")
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value
	})
	router.push("/secret")
	if (error) {
		alert(error)
		console.log(error);
	}
	else {
		console.log(data);
	}
}

async function send() {
	await supabase.auth.resetPasswordForEmail(email.value)
	alert('please check your email')
}

async function loginWithGoogle() {
	supabase.auth.signInWithOAuth({
		provider: 'google',
	})
}

async function loginWithAzure() {
	await supabase.auth.signInWithOAuth({
		provider: 'azure',
		options: {
			scopes: 'email',
		},
	})
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