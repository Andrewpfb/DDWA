const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './js/interface.js',
    output: {
        filename: 'bundle.js',
        //path: 'dist/'
        path: path.resolve(__dirname, 'dist')
    }
};