const express = require('express')
const chokidar = require('chokidar')

module.exports = function ExpressModule (moduleOptions) {
  const cwdPath = this.options.srcDir

  const options = {
    expressPath: '/express',
    routesPath: '/express/routes',
    ...moduleOptions
  }

  const app = express()
  const routesPath = cwdPath + options.routesPath

  app.use((req, res, next) => {
    require(routesPath)(req, res, next)
  })

  // handle hot loading of routes
  // re-initializes everything when file changes inside express dir
  const expressPath = cwdPath + options.expressPath
  chokidar
    .watch(expressPath)
    .on('change', (path) => {
      const keys = Object.keys(require.cache).filter(k => k.includes(__dirname))
      keys.forEach(k => delete require.cache[k])
    })

  this.addServerMiddleware(app)
}
