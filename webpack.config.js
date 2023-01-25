const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
    mode: "production",
    // 読み込むファイルを増やす場合はここに追加
    entry: {
        'app': './src/js/app.js',
        'app.css': './src/sass/app.scss'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "js/[name].js"
    },
    performance: { 
        hints: false
    },
    devServer: {
        static: "public",
        open: true
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name]",
        }),
        new ESLintPlugin({
            extensions: '.js',
            exclude: 'node_modules',
            emitWarning: true,
            files: path.resolve(__dirname, 'src'),
        }),
        new StylelintPlugin({
            files: path.join('src', '**/*.scss'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [ 'autoprefixer', { grid: true } ]
                                ]
                            },
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    stats: {
        errorDetails: true,
    },
    target: ["web", "es5"]
}