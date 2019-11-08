import axios from 'axios'

export const state = () => ({
	authUser: null
})

export const mutations = {
	SET_USER (state, user) {
		state.authUser = user
	}
}

export const actions = {
	nuxtServerInit ({ commit }, { req }) {
		if (req.session && req.session.permission) {
			commit('SET_USER', req.session.permission);
		}
	},
	async login ({ commit }, { username, password }) {
		await axios.post('/login', { username, password }).then((result) => {
			if (result.data.success) {
				commit('SET_USER', result.data.data.auth);
			}
		}).catch((err) => {
			console.log('Login Error', err);
		})
	},
	async logout ({ commit }) {
		await axios.post('/logout')
		commit('SET_USER', null)
		this.$router.push('/')
	}
}
