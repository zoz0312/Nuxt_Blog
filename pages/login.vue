<template>
  <v-card
    class="mx-auto pa-5"
    max-width="800"
  >
    <Alert ref="alert"/>
    <v-card-title
      height="200px"
    >
      <v-icon
        class="mr-3"
      >mdi-lock</v-icon>
      <span class="title font-weight-light">Login</span>
    </v-card-title>
    <v-text-field
      v-model="user_id"
      label="ID"
      :rules="id_rule"
    ></v-text-field>
    <v-text-field
      v-model="user_pw"
      label="Password"
      :rules="pw_rule"
    ></v-text-field>
    <v-btn
      class="mr-4 white--text"
      block
			color="#428bca"
      @click="login"
    >Login</v-btn>
  </v-card>
</template>

<script>
import '~/mixin/global_mixin'
import Alert from '~/components/alert'

export default {
	layout: 'login',
	data: () => ({
		user_id: '',
		user_pw: '',
		id_rule: [
			v => !!v || 'ID를 입력해주세요.'
		],
		pw_rule: [
			v => !!v || 'Password를 입력해주세요.'
		]
	}),

	methods: {
		async login () {
			if (!this.useString(this.user_id)) {
				this.$refs.alert.set_alert_text('ID를 입력해주세요.', 'error');
				return;
			}
			if (!this.useString(this.user_pw)) {
				this.$refs.alert.set_alert_text('Password를 입력해주세요', 'error');
				return;
			}
			await this.$store.dispatch('login', {
				username: this.user_id,
				password: this.user_pw
			}).then(() => {
				if (this.$store.state.authUser === null) {
					this.$refs.alert.set_alert_text('ID 또는 Password가 잘못되었습니다.', 'error');
				} else {
					this.$refs.alert.set_alert_text('로그인 성공!', 'success', true);
				}
			}).catch((err) => {
				console.log('Login Err', err);
				this.$refs.alert.set_alert_text('ID 또는 Password가 잘못되었습니다.', 'error');
			})
		}
	},
	components: {
		Alert
	}
}
</script>
