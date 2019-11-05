<template>
	<v-card
		class="mx-auto pa-5"
		max-width="800"
	>
		<v-text-field
			v-model="title"
			label="카테고리 명"
			color="blue darken-1"
		></v-text-field>
		<v-hover
			v-slot:default="{ hover }"
		>
			<v-btn
				class="mt-2 white--text"
				color="#428bca"
				block
				@click="write"
				:elevation="hover ? 10 : 2"
			>{{ propsdata.btn_text }}</v-btn>
		</v-hover>
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
		if (this.propsdata.type === 'update') {
			this.get_category_id();
		}
	},
	methods: {
		get_category_id () {
			this.$http.post('/category/' + this.propsdata.post).then((result) => {
				this.title = result.data.data.title;
			}).catch((err) => {
				console.log('err', err);
			})
		},
		write () {
			const d = {
				_id: this.propsdata.post ? this.propsdata.post : 0,
				title: this.title
			};
			this.$http.post('/category/' + this.propsdata.type, d).catch((err) => {
				console.log('err', err)
			});
		}
	}
}
</script>
