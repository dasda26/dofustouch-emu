const path = require("path");
const {ProvidePlugin} = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: path.join(__dirname, "src", "index.jsx")
    },
    output: {
        path: path.join(__dirname, "assets"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".less"]
    },
    module: {
        rules: [{
            test: [/\.js$/, /\.jsx$/],
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"]
                }
            }]
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        url: true,
                        minimize: true
                    }
                }, {
                    loader: "less-loader"
                }]
            })
        }, {
            test: /\.(jpe?g|png|gif|svg|otf|eot|ttf|woff2?)$/i,
            loader: "file-loader"
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css",
            allChunks: true
        }),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        })
    ]
};
