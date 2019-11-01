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
		<v-col cols="12" sm="4">
			<p>Segmented</p>

			<v-overflow-btn
				class="my-2"
				:items="dropdown_edit"
				v-model="category"
				label="Select Category"
			></v-overflow-btn>
		</v-col>
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
			title: '',
			contents: '',
			dropdown_edit: [],
			category_id: [],
			category: ''
		}
	},
	mounted () {
		this.get_category();
	},
	methods: {
		get_category () {
			let cateObj;
			let i;
			this.$http.post('/category').then((result) => {
				cateObj = Object.assign({}, result.data.data);
				for (i = 0; i < Object.keys(cateObj).length; i++) {
					this.dropdown_edit.push(cateObj[i].title);
					this.category_id.push(cateObj[i]._id);
				}
				this.get_post();
			}).catch((err) => {
				console.log('err', err);
			})
		},
		write () {
			const d = {
				_id: this.propsdata.post ? this.propsdata.post : 0,
				title: this.title,
				contents: this.contents,
				category_id: this.category_id[this.dropdown_edit.indexOf(this.category)]
			};
			this.$http.post('/post/' + this.propsdata.type, d).then((result) => {
				console.log('result', result.data)
			}).catch((err) => {
				console.log('err', err)
			});
		},
		get_post () {
			this.$http.post('/post/' + this.propsdata.post).then((result) => {
				this.title = result.data.data.title;
				this.contents = result.data.data.content;
				this.category = this.dropdown_edit[this.category_id.indexOf(result.data.data.categoryId)];
			}).catch((err) => {
				console.log('err', err);
			})
		}
	}
}
</script>
