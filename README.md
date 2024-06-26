
# Projeto Fundamentus

## Descrição

Este projeto utiliza Node.js para extrair informações sobre Fundos Imobiliários e Empresas listadas no site Fundamentus. Utiliza bibliotecas como jsdom e fundamentus-unofficial-api para navegação e extração de dados, além de salvar esses dados em JSON e planilhas Excel para análises futuras.

## Estrutura do Projeto

- `src/`
  - `utils/`
    - `chaveComum.js`: Identifica chaves comuns em objetos JSON.
    - `extraiTickers.js`: Extrai informações de tickers a partir das URLs fornecidas.
    - `listaTicker.js`: Extrai e lista tickers de uma página web.
    - `salvaJson.js`: Salva dados extraídos em um arquivo JSON.
    - `salvaPlanilha.js`: Salva dados em uma planilha Excel.
- `.env`: Armazena variáveis de ambiente.
- `.eslintrc.json`: Configurações do ESLint.
- `.gitignore`: Lista de arquivos e diretórios ignorados pelo Git.
- `index.js`: Script principal que executa a extração dos tickers.
- `package.json`: Metadados do projeto e dependências.
- `README.md`: Documentação do projeto.

## Dependências

Este projeto utiliza várias bibliotecas para facilitar a extração e manipulação de dados:

- `dotenv`: Carrega variáveis de ambiente a partir de um arquivo `.env`.
- `jsdom`: Permite interações com o DOM.
- `xlsx` e `excel4node`: Manipulação e salvamento de dados em formatos de planilhas Excel.
- `fs`: Trabalha com o sistema de arquivos.
- `path`: Trabalha com caminhos de arquivos.
- `fundamentus-unofficial-api`: API não oficial para acessar dados do Fundamentus.

## Configuração

1. Clone o repositório para sua máquina local.
2. Instale as dependências usando:
   ```
   npm install
   ```
3. Configure as variáveis de ambiente necessárias no arquivo `.env`.

## Uso

Para executar os scripts, navegue até o diretório do projeto e execute os comandos apropriados. Por exemplo, para `extraiTickers.js`:
```
node src/utils/extraiTickers.js
```

Os dados extraídos serão salvos na pasta especificada no arquivo de configuração `.env` e convertidos para o formato de planilha conforme especificado.

## Contribuições

Contribuições são bem-vindas. Por favor, abra um issue para discutir o que você gostaria de mudar ou enviar um pull request com suas sugestões.
