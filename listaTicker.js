const jsdom = require('jsdom')
const {JSDOM} = jsdom;

module.exports = async function extractTips(endpoint) {
    try {
        // Carregar o DOM da URL fornecida
        const dom = await JSDOM.fromURL(endpoint);
        const document = dom.window.document;

        // Selecionar a tabela pelo seu ID
        const table = document.querySelector("#tabelaResultado");
        if (!table) {
            console.error("Tabela não encontrada!");
            return;
        }

        // Selecionar todos os elementos com a classe 'tips' dentro da tabela
        const tipsElements = table.querySelectorAll(".tips");
        const tips = [];

        // Extrair o texto de cada elemento 'tips'
        tipsElements.forEach(element => {
            const link = element.querySelector("a"); // Assume que cada 'tips' contém um link
            if (link) {
                tips.push(link.textContent);
            }
        });
        return tips;
    } catch (e) {
        console.error("Erro ao extrair os dados:", e);
    }
}