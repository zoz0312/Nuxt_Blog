<template>
	<v-card
		class="mx-auto pa-5"
		max-width="800"
	>
		<v-text-field
			v-model="title"
			label="카테고리 명"
		></v-text-field>
		<v-btn
			class="mr-4"
			block
			@click="write"
		>작성하기</v-btn>
	</v-card>
	</template>

<script>
import '~/mixin/global_mixin'

export default {
	data () {
		return {
			title: ''
		}
	},
	methods: {
		write () {
			const d = {
				title: this.title
			};
			this.console = d;
			this.$http.post('/category', d).then((result) => {
				console.log('result', result.data)
			}).catch((err) => {
				console.log('err', err)
			});
		}
	}
}
</script>
