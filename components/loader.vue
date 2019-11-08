<template>
  <div class="text-center">
    <v-overlay :value="overlay">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
	data: () => ({
		overlay: true,
		timeOut: null
	}),
	watch: {
		overlay (val) {
			if (val) {
				this.timeOut = setTimeout(() => {
					this.overlay = false;
				}, 10000);
			}
		}
	},
	methods: {
		loader_stop () {
			this.overlay = false;
			clearTimeout(this.timeOut);
			this.timeOut = null;
		}
	}
}
</script>
