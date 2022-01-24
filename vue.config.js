const manifestJSON = require('./public/manifest.json')

module.exports = {
  runtimeCompiler: true,
  pwa: {
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js'
    }
  }
}
