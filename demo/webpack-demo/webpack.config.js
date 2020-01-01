var path = require('path');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// cnpm i --save-dev html-webpack-plugin 
// cnpm i --save-dev clean-webpack-plugin
// cnpm i --save-dev css-loader style-loader mini-css-extract-plugin 
// cnpm i --save-dev babel/core @babel/cli @babel/preset-env
// cnpm i --save-dev babel/polyfill
// cnpm i --save-dev jquery
module.exports = {
    entry:{
        index:'./src/js/index.js',
        cart:'./src/js/cart.js'
    },
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'js/[name].js',
        publicPath:''
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                include:path.join(__dirname,'src'),
                exclude:/node_modules/,
                loader:'babel-loader'
            },
            {
                test:/\.css$/,
                include:path.join(__dirname,'src'),
                exclude:/node_modules/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: '../',
                        hmr: process.env.NODE_ENV === 'development',
                      },
                    },
                    'css-loader',
                  ],

            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html',
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            filename:'cart.html',
            template:'./src/cart.html',
            chunks:['cart']
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery',
            'window.jQuery':'jquery'
        })
    ],
    // devtool:'#source-map'
}