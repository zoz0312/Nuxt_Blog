<template>
	<v-container>
		<v-card
		class="mx-auto"
		max-width="400"
		outlined
		v-for="item in categorys"
		:key="item._id"
		>
			<v-list-item three-line>
				<v-list-item-content>
					<v-list-item-title class="headline mb-1">{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-card-actions>
				<v-btn
					:to="'/category/update/' + item._id"
					text
				>Fix</v-btn>
				<v-btn
					v-on:click="delete_category( item._id )"
					text
				>Delete</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
import '~/mixin/global_mixin'

export default {
	data () {
		return {
			categorys: {}
		}
	},
	mounted () {
		this.update_category();
	},
	methods: {
		update_category () {
			this.$http.post('/category').then((result) => {
				this.categorys = Object.assign({}, result.data.data);
			}).catch((err) => {
				console.log('err', err);
			})
		},
		delete_category (_id) {
			this.$http.delete('/category', { data: { _id } }).then((result) => {
				this.update_category();
			}).catch((err) => {
				console.log('err', err);
			})
		}
	}
}
</script>
