const dotenv = require('dotenv');
const FundamentusAPI = require('fundamentus-unofficial-api');
const extractTips = require('./listaTicker.js');
const salvaJson = require('./salvaJson.js');
const salvaPlanilha = require('./salvaPlanilha.js');
dotenv.config();

module.exports = async function extraiTickers(data) {
    const {url, nomeArquivo} = data;
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
    const caminho = process.env.PATH_TO_SAVE || '';
    // Salvando os resultados em um arquivo JSON
    salvaJson({nomeArquivo, dados: results});
    // Salvando em um arquivo excel
    salvaPlanilha(
        { dadosPlanilha: results, nomePlanilha: nomeArquivo, caminhoPlanilha: caminho }
    ); 
};