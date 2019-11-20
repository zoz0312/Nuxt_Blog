<template>
	<v-app light>
		<v-navigation-drawer
			v-model="drawer"
			fixed
			app
		>
			<Category
				:tasks="this.$store.state.category.category"
			/>
		</v-navigation-drawer>
		<v-app-bar
			fixed
			app
			color="#428bca"
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-btn
				:to="'/'"
			>홈</v-btn>
			<v-btn
				v-if="$store.state.authUser === null"
				:to="'/login'"
			>Login</v-btn>
			<v-btn
				v-if="$store.state.authUser !== null"
				@click="logout"
			>Logout
			</v-btn>
		</v-app-bar>
		<v-content>
			<v-container>
				<nuxt/>
			</v-container>
		</v-content>
		<v-footer
			app
			color="#428bca"
		>
			<span class="white--text">&copy; 2019 AJu(zoz0312)</span>
		</v-footer>
	</v-app>
</template>

<script>
import '~/mixin/global_mixin'
import Category from '~/components/nav_category';

export default {
	data () {
		return {
			drawer: null
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
				this.$store.commit('category/SET_CATEGORY', this.parse_client_side(result.data.data));
			}).catch((err) => {
				console.log('err', err);
			})
		},
		parse_client_side (postData, rtn = []) {
			const key = Object.keys(postData);
			for (let i = 0; i < key.length; i++) {
				const sp = postData[key[i]].parentIdx.split('.');
				switch (sp.length) {
				case 1:
					rtn.push(postData[key[i]]);
					break;
				case 2:
					rtn[sp[0]].child.push(postData[key[i]]);
					break;
				case 3:
					rtn[sp[0]].child[sp[1]].child.push(postData[key[i]]);
					break;
				}
			}
			return rtn;
		},
		logout () {
			this.$store.dispatch('logout').catch((err) => {
				console.log('err', err);
			})
		}
	},
	components: {
		Category
	}
}
</script>
