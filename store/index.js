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
		try {
			const { data } = await axios.post('/login', { username, password })
			commit('SET_USER', data.data.auth)
			this.$router.push('/')
		} catch (error) {
			if (error.response && error.response.status === 401) {
				throw new Error('Bad credentials')
			}
			throw error
		}
	},
	async logout ({ commit }) {
		await axios.post('/logout')
		commit('SET_USER', null)
	}
}
