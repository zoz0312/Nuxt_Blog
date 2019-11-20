<template>
	<div>
		<Confirm ref="confirm"/>
		<nuxt-link :to="'/posts/read/' + propsdata._id">
			<v-hover v-slot:default="{ hover }" class="text-left">
				<v-card
					class="mx-auto card-size"
					outlined
					:elevation="hover ? 12 : 2"
				>
					<v-img
						class="white--text align-end card-img"
						height="200px"
						:src="propsdata.thumbnail"
					>
					</v-img>
					<v-card-title class="headline mb-1 text-shadow">{{ titleSlice(propsdata.title) }}</v-card-title>
					<v-card-subtitle class="pb-1">{{ dateParse(propsdata.createDate) }}</v-card-subtitle>
					<v-card-subtitle class="pt-0">{{ propsdata.writer }}</v-card-subtitle>
				</v-card>
			</v-hover>
		</nuxt-link>
		<v-card
			v-if="$store.state.authUser === 'admin'"
			class="mt-4"
			outlined
		>
			<v-card-actions>
				<v-btn
					:to="'/posts/update/' + propsdata._id"
					text
				>Fix</v-btn>
				<v-btn
					v-on:click="delete_post"
					text
				>Delete</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
import Confirm from '~/components/confirm';

export default {
	props: ['propsdata'],
	methods: {
		delete_post () {
			this.$refs.confirm.set_confirm('delete').then((result) => {
				if (result) {
					this.$http.delete('/post', { data: { _id: this.propsdata._id } }).then((result) => {
						this.get_post_list();
					}).catch((err) => {
						console.log('err', err);
					});
				}
			});
		},
		get_post_list () {
			this.$parent.get_post_list();
		}
	},
	components: {
		Confirm
	}
}
</script>
<style scoped>
@media (max-width: 389px) {
  .card-size {
    max-width: 232px !important;
		min-width: 232px !important;
  }
	.card-size .card-img {
    max-height: 153.3px !important;
		max-height: 153.3px !important;
	}
}
@media (min-width: 390px) {
	.card-size {
		max-width: 302px !important;
		min-width: 302px !important;
	}
	.card-size .card-img {
    max-height: 200px !important;
		max-height: 200px !important;
	}
}
a,
a * {
	text-decoration: none;
}
</style>
