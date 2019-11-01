<template>
	<v-container>
		<div v-for="item in items" v-bind:key="item._id">
			<Card v-bind:propsdata="item"></Card>
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
