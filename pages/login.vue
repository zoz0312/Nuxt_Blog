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
      v-model="name"
      :error-messages="nameErrors"
      label="ID"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
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
		name: '',
		email: ''
	}),

	methods: {
		login () {
			this.$http.post('/login').then((result) => {
				console.log('result', result.data)
			}).catch((error) => {
				console.log('error', error)
			});
		}
	}
}
</script>
