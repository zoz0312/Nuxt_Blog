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
	nuxtServerInit ({ commit }, { req, app }) {
		// nuxtServerInit 에서는
		// axios.get() -> app.$axios.$get()
		// nuxt.config.js에서 baseURL 설정했기 때문에
		// 상대 경로만 설정하면 되고, 통신 결과는 데이터만
		// 추출되기 때문에 res.data가 아닌, data를
		// 바로 사용할 수 있다.
		const ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
		app.$axios.post('/api/pageHit', { 'userIp': ip });
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
