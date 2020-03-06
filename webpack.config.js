const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env = {}) => ({
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    cache: true,
    entry: path.resolve(__dirname, 'example/client.ts'),
    target: "web",
    output: {
        path: path.resolve(__dirname, 'app'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'app/index.html'),
            template: path.resolve(__dirname, 'example/index.html'),
            hash: false,
            inject: 'body'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '/app'),
        publicPath: '/',
        overlay: true,
        historyApiFallback: true,
        stats: {
            assets: false,
            modules: false,
            performance: true,
            timings: true,
            entrypoints: false,
            children: false,
            version: false,
            logging: 'log'
        }
    }
});