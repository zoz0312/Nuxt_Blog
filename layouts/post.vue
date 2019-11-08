<template>
	<v-card
		class="mx-auto pa-5"
		max-width="800"
	>
		<Alert ref="alert"/>
		<v-row align="end">
			<v-col cols="3">
				<v-overflow-btn
					class="mt-2"
					color="blue darken-1"
					item-color="blue darken-1"
					:items="dropdown_edit"
					v-model="category"
					label="카테고리"
					:rules="category_rule"
				></v-overflow-btn>
			</v-col>
			<v-col cols="9">
				<v-text-field
					v-model="title"
					label="제목"
					color="blue darken-1"
					:rules="title_rule"
				></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="py-0">
				<v-file-input
					:v-model="thumbnail"
					accept="image/png, image/jpeg"
					placeholder="썸네일을 넣어주세요"
					prepend-icon="mdi-camera"
					label="썸네일"
					@change="thumbnail_change"
				></v-file-input>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<img :src="thumbnail"/>
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
	</v-card>
</template>

<script>
import Editor from '~/components/editor'
import Alert from '~/components/alert'

export default {
	props: ['propsdata'],
	data () {
		return {
			title: '',
			dropdown_edit: [],
			thumbnail: [],
			thumbnail_size: 0,
			category_id: [],
			category: '',
			editor_val: '',
			category_rule: [
				v => !!v || '카테고리를 선택해주세요.'
			],
			title_rule: [
				v => !!v || '제목을 입력해주세요.'
			],
			imgSrc: null
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
		thumbnail_change (file) {
			if (file !== undefined) {
				const reader = new FileReader();
				reader.onload = (event) => {
					this.imgSrc = file;
					this.thumbnail = event.target.result;
				}
				reader.readAsDataURL(file)
				this.thumbnail_size = file.size;
			}
		},
		write () {
			const editorText = this.$refs.editor.return_value();
			if (!this.useString(this.category)) {
				this.$refs.alert.set_alert_text('카테고리를 선택해주세요.', 'error');
				return;
			}
			if (!this.useString(this.title)) {
				this.$refs.alert.set_alert_text('제목을 입력해주세요.', 'error');
				return;
			}
			if (!this.useString(editorText)) {
				this.$refs.alert.set_alert_text('내용을 입력해주세요.', 'error');
				return;
			}
			if (this.thumbnail_size > 2048000) {
				this.$refs.alert.set_alert_text('썸네일의 크기가 2MB 이상입니다.', 'error');
				return;
			}
			const d = {
				_id: this.propsdata.post ? this.propsdata.post : 0,
				title: this.title,
				contents: editorText,
				category_id: this.category_id[this.dropdown_edit.indexOf(this.category)],
				thumbnail: this.thumbnail
			};
			this.$http.post('/post/' + this.propsdata.type, d).then(() => {
				this.$refs.alert.set_alert_text('성공적으로 작성되었습니다.', 'success', true);
			}).catch((err) => {
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
		Editor,
		Alert
	}
}
</script>
<style scoped>
img {
	width: 100%;
}
</style>
