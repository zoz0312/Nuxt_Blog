<template>
	<v-card
		class="mx-auto pa-5"
		max-width="800"
	>
		<v-text-field
			v-model="items.title"
			label="제목"
		></v-text-field>
		<v-text-field
			v-model="items.writer"
			label="작성자"
		></v-text-field>
		<div v-html="items.content"></div>
	</v-card>
</template>

<script>
import '~/mixin/global_mixin'

export default {
	asyncData ({ params }) {
		return {
			post: params.post
		}
	},
	data () {
		return {
			items: {}
		}
	},
	mounted () {
		this.$http.post('/post/' + this.post).then((result) => {
			this.items = Object.assign({}, result.data.data);
		}).catch((err) => {
			console.log('err', err);
		})
	}
}
</script>
