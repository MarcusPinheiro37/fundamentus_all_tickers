const extraiTickers = require('./src/utils/extraiTickers.js');

const urls = [
    {
        tipo: 'Fundos Imobiliários',
        url: 'https://www.fundamentus.com.br/fii_resultado.php'
    },
    {
        tipo: 'Empresas',
        url: 'https://www.fundamentus.com.br/resultado.php'
    }
];
urls.forEach(element => {
    extraiTickers({url: element.url, nomeArquivo: element.tipo});
});
