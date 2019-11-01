<template>
	<Category v-bind:propsdata="info"></Category>
</template>

<script>
import '~/mixin/global_mixin'
import Category from '../../layouts/category';

export default {
	data () {
		return {
			info: {
				'type': 'add',
				'btn_text': '작성하기'
			}
		}
	},
	components: {
		Category
	}
}
</script>
