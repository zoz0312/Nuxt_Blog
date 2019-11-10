<template>
  <v-row>
    <v-col>
			<InfoCard />
    </v-col>
    <v-col>
      <v-card
				min-width="200">
        <v-card-title class="headline">
          Welcome to AJu Blog!
        </v-card-title>
        <v-card-text>
          <weekChart />
        </v-card-text>
        <v-card-actions
          v-if="$store.state.authUser === 'admin'">
          <v-spacer />
          <v-btn
            class="white--text"
            color="#428bca"
            :to="'/posts/create'"
          >글 작성하기
          </v-btn>
          <v-btn
            class="white--text"
            color="#428bca"
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
import weekChart from '~/components/weekChart'

export default {
	mounted () {
		this.$http.post('/api/pageHitData').then((result) => {
			this.chartOptions.xaxis.categories.push(...result.data.data.dateArr);
			this.series[0].data.push(...result.data.data.count);
		})
	},
	components: {
		InfoCard,
		weekChart
	}
}
</script>
