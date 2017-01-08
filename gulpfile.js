var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var del = require('del');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfigDev = require('./webpack.dev');
var webpackConfigPackage = require('./webpack.package');

gulp.task('dev', function(callback){
    var server = new WebpackDevServer(webpack(webpackConfigDev), {
        stats: {
            colors: true
        }
    });

    server.listen(9000);
});

gulp.task('package', function(callback){
    del.sync('package/*', '!package'); // 清空package文件夹

    webpack(webpackConfigPackage, function(err, stats){
        if(err) throw new gutil.PluginError('webpack', err);

        // 用来显示webpack打包过程中的log信息
        gutil.log('[webpack]', stats.toString({
            chunks: false,
            colors: true
        }));

        callback();
    });
});