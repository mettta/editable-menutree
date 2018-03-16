const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	devtool: 'source-map',

	module: {
		rules: [
			{
				test: /\.pug$/,
				use: 'pug-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						babelrc: false,       // брать настройки из options
						cacheDirectory: false, // включить кширование (node_modules/.cache/babel-loader)
						presets: [
							[
								'env',
								{
									targets: {
										browsers: ['last 2 versions'],
										chrome: 49,
										safari: 9,
									},
									debug: true
								}
							]
						]
					},
				}],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css')
	]
};