const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: {
        main: "./srcs/frontend/js/main.js",
        storySlide: "./srcs/frontend/js/storySlide.js",
        calendar: "./srcs/frontend/js/calendar.js",
        api: "./srcs/frontend/js/api.js",
        homePage: "./srcs/frontend/js/homePage.js",
        ui: "./srcs/frontend/js/ui.js",
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css"
    })],
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: "defaults"
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    }
};