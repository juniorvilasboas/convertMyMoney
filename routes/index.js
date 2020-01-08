const init = dependencies => {
    const router = require('express').Router()

    const { apiBCB, convert } = dependencies

    router.get('/', async(req,res) => {
        const cotacao = await apiBCB.getCotacao()
        const data = await apiBCB.getTodayFormater()
    
        res.render('home', {
            cotacao,
            data
        })
    })
    
    router.get('/cotacao', (req,res) => {
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

    return router
}

module.exports = init