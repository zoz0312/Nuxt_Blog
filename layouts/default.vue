<template>
	<v-app light>
		<v-navigation-drawer
			v-model="drawer"
			fixed
			app
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in categorys"
					:key="i"
					:to="'/list/'+item._id"
				>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar
			fixed
			app
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
		>
			<span>&copy; 2019 Aju(zoz0312)</span>
		</v-footer>
	</v-app>
</template>

<script>
import '~/mixin/global_mixin'

export default {
	data () {
		return {
			categorys: {},
			drawer: null
		}
	},
	mounted () {
		this.update_category();
	},
	methods: {
		update_category () {
			this.$http.post('/category').then((result) => {
				this.categorys = Object.assign({}, result.data.data);
			}).catch((err) => {
				console.log('err', err);
			})
		},
		logout () {
			this.$store.dispatch('logout').catch((err) => {
				console.log('err', err)
			})
		}
	}
}
</script>
