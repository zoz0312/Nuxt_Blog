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
		const postTitle = this.title ? this.title : '글 목록';
		return {
			title: `AJu Blog - ${postTitle}`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'description'
				}
			]
		}
	},
	mounted () {
		this.get_title();
		this.get_post_list();
	},
	methods: {
		async get_title () {
			const { data } = await this.$http.post('/list/title/' + this.contents);
			this.title = data.data;
		},
		get_post_list () {
			this.$http.post('/list/' + this.contents).then((result) => {
				this.items = result.data.data;
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
