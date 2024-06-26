const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const xl = require('excel4node');

module.exports = async function convertePlanilha(dadosConfig) {
    const { nomePlanilha, caminhoPlanilha, caminhoJson } = dadosConfig;
    const filePath = path.join(caminhoPlanilha, `${nomePlanilha}.xlsx`);
    const jsonPath = path.join(caminhoJson);

    // Lê os dados do arquivo JSON
    let dadosPlanilha = [];
    if (fs.existsSync(jsonPath)) {
        const rawdata = fs.readFileSync(jsonPath);
        dadosPlanilha = JSON.parse(rawdata);
    }

    let existingData = [];

    // Verifica se o arquivo Excel já existe
    if (fs.existsSync(filePath)) {
        // Lê o arquivo existente
        const file = xlsx.readFile(filePath);
        const sheetName = file.SheetNames[0];
        const worksheet = file.Sheets[sheetName];
        existingData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    }

    // Adiciona os títulos das colunas se não existirem
    if (existingData.length === 0 && dadosPlanilha.length > 0) {
        const titulos = Object.keys(dadosPlanilha[0]);
        existingData.push(titulos);
    }

    // Adiciona as novas linhas aos dados existentes
    dadosPlanilha.forEach(dado => {
        const newRow = Object.values(dado);
        existingData.push(newRow);
    });

    // Cria um novo workbook e worksheet
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet(nomePlanilha);

    // Escreve os dados atualizados na nova worksheet
    existingData.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            ws.cell(rowIndex + 1, colIndex + 1).string(String(cell));
        });
    });

    // Escreve o arquivo atualizado
    wb.write(filePath);
};
