module.exports = {
    output: require("./output"),
    entry: require("./entry"),
    ...require("./plugins"),
    module: {
        ...require("./rules"),
    },
};