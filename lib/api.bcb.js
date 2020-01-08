const axios = require('axios')
//              MM-dd-yyyy
//const data = '11-27-2019'
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()

    const meses = [31,28,31,30,31,30,31,31,30,31,30,31]

    if(today.getDay() == 0)
        if(today.getDate() > 2)
            return (today.getMonth()+1)+'-'+(today.getDate()-2)+'-'+today.getFullYear()
        else
            return (today.getMonth())+'-'+((today.getDate()+meses[today.getMonth()-1])-2)+'-'+today.getFullYear()
    else if(today.getDay() == 1 && today.getHours() < 13)
        return (today.getMonth()+1)+'-'+(today.getDate()-3)+'-'+today.getFullYear()
    else if(today.getDay() == 6 || today.getHours() < 13)
        if(today.getDate() > 1)
            return (today.getMonth()+1)+'-'+(today.getDate()-1)+'-'+today.getFullYear()
        else
            return (today.getMonth())+'-'+((today.getDate()+meses[today.getMonth()-1])-1)+'-'+today.getFullYear()
    else
        return (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()

}
const getTodayFormater = () => {
    const data = getToday()

    const novaData = data.split('-')
    
    return novaData[1]+'/'+novaData[0]+'/'+novaData[2]
}
const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async() => {
    try {
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        
        return cotacao
    } catch(err) {
        return ''
    }

}

module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
    extractCotacao,
    getToday,
    getTodayFormater,
    getUrl,
    pure: {
        getCotacao
    }
}