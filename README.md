> Ignite

# Node.js Rest API com princípios SOLID

## Projeto

> Gympass style app

Este é um projeto de uma Rest API desenvolvido durante o Ignite da Rocketseat, que tem como objetivo aplicar os princípios SOLID.

## Tecnologias

- Bun
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- Docker
- JWT
- Biome
- Zod
- Tsup

## Rodando o projeto

### Pré-requisitos

- Node.js
- Bun
- Docker
- Docker Compose
- PostgreSQL
- Prisma
- JWT

### Instalação

Clone o repositório e instale as dependências.

```bash
git clone https://github.com/adeonirlabs/rocketseat-api-with-solid.git
cd rocketseat-api-with-solid
bun install
```

Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente.

```bash
cp .env.example .env
```

Suba o container do banco de dados

```bash
docker compose up -d
```

Rode as migrations

```bash
bun migrate
```

Suba o servidor de desenvolvimento

```bash
bun dev
```
