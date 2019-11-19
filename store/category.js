export const state = () => ({
	categories: []
})

export const mutations = {
	add (state, item) {
		state.categories.push(item)
	}
}
