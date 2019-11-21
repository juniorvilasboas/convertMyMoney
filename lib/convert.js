const convert = (cotacao, quantidade) => {
    return cotacao * quantidade
}

const toMoney = (n, c, d, t) => {
    //return parseFloat(valor).toLocaleString('pt-br',{style: 'currency', currency: moeda})
    /*return parseFloat(valor)
                .toFixed(2)
                .replace('.',',')
                .toLocaleString('pt-br',{style: 'currency', currency: moeda}) */
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

module.exports = {
    convert,
    toMoney
}