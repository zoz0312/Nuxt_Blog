<template>
	<v-card
		class="mx-auto"
		max-width="400"
		outlined
	>
		<v-list-item
			three-line
			:to="'/posts/read/' + propsdata._id"
		>
			<v-list-item-content>
				<div class="overline mb-4">{{ propsdata.writer }}</div>
				<v-list-item-title class="headline mb-1">{{ propsdata.title }}</v-list-item-title>
				<v-list-item-subtitle>{{ propsdata.content }}</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>
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
</template>

<script>
export default {
	props: ['propsdata'],
	methods: {
		delete_post () {
			this.$http.delete('/post', { data: { _id: this.propsdata._id } }).then((result) => {
				console.log('delete success');
				this.get_post_list();
			}).catch((err) => {
				console.log('err', err);
			})
		},
		get_post_list () {
			this.$parent.get_post_list();
		}
	}
}
</script>
