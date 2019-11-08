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
					asdadsf
          <apexchart width="500" height="350" type="line" :options="chartOptions" :series="series"></apexchart>
					<div>
						<button @click="updateChart">Update!</button>
					</div>
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

export default {
	data: () => ({
		chartOptions: {
			xaxis: {
				type: 'datetime',
				categories: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003']
			}
		},
		series: [{
			name: 'Series A',
			data: [30, 40, 45, 50, 49, 60, 70, 91]
		}, {
			name: 'Series B',
			data: [23, 43, 54, 12, 44, 52, 32, 11]
		}]
	}),
	methods: {
		generateDayWiseTimeSeries (baseval, count, yrange) {
			let i = 0;
			const series = [];
			while (i < count) {
				const x = baseval;
				const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

				series.push([x, y]);
				baseval += 86400000;
				i++;
			}
			return series;
		},
		updateChart () {
			const series = [
				{
					name: 'South',
					data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
						min: 10,
						max: 60
					})
				},
				{
					name: 'North',
					data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
						min: 10,
						max: 20
					})
				},
				{
					name: 'Central',
					data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
						min: 10,
						max: 15
					})
				}
			]
			this.series = series
		}
	},
	components: {
		InfoCard
	}
}
</script>
