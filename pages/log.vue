<template>
	<v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">IP</th>
          <th class="text-left">TIME</th>
          <th class="text-left">URL</th>
          <th class="text-left">HTTP VERSION</th>
          <th class="text-left">HTTP MTEHODS</th>
          <th class="text-left">USER-AGENT</th>
          <th class="text-left">ERR</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.ip">
          <td>{{ item._id }}</td>
          <td>{{ item.ip }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.url }}</td>
          <td>{{ item.http_version }}</td>
          <td>{{ item.http_method }}</td>
          <td>{{ item.user_agent }}</td>
          <td>{{ item.err }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import '~/mixin/global_mixin';

export default {
	middleware: 'auth',
	data () {
		return {
			title: '',
			data: null
		}
	},
	mounted () {
		this.get_logs();
	},
	methods: {
		get_logs () {
			this.$http.post('/log').then((result) => {
				this.data = result.data.data;
			}).catch((err) => {
				console.log('err', err);
			})
		}
	},
	components: {
	}
}
</script>
