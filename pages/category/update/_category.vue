<template>
	<Category v-bind:propsdata="info"></Category>
</template>

<script>
import '~/mixin/global_mixin'
import Category from '~/layouts/category';

export default {
	asyncData ({ params }) {
		return {
			info: {
				type: 'update',
				btn_text: '수정하기',
				post: params.category
			}
		}
	},
	components: {
		Category
	}
}
</script>
