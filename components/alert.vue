<template>
	<v-overlay
			:absolute="true"
			:value="alertView"
		>
		<v-alert
      v-model="alertView"
			border="top"
			:type="alertType"
			elevation="5"
			min-width="100%"
			transition="scale-transition">
      {{ text }}
    </v-alert>
  </v-overlay>
</template>

<script>
export default {
	data () {
		return {
			alertView: false,
			text: '',
			redirectFlag: false,
			alertType: 'success'
		}
	},
	methods: {
		set_alert_text (_text, type, flag) {
			this.text = _text;
			this.alertView = true;
			this.alertType = type;
			this.redirectFlag = flag;
			this.close_alert();
		},
		close_alert () {
			setTimeout(() => {
				if (this.alertView) {
					this.alertView = false;
				}
				if (this.redirectFlag) {
					this.$router.push('/');
					this.redirectFlag = false;
				}
			}, 1500);
		}
	}
}
</script>
