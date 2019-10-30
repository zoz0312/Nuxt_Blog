module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended'
	],
	// add your custom rules here
	rules: {
		'nuxt/no-cjs-in-config': 'off',
		"semi": [1, "always"],
		"indent": [2, "tab"],
		"no-tabs": 0,
		"camelcase": [2, {properties: "never"}]
	}
}
