const path = require('path');

module.exports = {
    entry: {
        main: path.resolve('./src/App.js'),
    },
    output: {
        path: path.resolve('./static/js'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ],
    },
};