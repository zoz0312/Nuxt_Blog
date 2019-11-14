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
				<v-btn
					color="success"
					v-on:click="add_category"
				>추가하기</v-btn>
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
					result.data.data[i].depth = [];
				}
				this.categorys = result.data.data;
			}).catch((err) => {
				console.log('err', err);
			})
		},
		add_category () {
			this.categorys.push({ 'depth': [] });
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
			this.filter_category(JSON.parse(JSON.stringify(this.categorys)), 0);
		},
		filter_category (obj, num) {
			const key = Object.keys(obj);
			const curNum = num;
			for (let i = 0; i < key.length; i++) {
				if (obj[key[i]].depth.length > 0) {
					this.filter_category(JSON.parse(JSON.stringify(obj[key[i]].depth)), ++num);
				}
				obj[key[i]].depth = curNum;
				this.post_arr.push(obj[key[i]]);
			}
		}
	},
	components: {
		draggable,
		nestedDraggable,
		Confirm
	}
}
</script>
