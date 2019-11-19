<template>
	<v-card
    class="mb-5 mr-1 border-line"
  >
		<Confirm ref="confirm"/>
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
						v-on:click="delete_category( el._id )"
						text
						color="error"
					><v-icon>mdi-delete</v-icon></v-btn>
				</template>
				</v-text-field>
				<nested-draggable
					v-if="el.parentIdx.split('.').length < 3"
					:tasks="el.child"
				/>
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
		delete_category (_id) {
			// TODO
			this.$root.$children[1].$children[0].$children[2].$children[0].$children[0].delete_category(_id);
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
