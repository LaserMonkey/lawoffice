// 基础引入
var path = require('path');
var glob = require('glob');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义文件夹路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

// 获取所有入口文件
var entries = getEntries(SRC_PATH);

// webpack 配置项
var config = {

	// 入口
	entry: entries,

	//输出文件夹
	output: {
		path: BUILD_PATH,
		filename: '[name].[hash:7].js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/'
	},

	//开发调试时启动nodejs服务器
	devServer: {
		historyApiFallback: true,
		hot: true,
		port: 9000,
		host: "0.0.0.0"
	},

	devtool: "source-map",

	resolve: {
		// 路径别名，简化资源的引入
		// alias: {
		//     js: path.join(SRC_PATH, 'js'),
		//     css: path.join(SRC_PATH, 'css'),
		//     img: path.join(SRC_PATH, 'img'),
		//     tpl: path.join(SRC_PATH, 'tpl')
		// },
		extensions: ['', '.js', '.css', '.scss','.vue', '.html'],
		alias: {
			'vue$': path.join(ROOT_PATH, './node_modules/vue/dist/vue.js')
		},

		modulesDirectories: ['node_modules']
	},

	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: 'sass-loader',
				exclude: /node_modules/
			},

			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			
			{
				test: /\.vue$/,
				loader: 'vue'
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
 
	vue: {
		loaders: {
			js: 'babel'
		}
	}
}

// 获取入口
function getEntries(basePath, excludes) {

	var excludes = excludes || [];
	var ignoreDirs = ['lib', 'commons', 'components', 'ui']; // 需要排除的目录名
	ignoreDirs.forEach(function(dir){
		excludes.push(path.join(basePath, '/**/' + dir + '/**/*.js'));
	});

	var files = glob.sync(basePath + '/*/*.js');
	var entries = {};

	files.forEach(function(entry, index){
		var relaPath = path.relative(basePath, entry);
		var extName = path.extname(entry);
		var chunkName = relaPath.replace(new RegExp(extName), '');
		entries[chunkName] = entry;
	});

	return entries;
}

var pages = Object.keys(entries);

// 批量生成html页面
pages.forEach(function(page, index){

	config.plugins.push(new HtmlWebpackPlugin({
		template: path.join(SRC_PATH, '/', page) + '.html',
		filename: page + '.html',
		chunks: ['commons', page, 'webpack-dev-server'],
		inject: 'body'
	}));

});

module.exports = config;