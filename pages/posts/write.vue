<template>
	<v-card
		class="mx-auto pa-5"
		max-width="800"
	>
		<v-text-field
			v-model="title"
			label="제목"
		></v-text-field>
		<v-text-field
			v-model="contents"
			label="내용"
		></v-text-field>
		<v-btn
			class="mr-4"
			block
			@click="write"
		>작성하기</v-btn>
		<v-item>
		{{ item }}
		</v-item>
	</v-card>
	</template>

<script>
import '~/mixin/global_mixin'

export default {
	data () {
		return {
			title: '',
			contents: '',
			console: '',
			item: {}
		}
	},
	beforeCreate () {
		this.$http.get('/write').then((result) => {
			this.item = Object.assign({}, result.data.data);
		}).catch((err) => {
			console.log('err', err);
		})
	},
	methods: {
		write () {
			const d = {
				title: this.title,
				contents: this.contents
			};
			this.console = d;
			this.$http.post('/write', d).then((result) => {
				console.log('result', result.data)
			}).catch((err) => {
				console.log('err', err)
			});
		}
	}
}
</script>
