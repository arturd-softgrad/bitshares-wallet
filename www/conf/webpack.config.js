var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Clean = require("clean-webpack-plugin");
var git = require('git-rev-sync')

// BASE APP DIR
var root_dir = path.resolve(__dirname, "..");

// FUNCTION TO EXTRACT CSS FOR PRODUCTION
function extractForProduction(loaders) {
  return ExtractTextPlugin.extract("style", loaders.substr(loaders.indexOf("!")));
}

module.exports = function(options) {
    console.log(options.prod ? "Using PRODUCTION options\n" : "Using DEV options\n");
    // STYLE LOADERS
    var cssLoaders = "style-loader!css-loader",
      scssLoaders = "style!css!autoprefixer!sass?outputStyle=expanded";

    // DIRECTORY CLEANER
    var cleanDirectories = ["dist"];

    // OUTPUT PATH
    var outputPath = path.join(root_dir, "assets");

    // COMMON PLUGINS
    var plugins = [
        new webpack.optimize.DedupePlugin(),
        new Clean(cleanDirectories),
        new webpack.DefinePlugin({
            APP_VERSION: JSON.stringify(git.tag())
        })
    ];

    if (options.prod) {
        // WRAP INTO CSS FILE
        cssLoaders = extractForProduction(cssLoaders);
        scssLoaders = extractForProduction(scssLoaders);

        // PROD PLUGINS
        plugins.push(new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}));
        plugins.push(new webpack.PrefetchPlugin("react"));
        plugins.push(new ExtractTextPlugin("app.css"));
        plugins.push(new webpack.optimize.UglifyJsPlugin({warnings: false, minimize: false, sourceMap: false, compress: true, output: {screw_ie8: true}}));
        plugins.push(new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js", Infinity));
        // PROD OUTPUT PATH
        outputPath = path.join(root_dir, "dist");
    } else {
        plugins.push(new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}}));
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    var config = {
        entry: {
            app: options.prod ?
                path.resolve(root_dir, "js/main.js") :
                [
                    "webpack-dev-server/client?http://localhost:8080",
                    "webpack/hot/only-dev-server",
                    path.resolve(root_dir, "js/main.js")
                ]
        },
        output: {
            path: outputPath,
            filename: "bundle_new.js"
        },
        devtool: "#inline-source-map",
        debug: options.prod ? false : true,
        module: {
            loaders: [
                { 
                    test: /\.jsx$/,
                    include: [path.join(root_dir, "js"), path.join(root_dir, "node_modules/react-foundation-apps")],
                    loaders: options.prod ? ["babel-loader"] : ["babel-loader?cacheDirectory"]
                },
                { 
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    query: {compact: false, cacheDirectory: true}
                },
                { test: /\.json/, loader: "json" },
                { test: /\.coffee$/, loader: "coffee-loader" },
                { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" },
                { test: /\.css$/, loader: cssLoaders },
                {
                    test: /\.scss$/,
                    //loader: "style!css!sass?outputStyle=expanded&includePaths[]=" + (path.resolve(root_dir, "./node_modules"))
                    loader: scssLoaders
                },
                { test: /\.woff$/, loader: "url-loader?limit=100000&mimetype=application/font-woff" },
                { test: /.*\.svg$/, loaders: ["svg-inline-loader", "svgo-loader"] },
                { test: /\.md/, loader: 'html?removeAttributeQuotes=false!remarkable' }
            ]
        },
        resolve: {
            //alias: {lzma: path.resolve(root_dir, "./node_modules/lzma/src/lzma.js")},
            root: [path.resolve(root_dir, "./js"), path.resolve(root_dir, "../dl/src")],
            extensions: ["", ".js", ".jsx", ".coffee", ".json"],
            modulesDirectories: ["node_modules", "bower_components", path.resolve(root_dir, "../dl/lib")],
            fallback: [path.resolve(root_dir, "./node_modules")]
        },
        resolveLoader: {
            root: path.join(root_dir, "node_modules"),
            fallback: [path.resolve(root_dir, "./node_modules")]
        },
        plugins: plugins,
        root: outputPath,
        remarkable: {
            preset: "full",
            typographer: true
        }
    };

    if(options.prod) config.entry.vendors = [
        "react", "classnames", "react-router", "counterpart", "react-translate-component",
        "perfect-scrollbar", "jdenticon", "react-notification-system", "react-tooltip",
        "whatwg-fetch", "alt", "react-json-inspector",
        "immutable", "lzma",  "lodash"
    ];

    return config;

}