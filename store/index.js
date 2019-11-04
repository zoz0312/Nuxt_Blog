import axios from 'axios'

export const state = () => ({
	authUser: null
})

export const mutations = {
	SET_USER (state, user) {
		console.log('set user', user)
		state.authUser = user
		console.log('state', state)
	}
}

export const actions = {
	nuxtServerInit ({ commit }, { req }) {
		console.log('req.session', req.session);
		if (req.session && req.session.authUser) {
			commit('SET_USER', req.session.authUser)
		}
	},
	async login ({ commit }, { username, password }) {
		try {
			const { data } = await axios.post('/login', { username, password })
			commit('SET_USER', data)
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
