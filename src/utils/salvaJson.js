const fs = require('fs').promises; // Importando a API de Promises do módulo fs

module.exports = async function salvaJson(data){
    const {nomeArquivo, dados} = data;
    try {
        await fs.writeFile(`${nomeArquivo}.json`, JSON.stringify(dados, null, 2));
        console.log(`Dados salvos com sucesso em ${nomeArquivo}.json`);
    } catch (err) {
        console.error('Erro ao salvar os dados em arquivo:', err);
    }
};
