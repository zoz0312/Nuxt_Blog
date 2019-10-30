<template>
	<v-container>
		<div v-for="item in items" v-bind:key="item._id">
		<Card v-bind:propsdata="item"></Card>
		</div>
	</v-container>
</template>

<script>
import '~/mixin/global_mixin'
import Card from '../layouts/card';

export default {
	data () {
		return {
			items: []
		}
	},
	mounted () {
		this.$http.get('/write').then((result) => {
			this.items = Object.assign({}, result.data.data);
		}).catch((err) => {
			console.log('err', err);
		})
	},
	components: {
		Card
	}
}
</script>
