var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

function webpackConfigGenerator(env) {
    const sourcemaps = !!env.development;
    const webpackInitConfig = {
        resolve: {
            extensions: ['*', '.js', '.vue', '.json']
        },
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/',
            filename: 'build.js'
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    use: [{
                        loader: 'vue-style-loader',
                        options: {
                            sourceMap: sourcemaps
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: sourcemaps
                        }
                    }],
                    exclude: /node_modules/
                }, {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(), new HTMLWebpackPlugin({ filename: './index.html', template: 'index.html' })
        ]
    };
    return webpackInitConfig;
}
module.exports = webpackConfigGenerator;