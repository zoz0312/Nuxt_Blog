<div>
	<div
		v-if="tasks.child.length > 0"
	>
	<template
		v-slot:activator
	>
		<v-list-item-content>
			<v-list-item-title v-text="tasks.title"></v-list-item-title>
		</v-list-item-content>
	</template>
	<category-sub
		:tasks="tasks.child[0]"
	/>
	</div>
	<v-list-item
		v-else
	>
		<v-list-item-content>
			<v-list-item-title v-text="tasks.title"></v-list-item-title>
		</v-list-item-content>
	</v-list-item>
</div>
<script>
export default {
	props: {
		tasks: {
			required: true
		}
	},
	name: 'category-sub'
}
</script>
