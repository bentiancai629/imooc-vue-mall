module.exports = {
    // cnpm i vue-loader babel-preset-env babel-core --save vue-template-compiler  sass-loader node-sass css-loader style-loader 
    entry:'./src/lib/index.js',
    output:{
        output:path.join(_dirname,'./dist'),
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
                include:path.join(_dirname,'./dist'),
                exclude:/node_modules/
            }
        ]
    },
    plugins:[

    ]



        
}