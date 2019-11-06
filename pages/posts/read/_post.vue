<template>
	<v-card
		class="mx-auto pa-5"
	>
		<div id="post-category">
			{{ category }}
		</div>
		<div id="post-title">
			{{ items.title }}
		</div>
		<div id="post-writer">
			{{ items.writer }}
		</div><div id="post-date">
			&nbsp;|&nbsp;{{ dateParse(items.createDate) }}
		</div>
		<v-divider class="my-5"></v-divider>
		<div
			v-html="items.content"
			max-width="100%"
		></div>
	</v-card>
</template>

<script>
import '~/mixin/global_mixin'

export default {
	asyncData ({ params }) {
		return {
			post: params.post
		}
	},
	data () {
		return {
			items: {},
			category: ''
		}
	},
	mounted () {
		this.$http.post('/post/' + this.post).then((result) => {
			this.items = Object.assign({}, result.data.data);
			this.$http.post('/category/' + this.items.categoryId).then((result) => {
				this.category = result.data.data.title;
			})
		}).catch((err) => {
			console.log('err', err);
		})
	}
}
</script>

<style>
#post-category {
	color: #666666;
	font-size: 1rem;
	text-align: left;
	font-weight: 400;
}
#post-title {
	color: #428bca;
	font-size: 2rem;
	text-align: left;
	font-weight: 300;
}
#post-writer {
	display: inline-block;
	color: #000000;
	font-size: 0.9rem;
	text-align: left;
	font-weight: 200;
}
#post-date {
	display: inline-block;
	color: #666666 ;
	font-size: 0.9rem;
	font-weight: 300;
}
hr {
	display: block;
	flex: 1 1 0px;
	max-width: 100%;
	max-height: 0px;
	border-color: rgba(0, 0, 0, 0.3);
	border-width: thin 0 0 0;
	margin: 1rem 0;
}
</style>
