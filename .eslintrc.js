module.exports = {
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es6: true
	},
	extends: ['standard', 'plugin:react/recommended'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: [
		'html',
		'react',
    'react-hooks'
	],
	globals: {
		React: true,
		ReactDOM: true,
		ReactRouter: true,
		ReactRouterDOM: true,
		PropTypes: true,
		axios: true
	},
	settings: {
		react: {
			createClass: 'createReactClass', // Regex for Component Factory to use,
			// default to "createReactClass"
			pragma: 'React', // Pragma to use, default to "React"
			version: 'detect', // React version. "detect" automatically picks the version you have installed.
			// You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
			// default to latest and warns if missing
			// It will default to "detect" in the future
			flowVersion: '0.53' // Flow version
		},
		propWrapperFunctions: [
			// The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
			'forbidExtraProps',
			{ property: 'freeze', object: 'Object' },
			{ property: 'myFavoriteWrapper' }
		],
		linkComponents: [
			// Components used as alternatives to <a> for linking, eg. <Link to={ url } />
			'Hyperlink',
			{ name: 'Link', linkAttribute: 'to' }
		]
	},
	rules: {
		indent: [
			'error',
			2,
			{
				SwitchCase: 1
			}
		],
		semi: ['error', 'always'],
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [1, "always-multiline"],
		"no-async-promise-executor": "off",
		"no-useless-call": "off",
		"no-tabs": "off",
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				named: 'never'
			}
		],
		'prefer-promise-reject-errors': [
			'error',
			{
				allowEmptyReject: true
			}
		],
	}
}
