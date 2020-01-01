var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// cnpm i --save-dev html-webpack-plugin 
module.exports = {
    entry:{
        index:'./src/js/index.js',
        cart:'./src/js/cart.js'
    },
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'js/[name].js',
        publicPath:'http://cloud.baidu.com'
    },
    module:{

    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename:'cart.html',
            template:'./src/cart.html'
        }),
    ],
    // devtool:'#source-map'
}