<template>
	<div>
		<Confirm ref="confirm"/>
		<v-hover v-slot:default="{ hover }" class="text-left">
			<v-card
				class="mx-auto"
				outlined
				max-width="300"
				min-width="300"
				:elevation="hover ? 12 : 2"
				:to="'/posts/read/' + propsdata._id"
			>
				<v-img
					class="white--text align-end"
					height="200px"
					src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
				>
					<v-card-title class="headline mb-1">{{ titleSlice(propsdata.title) }}</v-card-title>
				</v-img>
				<v-card-subtitle class="pb-1">{{ dateParse(propsdata.createDate) }}</v-card-subtitle>
				<v-card-subtitle class="pt-0">{{ propsdata.writer }}</v-card-subtitle>
			</v-card>
		</v-hover>
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
					v-on:click="confirm_post"
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
		confirm_post () {
			this.$refs.confirm.set_confirm('delete');
		},
		delete_post () {
		},
		get_post_list () {
			this.$parent.get_post_list();
		},
		btn_true () {
			this.$http.delete('/post', { data: { _id: this.propsdata._id } }).then((result) => {
				this.get_post_list();
			}).catch((err) => {
				console.log('err', err);
			});
		},
		btn_false () {
		}
	},
	components: {
		Confirm
	}
}
</script>
