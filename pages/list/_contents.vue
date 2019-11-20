<template>
	<v-container
		class="text-center">
		<div
			v-for="(item, index) in items"
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
	data () {
		return {
			items: {},
			title: ''
		}
	},
	async asyncData ({ params }) {
		const data = await axios.post('/list/title/' + params.contents);
		const data2 = await axios.post('/list/' + params.contents);
		return {
			items: data2.data.data,
			title: data.data.data
		}
	},
	head () {
		return {
			title: `${this.$store.state.blogTitle} ${this.title}`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: `${this.title}`
				}
			]
		}
	},
	components: {
		Card
	}
}
</script>
