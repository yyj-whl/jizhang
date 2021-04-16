/* eslint-disable */ 
const path = require('path')
module.exports = {
  lintOnSave: false,
    chainWebpack: config => {
        const dir = path.resolve(__dirname, 'src/assets/icons')
        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)
            .include.add(dir).end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({extract: false}).end()
            .use('svgo-loader').loader('svgo-loader')
            .tap(options => ({...options, plugins: [{ name: 'removeAttrs', params: { attrs: '(stroke|fill)' } }]}))//去掉svg原有的fill颜色
            .end()
        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
        config.module.rule('svg').exclude.add(dir)//其他svg loader排除icons目录
    },

}
