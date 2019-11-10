<template>
	<div>
		<v-card
			class="my-5"
			max-width="250"
		>
		<v-card-title>
			방문자 수 (금일 / 총)
		</v-card-title>
		<v-card-text>
			<div class="daily">
				{{ this.series[0].data[0] }}
			</div><div class="total">
				&nbsp;/&nbsp;{{ total }}
			</div>
		</v-card-text>
		</v-card>
		<client-only>
			<VueApexCharts max-width="300" type="area" :options="chartOptions" :series="series"></VueApexCharts>
		</client-only>
	</div>
</template>

<script>
export default {
	data: () => ({
		total: 0,
		chartOptions: {
			chart: {
				height: 350,
				zoom: {
					enabled: false
				}
			},
			stroke: {
				curve: 'straight'
			},
			title: {
				text: '7일 방문자 수',
				align: 'center'
			},
			dataLabels: {
				enabled: true
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5
				}
			},
			xaxis: {
				type: 'datetime',
				categories: []
			}
		},
		series: [{
			name: '방문자 수',
			data: []
		}]
	}),
	mounted () {
		this.$http.post('/api/pageHitData').then((result) => {
			this.chartOptions.xaxis.categories.push(...result.data.data.dateArr);
			this.series[0].data.push(...result.data.data.count);
			this.total = result.data.data.totalCount;
		})
	}
}
</script>
<style scoped>
.daily {
	display: inline-block;
	font-size: 2rem;
	color: #333333;
}
.total {
	display: inline-block;
}
</style>
