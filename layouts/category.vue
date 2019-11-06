<template>
	<v-card
		class="mx-auto pa-5"
		max-width="800"
	>
		<Alert ref="alert"/>
		<v-text-field
			v-model="title"
			label="카테고리 이름"
			color="blue darken-1"
			:rules="input_rules"
			required
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
import Alert from '~/components/alert.vue'

export default {
	props: ['propsdata'],
	data () {
		return {
			title: '',
			input_rules: [
				v => !!v || '카테고리 이름을 입력해주세요.'
			]
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
			if (!this.useString(this.title)) {
				this.$refs.alert.set_alert_text('카테고리 이름을 입력해주세요.', 'error');
				return;
			}
			const d = {
				_id: this.propsdata.post ? this.propsdata.post : 0,
				title: this.title
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
