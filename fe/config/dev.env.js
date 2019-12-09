var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  resolve: {
  alias: {
    // If using the runtime only build
    // vue$: 'vue/dist/vue.runtime.esm.js' // 'vue/dist/vue.runtime.common.js' for webpack 1
    // Or if using full build of Vue (runtime + compiler)
    vue$: 'vue/dist/vue.esm.js'      // 'vue/dist/vue.common.js' for webpack 1
  }
}
})
