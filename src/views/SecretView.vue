<template>
	<div class="about">
		<h1>This is protected content</h1>
		<p id="account"> Account: {{ account.data && account.data.session.user.email }}</p>
		<p> Protect the secret password: **TMX$$ </p>
		<button @click="logout"> Logout </button>

	</div>
</template>

<script setup>
import { supabase } from '../clients/supabase';
import { ref, onMounted } from "vue";
import router from '../router';


const account = ref('');

onMounted(async () => {
	await getSession();
})

async function getSession() {
	account.value = await supabase.auth.getSession();
}
async function logout() {
	const { error } = await supabase.auth.signOut();
	router.push('/login')
	if (error) {
		console.log(error);
	}
	else {
		console.log("Sign out success")
	}
}
</script>

<style>
#account {
	color: green;
}

button {
	margin-bottom: 1em;
	padding: 1em 2em 1em 2em;
}

input {
	font-size: 1.5em;
}
</style>
