const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')

const dependencies = {
    convert,
    apiBCB
}

const app = require('./app')(dependencies)

const port = process.env.PORT || 3000

app.listen(port, err => {
    if(err) {
        console.log('Não foi possível iniciar servidor!')
    }
})