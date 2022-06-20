const path = require('path');

module.exports = {
    alias: {
        reduxReducers: path.resolve(__dirname, '../src/reducers'),
        constants: path.resolve(__dirname, '../src/Constants'),
    }
}