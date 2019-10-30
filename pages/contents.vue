<template>
	<v-card
		class="mx-auto pa-5"
		max-width="800"
	>
		<div class="mt-12 text-center">
			Value: {{ item }}
		</div>
	</v-card>
	</template>

<script>
import '~/mixin/global_mixin'

export default {
	data () {
		return {
			item: null
		}
	},
	mounted () {
		this.$http.get('/write').then((result) => {
			this.item = Object.assign({}, result.data.data);
		}).catch((err) => {
			console.log('err', err);
		})
	}
}
</script>
