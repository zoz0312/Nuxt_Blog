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
			last_idx: 0,
			category: {},
			dropdown_edit: [{
				text: '',
				value: {
					id: 0,
					parentIdx: '-1'
				}
			}]
		}
	},
	mounted () {
		this.get_category();
	},
	methods: {
		get_category () {
			let cateArr;
			let i;
			this.$http.post('/category').then((result) => {
				cateArr = [...result.data.data];
				for (i = 0; i < cateArr.length; i++) {
					const spLen = cateArr[i].parentIdx.split('.').length;
					if (spLen < 3) {
						if (spLen === 1) {
							this.last_idx++;
						}
						this.dropdown_edit.push({
							text: cateArr[i].title,
							value: {
								id: cateArr[i]._id,
								parentIdx: cateArr[i].parentIdx
							}
						});
					}
				}
			}).catch((err) => {
				console.log('err', err);
			})
		},
		write () {
			if (!this.useString(this.title)) {
				this.$refs.alert.set_alert_text('카테고리 이름을 입력해주세요.', 'error');
				return;
			}
			let parentIdx = this.category.parentIdx;
			if (parentIdx === '-1') {
				parentIdx = String(this.last_idx);
			} else {
				parentIdx += '.0'
			}
			const d = {
				_id: this.propsdata.post ? this.propsdata.post : 0,
				title: this.title,
				parentIdx
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
