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
		<template
			v-for="(item, i) in tasks"
			:keys="i"
		>
			<v-list-group
				v-if="item.child.length > 0"
				:key="i"
			>
				<template v-slot:activator>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</template>

				<template
					v-for="(ch_item, j) in item.child"
					:keys="j"
				>
					<v-list-group
						v-if="ch_item.child.length > 0"
						:key="j"
						sub-group
						value="true"
					>
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title>{{ ch_item.title }}</v-list-item-title>
							</v-list-item-content>
						</template>
						<v-list-item
							v-for="(ch_ch_item, k) in ch_item.child"
							:key="k"
							link
							active-class="active-btn"
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
						active-class="active-btn"
						:to="'/list/'+ch_item._id"
					>
						<v-list-item-content>
							<v-list-item-title v-text="ch_item.title"></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
				</v-list-group>
				<v-list-item
					v-else
					:key="item.title"
					link
					:to="'/list/'+item._id"
					active-class="active-btn"
				>
					<v-list-item-content>
						<v-list-item-title v-text="item.title"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
		</template>
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
.active-btn {
	background-color: #BBDEFB11;
	color: #1976D2;
}
</style>
