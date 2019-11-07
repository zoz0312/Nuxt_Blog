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
		<div class="d-flex">
			<div id="post-writer">
				{{ items.writer }}
			</div><div id="post-date" class="pb-3 mr-auto">
				&nbsp;|&nbsp;{{ dateParse(items.createDate) }}
			</div><div id="post-hit">
				조회수 : {{ items.hitCount }}
			</div>
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
	head: {
		script: [
			{ src: '/prism.js' }
		],
		link: [
			{ rel: 'stylesheet', href: '/prism.css' }
		]
	},
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
		this.$http.post('/api/postHit', { 'postId': this.post });

		this.$http.post('/post/' + this.post).then((result) => {
			this.items = Object.assign({}, result.data.data);
			return this.$http.post('/category/' + this.items.categoryId);
		}).then((result) => {
			this.category = result.data.data.title;
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
	color: #000000;
	font-size: 0.9rem;
	text-align: left;
	font-weight: 200;
}
#post-date {
	color: #666666 ;
	font-size: 0.9rem;
	font-weight: 300;
}
#post-hit {
	color: #666666;
	font-size: 0.9rem;
	text-align: right;
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
