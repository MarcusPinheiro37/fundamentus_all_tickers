const dotenv = require('dotenv');
const FundamentusAPI = require('fundamentus-unofficial-api');
const extractTips = require('./listaTicker.js');
const salvaJson = require('./salvaJson.js');
const salvaPlanilha = require('./salvaPlanilha.js');
const chaveComum = require('./chaveComum.js');  // Certifique-se de que o caminho está correto
dotenv.config();

module.exports = async function extraiTickers(data) {
    const { url, nomeArquivo } = data;
    const fiis = await extractTips(url);
    const results = [];

    for (const element of fiis) {
        try {
            const share = await FundamentusAPI.fetch(element);
            results.push(share);
        } catch (error) {
            console.error('Erro ao acessar o ticker ', element, ': ', error);
        }
    }

    // Filtrando chaves comuns
    const commonKeys = await chaveComum(results);
    const filteredResults = results.map(item => {
        let filteredItem = {};
        commonKeys.forEach(key => {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                filteredItem[key] = item[key];
            }
        });
        return filteredItem;
    });

    const caminho = process.env.PATH_TO_SAVE || '';
    // Salvando os resultados filtrados em um arquivo JSON
    console.log('salvando json');
    await salvaJson({ nomeArquivo, dados: filteredResults });
    console.log('json salvo');

    // Salvando em um arquivo Excel
    await salvaPlanilha({
        caminhoPlanilha: caminho,
        nomePlanilha: nomeArquivo,
        caminhoJson: `${nomeArquivo}.json`
    });
};
