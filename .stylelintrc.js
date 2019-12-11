module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-recommended-scss',
		'stylelint-config-recess-order'
	],
	plugins: ['stylelint-order'],
	rules: {
		indentation: 2,
		"color-hex-length": null,
		'no-descending-specificity': null,
		"selector-pseudo-class-no-unknown": null,
		'no-eol-whitespace': null,
    "rule-empty-line-before": null,
    "no-missing-end-of-source-newline": null
	}
};