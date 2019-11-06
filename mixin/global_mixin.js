import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios

Vue.mixin({
	methods: {
		isStr (str) {
			if (str === '') {
				return false;
			}
			if (str === null) {
				return false;
			}
			if (str === undefined) {
				return false;
			}
			if (typeof str !== 'string') {
				return false;
			}
			return true;
		},
		removeHtml (str) {
			if (!this.isStr(str)) {
				return '';
			}
			str = str.replace(/<[^>]*>/g, '');
			str = str.replace(/&nbsp;/gi, '');
			return str;
		},
		titleSlice (str) {
			if (!this.isStr(str)) {
				return '';
			}
			if (str.length > 20) {
				return str.slice(0, 20) + '...';
			} else {
				return str;
			}
		},
		dateParse (_date) {
			if (!_date) {
				return '';
			}
			_date = _date.split('T');
			const ymd = _date[0].split('-');
			const time = _date[1].split('.');
			return ymd[0].slice(2, 4) + '년 ' + ymd[1] + '월 ' + ymd[2] + '일 ' + time[0];
		}
	}
});
