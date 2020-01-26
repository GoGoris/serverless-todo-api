const slsw = require('serverless-webpack');
const awsExternals = require('webpack-aws-externals');

const mode = slsw.lib.webpack.isLocal ? "development" : "production"
console.log("Mode: ", mode)

module.exports = {
	entry: slsw.lib.entries,
	target: 'node',
	externals: [
		awsExternals()
	],
	mode
};