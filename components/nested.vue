<template>
	<v-card
    class="mb-5 mr-1 border-line"
  >
		<draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }">
			<li
				v-for="(el, index) in tasks"
				:key="index"
				class="pt-3">
				<v-text-field
					label="카테고리 이름"
					v-model="el.title"
				>
				<template v-slot:append>
					<v-btn
						v-on:click="delete_item( el._id, index )"
						text
						color="error"
					><v-icon>mdi-delete</v-icon></v-btn>
				</template>
				</v-text-field>

					{{ el._id }}
				<nested-draggable :tasks="el.child" />
			</li>
		</draggable>
	</v-card>
</template>
<script>
import draggable from 'vuedraggable';

export default {
	props: {
		tasks: {
			required: true,
			type: Array
		}
	},
	methods: {
		delete_item (idx, arrIdx) {
			this.$parent.delete_category(idx);
		}
	},
	components: {
		draggable
	},
	name: 'nested-draggable'
};
</script>
<style scoped>
li {
	list-style-type: none;
}
.dragArea {
	min-height: 100px;
}
.border-line {
	border-left: 5px solid #428bca;
}
</style>
