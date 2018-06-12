const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const extractCss = new ExtractTextWebpackPlugin('css/[name].css')
const extractLess = new ExtractTextWebpackPlugin('css/[name].css')

const conf = {
    entry: {
        'angular-directive-dy': './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '',
        libraryTarget: 'umd'
    },
    externals: {
        angular: 'angular',
        ngAnimate: 'angular-animate'
    },
    // mode: 'development',
    mode: 'production',
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
                        options: {minimize: true}
                    }
                })
            },
            {
                test: /\.less$/i,
                use: extractLess.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {minimize: true}
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
                            outputPath: 'static/img'
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
                            outputPath: 'static/font'
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
        new ExtractTextWebpackPlugin('css/[name].css'),
        new CleanWebpackPlugin('dist'),
        extractCss,
        extractLess
    ]
}
module.exports = conf