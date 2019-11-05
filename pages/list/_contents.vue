<template>
	<v-container
		class="text-center">
		<div
			v-for="item in items"
			v-bind:key="item._id"
		>
			<Card
				v-bind:propsdata="item"
				width="100%"
				max-height="300"
				class="mb-4 ml-5 mr-5"
			></Card>
		</div>
	</v-container>
</template>

<script>
import '~/mixin/global_mixin'
import Card from '../../layouts/card';

export default {
	asyncData ({ params }) {
		return {
			contents: params.contents
		}
	},
	data () {
		return {
			items: {}
		}
	},
	mounted () {
		this.get_post_list();
	},
	methods: {
		get_post_list () {
			this.$http.post('/list/' + this.contents).then((result) => {
				this.items = Object.assign({}, result.data.data);
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
