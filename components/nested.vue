<template>
	<v-card
    class="mb-5 mr-1 border-line"
  >
		<Confirm ref="confirm"/>
		<draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }">
			<li
				v-for="(el, index) in tasks"
				:key="el.index"
				class="pt-3">
				<v-text-field
					label="카테고리 이름"
					v-model="el.title"
				>
				<template v-slot:append>
					<v-btn
						v-on:click="delete_item( index )"
						text
						color="error"
					><v-icon>mdi-delete</v-icon></v-btn>
				</template>
				</v-text-field>
				<nested-draggable :tasks="el.depth" />
			</li>
		</draggable>
	</v-card>
</template>
<script>
import draggable from 'vuedraggable';
import Confirm from '~/components/confirm';

export default {
	props: {
		tasks: {
			required: true,
			type: Array
		}
	},
	methods: {
		delete_item (idx) {
			this.$refs.confirm.set_confirm('delete').then((result) => {
				if (result) {
					this.tasks.splice(idx, 1);
				}
			});
		}
	},
	components: {
		draggable,
		Confirm
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
