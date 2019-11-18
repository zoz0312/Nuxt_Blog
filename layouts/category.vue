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
				></v-overflow-btn>
			</v-col>
			<v-col cols="9">
				<v-text-field
					v-model="title"
					label="카테고리 이름"
					color="blue darken-1"
					:rules="input_rules"
					required
				></v-text-field>
			</v-col>
		</v-row>
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
import Alert from '~/components/alert';

export default {
	props: ['propsdata'],
	data () {
		return {
			title: '',
			input_rules: [
				v => !!v || '카테고리 이름을 입력해주세요.'
			],
			category: {},
			dropdown_edit: [{
				text: '',
				value: '0'
			}]
		}
	},
	mounted () {
		if (this.propsdata.type === 'update') {
			this.get_category_id();
		}
		this.get_category();
	},
	methods: {
		get_category () {
			let cateObj;
			let i;
			this.$http.post('/category').then((result) => {
				cateObj = Object.assign({}, result.data.data);
				const key = Object.keys(cateObj);
				for (i = 0; i < key.length; i++) {
					this.dropdown_edit.push({
						text: cateObj[key[i]].title,
						value: {
							id: cateObj[key[i]]._id,
							parentIdx: cateObj[key[i]].parentIdx
						}
					});
					console.log('i', i)
				}
				console.log('this.dropdown_edit', this.dropdown_edit);
				if (this.propsdata.type === 'update') {
					this.get_post();
				}
			}).catch((err) => {
				console.log('err', err);
			})
		},
		get_category_id () {
			this.$http.post('/category/' + this.propsdata.post).then((result) => {
				this.title = result.data.data.title;
			}).catch((err) => {
				console.log('err', err);
			})
		},
		write () {
			if (!this.useString(this.title)) {
				this.$refs.alert.set_alert_text('카테고리 이름을 입력해주세요.', 'error');
				return;
			}
			const d = {
				_id: this.propsdata.post ? this.propsdata.post : 0,
				title: this.title,
				parentIdx: this.category.parentIdx
			};
			this.$http.post('/category/' + this.propsdata.type, d).then(() => {
				this.$refs.alert.set_alert_text('성공적으로 작성되었습니다.', 'success', true);
			}).catch((err) => {
				console.log('err', err)
			});
		}
	},
	components: {
		Alert
	}
}
</script>
