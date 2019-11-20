<template>
	<v-container
		class="text-center">
		<div
			v-for="(item, index) in $store.state.list.items"
			v-bind:key="index"
			class="d-inline-block"
		>
			<Card
				v-bind:propsdata="item"
				class="mb-6 ml-5 mr-5"
				:ref="'card'+index"
			></Card>
		</div>
	</v-container>
</template>

<script>
import axios from 'axios'
import Card from '../../layouts/card';

export default {
	async fetch ({ store, params }) {
		const data = await axios.post('/list/title/' + params.contents);
		store.commit('list/HTML_TITLE', data.data.data);
		const data2 = await axios.post('/list/' + params.contents);
		store.commit('list/SET_ITEMS', data2.data.data);
	},
	data () {
		return {
			items: {}
		}
	},
	head () {
		return {
			title: `${this.$store.state.blogTitle} ${this.$store.state.list.htmlTitle}`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'description'
				}
			]
		}
	},
	components: {
		Card
	}
}
</script>
