import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../clients/supabase'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UnauthorizedView from '../views/UnauthorizedView.vue'
import UpdateView from '../views/UpdateView.vue'
import SignUp from '../views/SignupView.vue'

let localUser;

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/secret',
			name: 'secret',
			component: () => import('../views/SecretView.vue'),
			meta: { requiresAuth: true }
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView
		},
		{
			path: '/signup',
			name: 'signup',
			component: SignUp
		},
		{
			path: '/unauthorized',
			name: 'unauthorized',
			component: UnauthorizedView
		},
		{
			path: '/update',
			name: 'update',
			component: UpdateView,
		}
	]
})

async function getUser(next) {
	localUser = await supabase.auth.getSession();
	if (localUser.data.session == null) {
		next('/unauthorized')
	}
	else {
		let expires_at = localUser.data.session.expires_at
		let current_date = Date.now() / 1000
		if (current_date > expires_at) {
			await supabase.auth.signOut();
			next('/unauthorized')
		}
		next();
	}
}


router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		getUser(next);
	}
	else {
		next();
	}
})

export default router
