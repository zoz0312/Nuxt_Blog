<template>
	<v-container>
		<Confirm ref="confirm"/>
		<h3>카테고리 목록</h3>
		<nested-draggable :tasks="categories" />
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
	</v-container>
</template>

<script>
import '~/mixin/global_mixin'
import nestedDraggable from '~/components/nested';
import Confirm from '~/components/confirm';

export default {
	data () {
		return {
			categories: [],
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
				this.categories = this.parse_client_side(result.data.data);
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
			this.$refs.confirm.set_confirm('apply').then((result) => {
				this.post_arr = [];
				this.parse_server_side(JSON.parse(JSON.stringify(this.categories)), 0, '0');
				this.$http.post('/category/update', { post_arr: this.post_arr }).then((result) => {
					// Alert
				}).catch((err) => {
					console.log('err', err);
				})
			});
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
		parse_client_side (postData, rtn = []) {
			for (let i = 0; i < postData.length; i++) {
				const sp = postData[i].parentIdx.split('.');
				switch (sp.length) {
				case 1:
					rtn.push(postData[i]);
					break;
				case 2:
					rtn[sp[0]].child.push(postData[i]);
					break;
				case 3:
					rtn[sp[0]].child[sp[1]].child.push(postData[i]);
					break;
				}
			}
			return rtn;
		}
	},
	components: {
		nestedDraggable,
		Confirm
	}
}
</script>
