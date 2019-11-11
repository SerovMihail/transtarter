const envArgs = require('./env')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const buildLightConfig = envArgs.isServeBuild || envArgs.isBasicBuild
let scssConfig = {}
if (buildLightConfig) {
    scssConfig = `@import "@/assets/scss/precompile.scss";`
} else {
    /**
     * // Divide big main.scss to small chunks
     */
    scssConfig = `@import "@/assets/scss/main.scss";`
}

function enableShadowCss(config) {
    const configs = [
        config.module.rule('vue').use('vue-loader'),
        config.module
            .rule('css')
            .oneOf('vue-modules')
            .use('vue-style-loader'),
        config.module
            .rule('css')
            .oneOf('vue')
            .use('vue-style-loader'),
        config.module
            .rule('css')
            .oneOf('normal-modules')
            .use('vue-style-loader'),
        config.module
            .rule('css')
            .oneOf('normal')
            .use('vue-style-loader'),
        config.module
            .rule('postcss')
            .oneOf('vue-modules')
            .use('vue-style-loader'),
        config.module
            .rule('postcss')
            .oneOf('vue')
            .use('vue-style-loader'),
        config.module
            .rule('postcss')
            .oneOf('normal-modules')
            .use('vue-style-loader'),
        config.module
            .rule('postcss')
            .oneOf('normal')
            .use('vue-style-loader'),
        config.module
            .rule('scss')
            .oneOf('vue-modules')
            .use('vue-style-loader'),
        config.module
            .rule('scss')
            .oneOf('vue')
            .use('vue-style-loader'),
        config.module
            .rule('scss')
            .oneOf('normal-modules')
            .use('vue-style-loader'),
        config.module
            .rule('scss')
            .oneOf('normal')
            .use('vue-style-loader'),
        config.module
            .rule('sass')
            .oneOf('vue-modules')
            .use('vue-style-loader'),
        config.module
            .rule('sass')
            .oneOf('vue')
            .use('vue-style-loader'),
        config.module
            .rule('sass')
            .oneOf('normal-modules')
            .use('vue-style-loader'),
        config.module
            .rule('sass')
            .oneOf('normal')
            .use('vue-style-loader'),
        config.module
            .rule('less')
            .oneOf('vue-modules')
            .use('vue-style-loader'),
        config.module
            .rule('less')
            .oneOf('vue')
            .use('vue-style-loader'),
        config.module
            .rule('less')
            .oneOf('normal-modules')
            .use('vue-style-loader'),
        config.module
            .rule('less')
            .oneOf('normal')
            .use('vue-style-loader'),
        config.module
            .rule('stylus')
            .oneOf('vue-modules')
            .use('vue-style-loader'),
        config.module
            .rule('stylus')
            .oneOf('vue')
            .use('vue-style-loader'),
        config.module
            .rule('stylus')
            .oneOf('normal-modules')
            .use('vue-style-loader'),
        config.module
            .rule('stylus')
            .oneOf('normal')
            .use('vue-style-loader'),
    ]
    configs.forEach(c =>
        c.tap(options => {
            options.shadowMode = true
            return options
        })
    )
}

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: scssConfig,
            },
        },
    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                { from: 'node_modules/oidc-client/dist/oidc-client.min.js', to: 'js' },
                { from: 'static/**/*.js', to: 'js' },
            ]),
        ],
        // this section will remove hash from file names
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js',
        },
        // end this section will remove hash from file names
    },
    // this section will remove hash from file names
    chainWebpack: config => {
        if (!buildLightConfig) {
            console.log("enable shadow css")
            enableShadowCss(config)
        }

        if (config.plugins.has('extract-css')) {
            const extractCSSPlugin = config.plugin('extract-css')
            extractCSSPlugin &&
                extractCSSPlugin.tap(() => [
                    {
                        filename: 'css/[name].css',
                        chunkFilename: 'css/[name].css',
                    },
                ])
        }
    },
    // end this section will remove hash from file names
}
