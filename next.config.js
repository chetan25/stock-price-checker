const Dotenv = require('dotenv-webpack');
const withLess = require('@zeit/next-less');

module.exports = withLess({
    webpack(config) {
        //to replace the env variable
        config.plugins.push(new Dotenv());
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });
        return config
    },
    cssModules: false,
    lessLoaderOptions: {
        javascriptEnabled: true
    }
});