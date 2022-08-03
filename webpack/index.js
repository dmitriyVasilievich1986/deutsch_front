module.exports = (env, argv) => {
    const isDevelopment = argv.mode === "development"
    return {
        output: require("./output"),

        entry: require("./entry"),

        ...require("./plugins"),

        resolve: {
            extensions: ['.js', '.jsx'],
            ...require("./aliases"),
        },

        devtool: isDevelopment ? 'eval-source-map' : "source-map",

        module: {
            ...require("./rules"),
        },
    }
};