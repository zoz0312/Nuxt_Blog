<template>
	<v-card
		class="mx-auto pa-5"
		max-width="1000"
	>
		<Loader ref="loader"/>
		<div id="post-category">
			{{ $store.state.posts.category }}
		</div>
		<div id="post-title">
			{{ $store.state.posts.content.title }}
		</div>
		<div class="d-flex">
			<div id="post-writer">
				{{ $store.state.posts.content.writer }}
			</div><div id="post-date" class="pb-3 mr-auto">
				&nbsp;|&nbsp;{{ dateParse($store.state.posts.content.createDate) }}
			</div><div id="post-hit">
				조회수 : {{ $store.state.posts.content.hitCount }}
			</div>
		</div>
		<v-divider class="my-5"></v-divider>
		<div
			v-html="$store.state.posts.content.content"
			max-width="100%"
			id="html-text"
		></div>
	</v-card>
</template>

<script>
import '~/mixin/global_mixin'
import axios from 'axios'
import Prism from 'prismjs'
import Loader from '~/components/loader'

export default {
	async fetch ({ store, params }) {
		const rtn = await axios.post('/post/' + params.post);
		store.commit('posts/SET_CONTENT', rtn.data.data);
		const rtn2 = await axios.post('/category/' + rtn.data.data.categoryId);
		store.commit('posts/SET_CATEGORY', rtn2.data.data.title);
	},
	data () {
		return {
			items: {},
			category: ''
		}
	},
	head () {
		return {
			link: [
				{ rel: 'stylesheet', href: '/prism.css' }
			],
			title: `${this.$store.state.blogTitle} ${this.$store.state.posts.content.title}`,
			meta: [
				{
					hid: 'posts',
					name: 'posts',
					content: 'AJu Blog Posts'
				}
			]
		}
	},
	mounted () {
		this.$http.post('/api/postHit', { 'postId': this.post }).then(() => {
			this.$refs.loader.loader_stop();
			Prism.highlightAll();
		}).catch((err) => {
			this.$refs.loader.loader_stop();
			console.log('err', err);
		})
	},
	components: {
		Loader
	}
}
</script>

<style scoped>
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
	font-weight: 400;
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
</style>
