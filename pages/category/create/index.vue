<template>
	<Category v-bind:propsdata="info"></Category>
</template>

<script>
import '~/mixin/global_mixin'
import Category from '~/layouts/category';

export default {
	middleware: 'auth',
	data () {
		return {
			info: {
				'type': 'create',
				'btn_text': '작성하기'
			}
		}
	},
	components: {
		Category
	}
}
</script>
