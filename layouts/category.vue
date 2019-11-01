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
		>{{ propsdata.btn_text }}</v-btn>
	</v-card>
</template>

<script>
export default {
	props: ['propsdata'],
	data () {
		return {
			title: ''
		}
	},
	mounted () {
		this.get_category_id();
	},
	methods: {
		get_category_id () {
			let cateIdObj;
			this.$http.post('/category/' + this.propsdata.post).then((result) => {
				cateIdObj = Object.assign({}, result.data.data);
				this.title = cateIdObj.title;
			}).catch((err) => {
				console.log('err', err);
			})
		},
		write () {
			const d = {
				title: this.title
			};
			this.console = d;
			this.$http.post('/category/' + this.propsdata.type, d).then((result) => {
				console.log('result', result.data)
			}).catch((err) => {
				console.log('err', err)
			});
		}
	}
}
</script>
