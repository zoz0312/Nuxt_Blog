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
import Card from '../../layouts/card';

export default {
	asyncData ({ params }) {
		return {
			contents: params.contents
		}
	},
	data () {
		return {
			items: {},
			title: ''
		}
	},
	head () {
		return {
			title: 'AJu Blog - ' + this.title
		}
	},
	mounted () {
		this.get_post_list();
	},
	methods: {
		get_post_list () {
			this.$http.post('/list/' + this.contents).then((result) => {
				this.items = result.data.data.arr;
				this.title = result.data.data.title;
			}).catch((err) => {
				console.log('err', err);
			});
		}
	},
	components: {
		Card
	}
}
</script>
