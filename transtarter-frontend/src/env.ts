/**
 * Copy of the env.js from the upper folder.
 * We use same configurations with different file extension because upper folder's configs use before ts transpile
 */

export const envArgs = {
    isServeBuild: process.argv.includes('serve'),
    isBasicBuild: process.argv.includes('./dist/app'), // basic configuration of Vue.js app
    isWebComponentBuild: process.argv.includes('./dist/wc'),
}
