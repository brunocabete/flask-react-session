# flask-react-session

## Sobre a aplicação:

Meu primeiro contato com Flask (e primeira vez que usei python de fato depois de alguns anos), e primeira aplicação em React fora dos tutoriais

## Como liga??

### Back-end

Instalar dependencias (em requirements.txt dentro da pasta /api) e rodar python app.py

#### Database

É necessário um banco de dados MySQL rodando.
As configurações devem ser inseridas em um arquivo .env (exemplo a seguir)

### Exemplo de arquivo .env
```
SECRET_KEY=Sua_chave
DB_NAME=Nome_do_banco_de_dados
DB_PASS=Senha_do_banco_de_dados
DB_TABLE=Tabela_do_banco_de_dados
```
As informações serão chamadas no arquivo `/api/config.py`

### Front-end

npm i, e depois npm run build (acessar pela porta do flask) ou npm start (pela porta do react)
(por enquanto rodar com npm start é um pouco mais estável)

## Ajustes a fazer:

- Separar Tabelas de endereço e usuário e joinar elas pelas queries
- Refresh não funciona se o front é servido pelo Flask (ao invés do proprio react)
- Deixar o site menos feio
- Repassar códigos de erro do back, e interpretar no front de maneira adequada
- Validação dos campos de entrada

## Outros pontos:

- A implementação de Session está segura?
- Como o estado de autenticação é comumente implementado no front end?
