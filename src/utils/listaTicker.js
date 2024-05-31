const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = async function extractTips(endpoint) {
    try {
        // Carregar o DOM da URL fornecida
        const dom = await JSDOM.fromURL(endpoint);
        const document = dom.window.document;

        // Declarar a variável 'table' fora dos blocos if/else
        let table;

        // Selecionar a tabela pelo seu ID com base na URL
        if(endpoint.split('/')[endpoint.split('/').length - 1] === 'fii_resultado.php'){
            table = document.querySelector('#tabelaResultado');
        } else {
            table = document.querySelector('#resultado');
        }

        // Verificar se a tabela foi encontrada
        if (!table) {
            console.error('Tabela não encontrada!');
            return;
        }

        // Selecionar todos os elementos com a classe 'tips' dentro da tabela
        const tipsElements = table.querySelectorAll('.tips');
        if (!tipsElements) {
            console.error('Elementos \'tips\' não encontrados na tabela!');
            return;
        }

        const tips = [];

        // Extrair o texto de cada elemento 'tips'
        tipsElements.forEach(element => {
            const link = element.querySelector('a'); // Assume que cada 'tips' contém um link
            if (link) {
                tips.push(link.textContent);
            } else {
                console.error('Link não encontrado dentro de \'tips\'!');
            }
        });

        return tips;
    } catch (e) {
        console.error('Erro ao extrair os dados:', e);
    }
};
