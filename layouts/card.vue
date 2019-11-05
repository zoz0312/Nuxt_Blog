<template>
	<v-card
		class="mx-auto"
		outlined
	>
		<v-list-item
			three-line
			:to="'/posts/read/' + propsdata._id"
		>
			<v-list-item-content>
				<v-list-item-title class="headline mb-1">{{ propsdata.title }}</v-list-item-title>
				<v-list-item-subtitle>작성자 : {{ propsdata.writer }}</v-list-item-subtitle>
				<v-card-text class="d-inline-block" max-height=50 min-height=50>{{ removeHtml(propsdata.content).slice(0, 150) }}...</v-card-text>
			</v-list-item-content>
		</v-list-item>
		<v-card-actions>
			<v-btn
				v-if="$store.state.authUser === 'admin'"
				:to="'/posts/update/' + propsdata._id"
				text
			>Fix</v-btn>
			<v-btn
				v-if="$store.state.authUser === 'admin'"
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
