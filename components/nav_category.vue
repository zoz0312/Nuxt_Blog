<template>
	<v-list>
		<v-list-item
			link
			to="/">
			<v-list-item-icon>
				<v-icon>mdi-home</v-icon>
			</v-list-item-icon>

			<v-list-item-title>Home</v-list-item-title>
		</v-list-item>
		<v-list-group
			v-for="(item, i) in tasks"
			:key="i"
		>
			<template v-slot:activator>
				<v-list-item-title>{{ item.title }}</v-list-item-title>
			</template>

			<template
				v-for="(ch_item, i) in item.child"
				:keys="i"
			>
				<v-list-group
					v-if="ch_item.child.length > 0"
					:key="i"
					sub-group
					value="true"
				>
					<template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ ch_item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
					<v-list-item
						v-for="(ch_ch_item, j) in ch_item.child"
						:key="j"
						link
						:to="'/list/'+ch_ch_item._id"
					>
            <v-list-item-title v-text="ch_ch_item.title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-ii</v-icon>
            </v-list-item-icon>
          </v-list-item>
				</v-list-group>
				<v-list-item
					v-else
					:key="ch_item.title"
					link
					class="sub-item"
					:to="'/list/'+ch_item._id"
				>
					<v-list-item-content>
						<v-list-item-title v-text="ch_item.title"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</template>
		</v-list-group>
	</v-list>
</template>
<script>
export default {
	props: {
		tasks: {
			required: true
		}
	}
};
</script>
<style scoped>
.sub-item {
	padding-left: 32px;
}
</style>
