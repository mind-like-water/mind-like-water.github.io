const webpack = require('webpack');

// const MINIFY = process.env.NODE_MINIFY === '1';
const MINIFY = '1';


module.exports = {
    debug: true,
    entry: {
        // top: './js/top.js',
        common: './js/common.js'
    },
    output: {
      // filename: MINIFY ? '[name].min.js' : '[name].js',
      filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                  presets: ['es2015']
                }
            }
        ]
    },
    devtool: '#source-map',
    resolve: {
        extensions: ['', '.js']
    },
    plugins: MINIFY ? [
      new webpack.optimize.UglifyJsPlugin(),
    ] : []
};
