<template>
	<v-card
		class="mx-auto pa-5"
		max-width="1000"
	>
		<Loader ref="loader"/>
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
	data () {
		return {
			items: {},
			category: '',
			postId: 0
		}
	},
	async asyncData ({ params }) {
		const rtn = await axios.post('/post/' + params.post);
		const rtn2 = await axios.post('/category/' + rtn.data.data.categoryId);
		return {
			items: rtn.data.data,
			category: rtn2.data.data.title,
			postId: params.post
		}
	},
	head () {
		return {
			link: [
				{ rel: 'stylesheet', href: '/prism.css' }
			],
			title: `${this.$store.state.blogTitle} ${this.items.title}`,
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
		this.$http.post('/api/postHit', { 'postId': this.postId }).then(() => {
			this.$refs.loader.loader_stop();
			this.items.hitCount++;
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
