// 基础引入
var path = require('path');
var glob = require('glob');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义文件夹路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var PAGE_PATH = path.resolve(SRC_PATH, 'page');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

// 获取所有入口文件
var entries = getEntries(PAGE_PATH);

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
		alias: {
			'vue$': path.join(ROOT_PATH, './node_modules/vue/dist/vue.js'),
		    basecss: path.join(SRC_PATH, './common/ui/utilities.scss'),
		    img: path.join(SRC_PATH, './asset/img'),
		    vedio: path.join(SRC_PATH, './asset/vedio'),
		    file: path.join(SRC_PATH, './asset/file'),
		    tpl: path.join(SRC_PATH, './common/tpl'),
		    store: path.join(SRC_PATH, './common/store')
		},
		extensions: ['', '.js', '.css', '.scss','.vue', '.html'],
		modulesDirectories: ['node_modules']
	},

	module: {
		loaders: [
			{
				test: /\.scss$/,
        		loaders: ["style-loader", "css-loader", "sass-loader"]
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
		template: path.join(PAGE_PATH, '/', page) + '.html',
		filename: page + '.html',
		chunks: ['commons', page, 'webpack-dev-server'],
		inject: 'body'
	}));

});

module.exports = config;