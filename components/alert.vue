<template>
	<v-overlay
			:absolute="true"
			:value="alertView"
		>
		<v-alert
      v-model="alertView"
			border="top"
			type="success"
			elevation="5"
			min-width="100%">
      {{ text }}
    </v-alert>
  </v-overlay>
</template>

<script>
export default {
	data () {
		return {
			alertView: false,
			text: ''
		}
	},
	methods: {
		set_alert_text (_text) {
			this.text = _text;
			this.alertView = true;
			this.close_alert();
		},
		close_alert () {
			setTimeout(() => {
				if (this.alertView) {
					this.alertView = false;
				}
				this.$router.push('/')
			}, 1500);
		}
	}
}
</script>
