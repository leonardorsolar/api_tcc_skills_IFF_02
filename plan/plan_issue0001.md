# Plan: API Node.js Express com rota GET Hello World

## Objetivo

Criar uma API REST básica usando Node.js e Express.js com uma rota GET que retorna "Hello World". O projeto atual contém apenas um arquivo `index.js` com código de console.log que será substituído pela implementação do servidor Express.

## Passos de Implementação

### 1. Inicializar o projeto Node.js
- Criar o arquivo `package.json` com as configurações básicas do projeto
- Definir nome, versão, descrição e ponto de entrada (index.js)

### 2. Instalar dependências
- **Dependências de produção**:
  - `express`: Framework web para Node.js
- **Dependências de desenvolvimento**:
  - `nodemon`: Para reiniciar automaticamente o servidor durante o desenvolvimento

### 3. Implementar servidor Express
- Substituir o conteúdo atual de `index.js`
- Configurar o servidor Express
- Criar rota GET `/` que retorna "Hello World"
- Configurar a porta do servidor (padrão 3000 ou via variável de ambiente)

### 4. Adicionar scripts de execução
- Script `start`: Para produção usando `node index.js`
- Script `dev`: Para desenvolvimento usando `nodemon index.js`

### 5. Testar a API
- Iniciar o servidor
- Acessar `http://localhost:3000` no navegador ou via ferramenta como curl/Postman
- Verificar a resposta "Hello World"

## Considerações Técnicas

### Porta do servidor
- Usar porta 3000 como padrão
- Permitir configuração via variável de ambiente `PORT` para flexibilidade em diferentes ambientes

### Estrutura de resposta
- **Opção 1**: Retornar texto simples `"Hello World"`
- **Opção 2**: Retornar JSON `{ "message": "Hello World" }`
- **Recomendação**: Usar JSON para manter consistência com APIs REST

### Arquivos adicionais
- Criar `.gitignore` para ignorar:
  - `node_modules/`
  - Arquivos de log
  - Variáveis de ambiente (`.env`)

## Estrutura Final do Projeto

```
api_tcc_skills_IFF_02/
├── .git/
├── .github/
├── .gitignore (novo)
├── index.js (modificado)
├── package.json (novo)
├── package-lock.json (gerado automaticamente)
├── node_modules/ (gerado automaticamente)
├── plan/
│   └── plan_issue0001.md
├── README.md
└── sonar-project.properties
```

## Resultado Esperado

Ao executar `npm run dev` e acessar `http://localhost:3000`, o usuário deverá receber a resposta:

```json
{
  "message": "Hello World"
}
```

Status HTTP: `200 OK`
