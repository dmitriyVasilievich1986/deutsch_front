module.exports = {
    output: require("./output"),

    entry: require("./entry"),

    ...require("./plugins"),

    resolve: {
        extensions: ['.js', '.jsx'],
        ...require("./aliases"),
    },

    module: {
        ...require("./rules"),
    },
};