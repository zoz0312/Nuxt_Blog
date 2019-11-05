<template>
	<v-card
		class="mx-auto pa-5"
		max-width="800"
	>
		<v-text-field
			v-model="title"
			label="제목"
		></v-text-field>
		<Editor	ref="editor" />
		<v-col cols="12" sm="4">
			<p>Segmented</p>
			<v-overflow-btn
				class="my-2"
				:items="dropdown_edit"
				v-model="category"
				label="Select Category"
			></v-overflow-btn>
		</v-col>
		{{ editor_val }}
		<v-btn
			class="mr-4"
			block
			@click="write"
		>{{ propsdata.btn_text }}</v-btn>
	</v-card>
</template>

<script>
import Editor from '~/components/editor.vue'

export default {
	props: ['propsdata'],
	data () {
		return {
			title: '',
			dropdown_edit: [],
			category_id: [],
			category: '',
			editor_val: ''
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
				if (this.propsdata.type === 'update') {
					this.get_post();
				}
			}).catch((err) => {
				console.log('err', err);
			})
		},
		write () {
			const d = {
				_id: this.propsdata.post ? this.propsdata.post : 0,
				title: this.title,
				contents: this.$refs.editor.return_value(),
				category_id: this.category_id[this.dropdown_edit.indexOf(this.category)]
			};
			this.$http.post('/post/' + this.propsdata.type, d).catch((err) => {
				console.log('err', err)
			});
		},
		get_post () {
			this.$http.post('/post/' + this.propsdata.post).then((result) => {
				this.title = result.data.data.title;
				this.$refs.editor.intert_value(result.data.data.content);
				this.category = this.dropdown_edit[this.category_id.indexOf(result.data.data.categoryId)];
			}).catch((err) => {
				console.log('err', err);
			})
		}
	},
	components: {
		Editor
	}
}
</script>
