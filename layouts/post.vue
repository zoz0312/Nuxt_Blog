<template>
	<div
		class="mx-auto pa-5"
		max-width="800"
	>
		<v-row>
			<v-col cols="3">
				<v-overflow-btn
					class="my-2"
					color="blue darken-1"
					item-color="blue darken-1"
					:items="dropdown_edit"
					v-model="category"
					label="카테고리"
				></v-overflow-btn>
			</v-col>
			<v-col cols="9">
				<v-text-field
					v-model="title"
					label="제목"
					color="blue darken-1"
				></v-text-field>
			</v-col>
		</v-row>
		<Editor	ref="editor" />
		<v-hover
			v-slot:default="{ hover }"
		>
			<v-btn
				class="mt-5 white--text"
				color="#428bca"
				@click="write"
				:elevation="hover ? 10 : 2"
				block
			>{{ propsdata.btn_text }}</v-btn>
		</v-hover>
	</div>
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
