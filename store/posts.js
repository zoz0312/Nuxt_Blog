export const state = () => ({
	content: null,
	category: null
})

export const mutations = {
	SET_CONTENT (state, content) {
		state.content = content;
	},
	SET_CATEGORY (state, category) {
		state.category = category;
	}
}
