<template>
	<Post v-bind:propsdata="info"></Post>
</template>

<script>
import '~/mixin/global_mixin'
import Post from '~/layouts/post';

export default {
	data () {
		return {
			info: {
				'type': 'create',
				'btn_text': '작성하기'
			}
		}
	},
	components: {
		Post
	}
}
</script>
