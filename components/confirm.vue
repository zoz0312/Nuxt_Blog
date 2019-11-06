<template>
  <v-row justify="center">
    <v-dialog
			v-model="dialog"
			persistent
			max-width="50%">
      <v-card
			class="grey lighten-3">
				<div :class="`${classType}-border`">
					<v-card-title class="headline">
						<v-icon class="mr-3" :color="classType">mdi-alert</v-icon>
						{{ text }}
					</v-card-title>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							class=""
							@click="dialog = false"
						>{{ btn1 }}</v-btn>
						<v-btn
							@click="dialog = false"
							:color="classType"
						>{{ btn2 }}</v-btn>
					</v-card-actions>
				</div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
	data () {
		return {
			type: 'delete',
			classType: 'error',
			dialog: true,
			text: '삭제하시겠습니까?',
			btn1: '취소',
			btn2: '삭제'
		}
	},
	methods: {
		set_confirm (_type) {
			if (_type) {
				this.type = _type;
			}
			switch (this.type) {
			case 'delete':
				this.classType = 'error';
				this.text = '삭제하시겠습니까?';
				this.btn1 = '취소';
				this.btn2 = '삭제';
				break;
			case 'apply':
				this.classType = 'info';
				this.text = '적용하시겠습니까?';
				this.btn1 = '취소';
				this.btn2 = '적용';
				break;
			}
		}
	}
}
</script>

<style>
.error-border {
	border-left: 1rem solid #ff1744;
}
.info-border {
	border-left: 1rem solid #2196f3;
}
</style>
