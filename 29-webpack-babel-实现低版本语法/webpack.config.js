const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const Webpack = require("webpack");

module.exports = {
    devServer: {
        contentBase: "./bundle", // 打包后的目录
        open: true, // 是否自动在浏览器中打开
        port: 9090, // 服务器端口号
        hot: true, // 开启热更新, 只要开启了热更新就不会自动刷新网页了
        hotOnly: true // 哪怕不支持热更新也不要刷新网页
    },
    /*
    optimization: 配置webpack的优化项
    * */
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    /*
    配置sourcemap
    development: cheap-module-eval-source-map
    production: cheap-module-source-map
    * */
    devtool: "cheap-module-eval-source-map",
    /*
    mode: 指定打包的模式, 模式有两种
    一种是开发模式(development): 不会对打包的JS代码进行压缩
    还有一种就是上线(生产)模式(production): 会对打包的JS代码进行压缩
    * */
    mode: "development", // "production" | "development"
    /*
    entry: 指定需要打包的文件
    * */
    entry: "./src/js/index.js",
    /*
    output: 指定打包之后的文件输出的路径和输出的文件名称
    * */
    output: {
        /*
        filename: 指定打包之后的JS文件的名称
        * */
        filename: "js/bundle.js",
        /*
        path: 指定打包之后的文件存储到什么地方
        * */
        path: path.resolve(__dirname, "bundle")
    },
    /*
    module: 告诉webpack如何处理webpack不能够识别的文件
    * */
    module: {
        rules: [
            // 打包JS规则
            {
                test: /\.js$/,
                exclude: /node_modules/, // 告诉webpack不处理哪一个文件夹
                loader: "babel-loader",
                options: {
                    "presets": [["@babel/preset-env", {
                        targets: { // 告诉babel你需要兼容哪些浏览器
                            "chrome": "58",
                        },
                        useBuiltIns: "usage"
                    }]]
                }
            },
            // 打包图片规则
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 指定图片限制的大小
                            limit: 1024 * 20,
                            // 指定打包后文件名称
                            name: '[name].[ext]',
                            // 指定打包后文件存放目录
                            outputPath: 'images/',
                        }
                    }
                ]
            },
            // 打包CSS规则
            {
                test: /\.css$/,
                /*
                css-loader:   解析css文件中的@import依赖关系
                style-loader: 将webpack处理之后的内容插入到HTML的HEAD代码中
                * */
                // use: [ 'style-loader', 'css-loader' ]
                use:[
                    {
                        // loader: "style-loader",
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    /*
    plugins: 告诉webpack需要新增一些什么样的功能
    * */
    plugins: [
        new HtmlWebpackPlugin({
        // 指定打包的模板, 如果不指定会自动生成一个空的
        template: './src/index.html',
        minify: {
            // 告诉htmlplugin打包之后的html文件需要压缩
            // collapseWhitespace: true
        }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: "./doc",
            to: "doc"
        }]),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new Webpack.HotModuleReplacementPlugin()
    ]
};
