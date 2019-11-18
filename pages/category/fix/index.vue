<template>
	<v-container>
		<Confirm ref="confirm"/>
		<draggable v-model="categorys" group="people" @start="drag=true" @end="drag=false">
			<div
				v-for="item in categorys"
				:key="item._id">
				<v-text-field
					label="카테고리 이름"
					solo
					v-model="item.title"
				>
				<template v-slot:append>
					<v-btn
						v-on:click="delete_category( item._id )"
						text
						color="error"
					><v-icon>mdi-delete</v-icon></v-btn>
				</template>
				</v-text-field>
			</div>
		</draggable>
		<h3>카테고리 목록</h3>
		<nested-draggable :tasks="categorys" />
		<v-card
			class="mt-4"
			outlined
		>
			<v-card-actions>
        <v-spacer />
				<v-btn
					color="#428bca"
					class="white--text"
					v-on:click="apply_category"
				>적용하기</v-btn>
			</v-card-actions>
		</v-card>
		{{ categorys }}
	</v-container>
</template>

<script>
import '~/mixin/global_mixin'
import draggable from 'vuedraggable'
import nestedDraggable from '~/components/nested';
import Confirm from '~/components/confirm';

export default {
	data () {
		return {
			categorys: [],
			post_arr: []
		}
	},
	mounted () {
		this.update_category();
	},
	methods: {
		update_category () {
			this.$http.post('/category').then((result) => {
				for (let i = 0; i < result.data.data.length; i++) {
					result.data.data[i].child = [];
				}
				result.data.data.sort((a, b) => {
					return a.parentIdx < b.parentIdx ? -1 : a.parentIdx > b.parentIdx ? 1 : 0;
				})
				this.categorys = result.data.data;
			}).catch((err) => {
				console.log('err', err);
			})
		},
		delete_category (_id) {
			this.$refs.confirm.set_confirm('delete').then((result) => {
				if (result) {
					this.$http.delete('/category', { data: { _id } }).then((result) => {
						this.update_category();
					}).catch((err) => {
						console.log('err', err);
					})
				}
			});
		},
		apply_category () {
			this.post_arr = [];
			this.parse_server_side(JSON.parse(JSON.stringify(this.categorys)), 0, '0');
		},
		parse_server_side (obj, curDepth, parentKey) {
			const key = Object.keys(obj);
			const depth = curDepth;
			let order = 1;

			for (let i = 0; i < key.length; i++) {
				const parentIdx = depth === 0 ? `${i}` : `${parentKey}.${i}`;
				if (obj[key[i]].child.length > 0) {
					this.parse_server_side(JSON.parse(JSON.stringify(obj[key[i]].child)), depth + 1, parentIdx);
				}
				obj[key[i]].order = order;
				obj[key[i]].parentIdx = parentIdx;
				this.post_arr.push(obj[key[i]]);
				order++;
			}
		},
		parse_client_side (parentObj, curDepth) {
			const key = Object.keys(parentObj);
			const depth = curDepth;
			const setObj = {};

			for (let i = 0; i < key.length; i++) {
				if (depth === 0) {
					this.categorys.push(parentObj[key[i]]);
				} else if (depth === 1) {
					this.parse_client_side(setObj, depth + 1);
					// reObj.push(underDepth(reObj, arr[key[i]]));
					// reObj
				}
			}
			console.log('setObj', setObj);
			return setObj;
		},
		find_obj (obj) {

		}
	},
	components: {
		draggable,
		nestedDraggable,
		Confirm
	}
}
</script>
