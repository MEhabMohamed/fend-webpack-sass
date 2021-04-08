const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    devServer: {
        setup(app) {
            projectData = {};

            const bodyParser = require('body-parser');
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());
            
            const cors = require('cors');
            app.use(cors());

            app.get('/gather', function (req, res) {
                res.send(projectData)
            })
            
            app.post('/add', function(req, res) {
                projectData.agreement = req.body.agreement;
                projectData.confidence = req.body.confidence;
                projectData.irony = req.body.irony;
                projectData.score_tag = req.body.score_tag;
                projectData.subjectivity = req.body.subjectivity;
                projectData.name = req.body.name;
            })
        },
        port: 8080,
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new Dotenv(),
    ]
}
