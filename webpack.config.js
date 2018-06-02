const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const extractCss = new ExtractTextWebpackPlugin('dist/css/[name].css')
const extractLess = new ExtractTextWebpackPlugin('dist/css/[name].css')
const webpack = require('webpack')

const conf = {
    entry: {
        app: './src/app.js',
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'dist/js/[name].js',
        publicPath: ''
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: 'babel-loader',
                include: /src/,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: extractCss.extract({
                    use: {
                        loader: 'css-loader',
                        // options: {minimize: true}
                    }
                })
            },
            {
                test: /\.less$/i,
                use: extractLess.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            // options: {minimize: true}
                        },
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2000,
                            name: '[name].[ext]',
                            outputPath: 'dist/static/img'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff2?|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'dist/static/font'
                        }
                    }
                ]
            },
            {
                test: /\.html?/i,
                use: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true
            // }
        }),
        new ExtractTextWebpackPlugin('dist/css/style.css'),
        // new CleanWebpackPlugin('dist'),
        extractCss,
        extractLess
    ],
    devServer: {
        port: 80
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: 'vendor'
        }
    }

}
module.exports = conf