const fs = require('fs');

module.exports = function salvaJson(data){
    const {nomeArquivo, dados} = data;
    fs.writeFile(`${nomeArquivo}.json`, JSON.stringify(dados, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar os dados em arquivo:', err);
        } else {
            console.log(`Dados salvos com sucesso em ${nomeArquivo}.json`);
        }
    });
};