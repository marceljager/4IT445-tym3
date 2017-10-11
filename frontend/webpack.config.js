const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackManifest = require('webpack-manifest-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const pathsToClean = [
    'public/js/*',
    'public/css/*',
    'manifest.json'
];

module.exports = (env) => {
    const devtool = env === 'dev' ? 'inline-source-map' : 'source-map';

    const config = {
        entry: {
            main: './src/entry.js'
        },
        output: {
            path: path.join(__dirname, 'public/'),
            publicPath: '/',
            filename: env === 'dev' ? 'js/[name].js' : 'js/[name].[chunkhash].js',
            chunkFilename: env === 'dev' ? 'js/[name].js' : 'js/[name].[chunkhash].js',
            sourceMapFilename: env === 'dev' ? 'js/[name].map' : 'js/[name].[chunkhash].map'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        devtool,
        module: {
            rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '/',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            import: false,
                            url: false,
                            minimize: env !== 'dev',
                            sourceMap: true,
                            importLoaders: 2
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => ([
                            autoprefixer
                        ]),
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            // use style-loader in development
        })
}]
},
    plugins: [
        new CleanWebpackPlugin(pathsToClean),
        new UglifyJSPlugin({ sourceMap: true }),
        new ExtractTextPlugin({
            filename: env === 'dev' ? 'css/main.css' : 'css/main.[chunkhash].css'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => (
                resource &&
                resource.indexOf('node_modules') >= 0
            )
}),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
    }),
        new WebpackManifest({
            fileName: '../manifest.json'
        }),
]
};

    if (env === 'dev') {
        config.plugins.push(new webpack.NamedModulesPlugin());
    } else {
        config.module.rules.push({
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        });
        config.plugins.push(new WebpackChunkHash());
        config.plugins.push(new webpack.HashedModuleIdsPlugin());
    }

    return config;
};
