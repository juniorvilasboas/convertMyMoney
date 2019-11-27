// https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/.../0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao
// https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='10-02-2018'&$top=100&$format=json
// http://was-p.bcnet.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata$metadata#_CotacaoDolarDia(cotacaoCompra,cotacaoVenda,dataHoraCotacao)

const axios = require('axios')
//            MM-dd-yyyy
const data = '11-27-2019'
const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json`

axios
    .get(url)
    .then( res => console.log(res.data.value[0].cotacaoVenda))