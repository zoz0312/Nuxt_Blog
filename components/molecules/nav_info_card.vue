<template>
   <v-card
    class="mx-auto"
    max-width="344"
    tile
  >
		<v-img
			:src="'https://t2.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/P9h/image/f-2zqKie74i-mGXD5BFHCrrC-0A.png'"
			class="white--text align-end"
			height="200px"
		></v-img>
		<v-card-title>AJu</v-card-title>
		<v-card-subtitle>흔하지 않고 싶은 개발자</v-card-subtitle>
		<v-divider class="mx-4"></v-divider>
		<v-card-text>
			<div><atGit /></div>
			<div><atEmail /></div>
		</v-card-text>
  </v-card>
</template>

<style>
</style>

<script>
import atEmail from '~/components/atoms/email'
import atGit from '~/components/atoms/github'
export default {
	components: {
		atEmail,
		atGit
	}
}
</script>
