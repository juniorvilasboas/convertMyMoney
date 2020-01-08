const init = dependencies => {
    const express = require('express')
    const path = require('path')
    const app = express()

    const { apiBCB, convert } = dependencies

    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    app.use(express.static(path.join(__dirname, 'public')))

    app.get('/', async(req,res) => {
        const cotacao = await apiBCB.getCotacao()
        const data = await apiBCB.getTodayFormater()
    
        res.render('home', {
            cotacao,
            data
        })
    })
    
    app.get('/cotacao', (req,res) => {
        const { cotacao, quantidade } = req.query
    
        if (cotacao && quantidade) {
            const conversao = convert.convert(cotacao, quantidade)
            
            res.render('cotacao', {
                error: false,
                cotacao: convert.toMoney(cotacao),
                quantidade: convert.toMoney(quantidade),
                conversao: convert.toMoney(conversao)
            })
        } else {
            res.render('cotacao', {
                error: 'Valores inválidos!'
            })
        }
    })

    return app
}

module.exports = init