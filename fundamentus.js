const fs = require('fs');
const FundamentusAPI = require('fundamentus-unofficial-api')
const extractTips = require('./listaTicker.js')

async function fetchAllData() {
    const fiis = await extractTips('https://www.fundamentus.com.br/fii_resultado.php');
    const results = [];

    for (const element of fiis) {
        try {
            const share = await FundamentusAPI.fetch(element);
            results.push(share);
        } catch (error) {
            console.error('Erro ao acessar o ticker ', element, ': ', error);
        }
    }

    // Salvando os resultados em um arquivo JSON
    fs.writeFile('resultados.json', JSON.stringify(results, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar os dados em arquivo:', err);
        } else {
            console.log('Dados salvos com sucesso em resultados.json');
        }
    });
}

fetchAllData();
