<template>
	<v-card
		class="mx-auto"
		max-width="400"
		:to="'/post/' + propsdata._id"
		outlined
	>
		<v-list-item three-line>
			<v-list-item-content>
				<div class="overline mb-4">{{ propsdata.writer }}</div>
				<v-list-item-title class="headline mb-1">{{ propsdata.title }}</v-list-item-title>
				<v-list-item-subtitle>{{ propsdata.content }}</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>
		<v-card-actions>
			<v-btn text>Fix</v-btn>
			<v-btn text>Delete</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: ['propsdata']
}
</script>
