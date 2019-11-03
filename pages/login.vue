<template>
  <v-card
    class="mx-auto pa-5"
    max-width="800"
  >
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
    ></v-text-field>
    <v-text-field
      v-model="user_pw"
      label="Password"
    ></v-text-field>
    <v-btn
      class="mr-4"
      block
      @click="login"
    >Login</v-btn>
  </v-card>
</template>

<script>
import '~/mixin/global_mixin'

export default {
	layout: 'login',
	data: () => ({
		user_id: '',
		user_pw: ''
	}),

	methods: {
		login () {
			const d = {
				user_id: this.user_id,
				user_pw: this.user_pw
			}
			this.$http.post('/login', d).then((result) => {
				console.log(result);
			}).catch((error) => {
				console.log('error', error)
			});
		}
	}
}
</script>
