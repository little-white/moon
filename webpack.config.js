var path = require('path');
module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        // rules: [{
        //     test: /\.css$/,
        //     use: ['style-loader', 'css-loader']
        // }],
        rules: [{
            test: /\.css$/,
            use: 'raw-loader'
        }]
    }
}
