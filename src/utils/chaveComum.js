
module.exports = async function chavesComuns(arquivoJson) {
    try {
        const objetos = arquivoJson;
        if (!Array.isArray(objetos) || objetos.length === 0) {
            return null; // Retorna nulo se os dados não são um array ou estão vazios
        }

        const chavesComuns = objetos.reduce((acumulador, objeto, index) => {
            if (index === 0) {
                // No primeiro objeto, apenas adicione todas as suas chaves ao acumulador
                return new Set(Object.keys(objeto));
            } else {
                // Para os demais objetos, mantenha apenas as chaves que já estão no acumulador
                const chavesDoObjeto = new Set(Object.keys(objeto));
                for (let chave of acumulador) {
                    if (!chavesDoObjeto.has(chave)) {
                        acumulador.delete(chave);
                    }
                }
                return acumulador;
            }
        }, new Set());

        return Array.from(chavesComuns); // Retorna as chaves comuns como um array
    } catch (error) {
        console.error('Erro ao ler ou analisar o arquivo:', error);
        return null; // Retorna nulo em caso de erro na leitura ou na análise
    }
};
