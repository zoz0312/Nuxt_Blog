export const state = () => ({
	html_title: null,
	items: null
})

export const mutations = {
	HTML_TITLE (state, title) {
		state.htmlTitle = title;
	},
	SET_ITEMS (state, item) {
		state.items = item;
	}
}
