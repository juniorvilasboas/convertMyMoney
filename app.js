const init = dependencies => {
    const express = require('express')
    const path = require('path')
    const app = express()

    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    app.use(express.static(path.join(__dirname, 'public')))

    const routes = require('./routes/index')

    app.use(routes(dependencies))

    return app
}

module.exports = init