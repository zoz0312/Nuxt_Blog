<template>
	<Post v-bind:propsdata="info"></Post>
</template>

<script>
import '~/mixin/global_mixin'
import Post from '~/layouts/post';

export default {
	asyncData ({ params }) {
		return {
			info: {
				type: 'update',
				btn_text: '수정하기',
				post: params.post
			}
		}
	},
	components: {
		Post
	}
}
</script>
