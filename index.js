const express = require('express')
const path = require('path')

const convert = require('./lib/convert')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000

app.get('/', (req,res) => {
    res.render('home')
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

app.listen(port, err => {
    if(err) {
        console.log('Não foi possível iniciar servidor!')
    }
})