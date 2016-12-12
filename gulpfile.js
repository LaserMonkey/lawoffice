var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfigDev = require('./webpack.dev.config');

gulp.task('dev', function(callback){
    var server = new WebpackDevServer(webpack(webpackConfigDev), {
        stats: {
            colors: true
        }
    });

    server.listen(9000);
});