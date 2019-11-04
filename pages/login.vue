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
		<NuxtLink to="/secret">
      Back to the home page
    </NuxtLink>
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
		async login () {
			await this.$store.dispatch('login', {
				username: this.user_id,
				password: this.user_pw
			}).then(() => {
				this.user_id = ''
				this.user_pw = ''
			}).catch((err) => {
				console.log('err', err)
			})
		}
	}
}
</script>
