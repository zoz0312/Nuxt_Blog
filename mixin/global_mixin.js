import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios

Vue.mixin({
	methods: {
		removeHtml (str) {
			if (str === '') {
				return '';
			}
			if (str === null) {
				return '';
			}
			if (str === undefined) {
				return '';
			}
			if (typeof str !== 'string') {
				return '';
			}
			str = str.replace(/<[^>]*>/g, '');
			str = str.replace(/&nbsp;/gi, '');
			return str;
		}
	}
});
