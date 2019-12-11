module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recommended-scss',
		'stylelint-config-recess-order'
	],
	plugins: ['stylelint-order'],
	rules: {
		indentation: 4,
		'no-descending-specificity': null
	}
}