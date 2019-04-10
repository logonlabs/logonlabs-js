const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'logonlabs.min.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    'css-loader'
                ],
            },
        ],
    }
};