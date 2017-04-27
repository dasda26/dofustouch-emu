const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build/assets/"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"]
    },
    module: {
        rules: [
            {
                test: [/\.js$/, /\.jsx$/],
                exclude: [/node_modules/],
                use: [{
                    loader: "babel-loader",
                    options: {presets: ["es2015", "react"]},
                }]
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                loader: ExtractTextPlugin.extract({
                    use: "css-loader?importLoaders=1",
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "bundle.css",
            allChunks: true
        })
    ]
};
