<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
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
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
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
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
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
			clipped: false,
			drawer: false,
			fixed: false,
			miniVariant: false,
			right: true,
			rightDrawer: false
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
