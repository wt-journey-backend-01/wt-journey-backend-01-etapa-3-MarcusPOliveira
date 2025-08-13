# Instruções de Configuração - API Departamento de Polícia

Este documento fornece instruções claras para configurar e executar a API de gerenciamento de agentes e casos policiais com PostgreSQL.

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Docker** e **Docker Compose**
- **Git**

## 🚀 Configuração Inicial

### 1. Clone e Instale Dependências

```bash
# Clone o repositório
git clone <seu-repositorio>
cd wt-journey-backend-01-etapa-3-marcuspoliveira

# Instale as dependências
npm install
```

### 2. Configuração do Ambiente

O arquivo `.env` já está configurado com as variáveis necessárias:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=policia_db
NODE_ENV=development
```

**⚠️ IMPORTANTE**: Use exatamente estes valores para compatibilidade com os testes.

## 🐘 Configuração do Banco de Dados PostgreSQL

### 1. Subir o Banco com Docker

```bash
# Iniciar o container PostgreSQL
docker-compose up -d

# Verificar se está rodando
docker ps
```

O PostgreSQL estará disponível em:
- **Host**: localhost
- **Porta**: 5432
- **Database**: policia_db
- **Usuário**: postgres
- **Senha**: postgres

### 2. Executar Migrations

```bash
# Criar as tabelas no banco de dados
npx knex migrate:latest
```

**Tabelas criadas:**
- `agentes`: id, nome, dataDeIncorporacao, cargo
- `casos`: id, titulo, descricao, status, agente_id (foreign key)

### 3. Rodar Seeds (Dados Iniciais)

```bash
# Popular o banco com dados de exemplo
npx knex seed:run
```

**Dados inseridos:**
- 2 agentes (Maria Santos - delegado, Pedro Oliveira - inspetor) via `agentes.js`
- 2 casos (Furto de veículo, Vandalismo em escola) via `casos.js`

## 🏃‍♂️ Executando a Aplicação

### Desenvolvimento (com auto-reload)
```bash
npm run dev
```

### Produção
```bash
npm start
```

A API estará disponível em: **http://localhost:3000**

## 📚 Documentação da API

Acesse a documentação Swagger em: **http://localhost:3000/api-docs**

### Endpoints Principais

**Agentes:**
- `GET /agentes` - Listar agentes
- `GET /agentes/:id` - Buscar agente por ID
- `POST /agentes` - Criar agente
- `PUT /agentes/:id` - Atualizar agente completo
- `PATCH /agentes/:id` - Atualizar agente parcial
- `DELETE /agentes/:id` - Remover agente
- `GET /agentes/:id/casos` - **[BONUS]** Listar casos de um agente específico

**Casos:**
- `GET /casos` - Listar casos
- `GET /casos/:id` - Buscar caso por ID
- `POST /casos` - Criar caso
- `PUT /casos/:id` - Atualizar caso completo
- `PATCH /casos/:id` - Atualizar caso parcial
- `DELETE /casos/:id` - Remover caso

## 🔧 Comandos Úteis

### Gerenciar Banco de Dados

```bash
# Verificar status das migrations
npx knex migrate:status

# Reverter última migration
npx knex migrate:rollback

# Recriar seeds
npx knex seed:run

# [BONUS] Reset completo do banco (rollback + migrate + seed)
npm run db:reset

# Parar container do banco
docker-compose down

# Parar e remover volumes (apaga dados)
docker-compose down -v
```

### Conectar diretamente ao PostgreSQL

```bash
# Via Docker
docker exec -it policia_db_container psql -U postgres -d policia_db

# Comandos úteis no psql:
# \dt - listar tabelas
# \d agentes - mostrar estrutura da tabela agentes
# SELECT * FROM agentes; - mostrar todos os agentes
# \q - sair
```

## 🧪 Testando a API

### Exemplo: Criar um agente
```bash
curl -X POST http://localhost:3000/agentes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "dataDeIncorporacao": "2020-03-15",
    "cargo": "delegado"
  }'
```

### Exemplo: Criar um caso
```bash
curl -X POST http://localhost:3000/casos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Roubo de banco",
    "descricao": "Assalto ao banco central",
    "status": "aberto",
    "agente_id": 1
  }'
```

### Exemplo: Listar casos de um agente (BONUS)
```bash
# Listar todos os casos do agente ID 1
curl http://localhost:3000/agentes/1/casos
```

## ❗ Solução de Problemas

### Erro de conexão com o banco
1. Verifique se o Docker está rodando: `docker ps`
2. Verifique se o container está healthy: `docker-compose ps`
3. Reinicie o container: `docker-compose restart`

### Tabelas não encontradas
1. Execute as migrations: `npx knex migrate:latest`
2. Verifique se as migrations foram aplicadas: `npx knex migrate:status`

### Dados não aparecem
1. Execute os seeds: `npx knex seed:run`
2. Verifique no banco: `docker exec policia_db_container psql -U postgres -d policia_db -c "SELECT * FROM agentes;"`

### Porta 3000 em uso
1. Mate processos na porta: `lsof -ti:3000 | xargs kill -9`
2. Ou mude a porta no `server.js`

## 📝 Notas Importantes

- **IDs são auto-incrementais**: Não envie ID no corpo das requisições POST
- **Foreign Keys**: Casos devem referenciar agentes existentes
- **Formato de data**: Use YYYY-MM-DD para dataDeIncorporacao
- **Status válidos**: "aberto" ou "solucionado"
- **Cargos válidos**: "delegado" ou "inspetor"