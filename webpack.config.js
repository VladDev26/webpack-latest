const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {	
	entry: path.resolve(__dirname, 'src', 'index'),
	
	output: {
		path: path.join(__dirname, 'dist'),
		// publicPath: '/dist',
		filename: 'scripts/bundle.js'
	},
	module: {
		rules: [
			// {
			// 	test: /\.js$/,
			// 	exclude: /node_modules/,
			// 	loader: 'babel-loader',
			// 	query: {
			//     	presets: ['es2015', 'stage-2', 'react']
			//     }
			// },
			{
				test: /\.html$/,
				use: 'file-loader?name=[name].[ext]'
			},
			{ 
				test: /\.scss$/i, 
				use: ExtractTextPlugin.extract({
					// fallback: 'style-loader',
					use: [
						'css-loader?-url', //disables url inline loading
						'sass-loader'
					]
				})
			}
		]
	},

	plugins: [
		new ExtractTextPlugin('styles/bundle.css')
	]
};


























// const path = require('path');


// module.exports = {
// 	entry: './src/index.js',
// 	output: {
// 		path: path.join(__dirname, '/dist'),
// 		publicPath: '/dist',
// 		filename: 'scripts/bundle.js'
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.png$/,
// 				use: [
// 					'file-loader?name=/[name].[ext]'
// 				]
// 			}
// 			// {
// 			// 	//extensions (\?.*$|$) with versions
// 			// 	test: /\.(png|woff|woff2|ept|ttf|svg)(\?.*$|$)/,
// 			// 	use: [
// 			// 		'file-loader?name=/[name].[ext]'
// 			// 	]
// 			// }

// 			//url-loader limit 100000 kilobytes
// 		]
// 	}
// };






