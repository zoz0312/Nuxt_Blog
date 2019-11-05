<template>
  <v-row>
    <v-col>
		<InfoCard />
    </v-col>
    <v-col>
      <v-card>
        <v-card-title class="headline">
          Welcome to AJu Blog!
        </v-card-title>
        <v-card-text>
          개발중
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="white--text"
            color="#428bca"
            v-if="$store.state.authUser === 'admin'"
            :to="'/posts/create'"
          >글 작성하기
          </v-btn>
          <v-btn
            class="white--text"
            color="#428bca"
            v-if="$store.state.authUser === 'admin'"
            :to="'/category/create'"
          >카테고리 생성하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import InfoCard from '~/components/molecules/profile'

export default {
	components: {
		InfoCard
	}
}
</script>
