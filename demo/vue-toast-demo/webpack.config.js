var path = require('path');
module.exports = {
    // cnpm i  --save vue-loader babel-preset-env babel-core vue-template-compiler  sass-loader node-sass css-loader style-loader 
    entry:'./src/lib/index.js',
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'vue-toast-demo.js'
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
                exclude:/node_modules/,
                options:{
                    loaders: {
                        scss: 'sytle-loader!css-loader!sass-loader'
                    }
                }
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                include:path.join(__dirname,'./dist'),
                exclude:/node_modules/
            }
        ]
    },
    plugins:[

    ]



        
}