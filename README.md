# Sete Saias - E-commerce de Perfumes

Loja online para perfumes artesanais com sistema de pagamento integrado.

## Tecnologias

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Pagamentos**: Mercado Pago API
- **Styling**: Tailwind CSS
- **UI**: Shadcn/ui components

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
├── pages/              # Páginas da aplicação
├── lib/                # Utilitários
└── assets/             # Imagens e recursos

backend-pagamentos/
├── server.js           # Servidor de pagamentos
├── package.json        # Dependências do backend
└── node_modules/       # Módulos do Node.js
```

## Instalação

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend-pagamentos
npm install
node server.js
```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` no diretório backend:

```env
MERCADOPAGO_ACCESS_TOKEN=seu_token_aqui
PORT=3001
```

### Produto

- Nome: Perfume Sete Saias
- Preço: R$ 237,00
- Variações: Feminino, Masculino

## Funcionalidades

### Frontend

- Catálogo de produtos
- Formulário de checkout
- Seleção de variações
- Integração com pagamento

### Backend

- API de pagamentos
- Dashboard de pedidos
- Webhook para confirmações
- Exportação de dados (CSV)

## APIs

### Criar Pagamento

```
POST /api/create-payment
```

### Listar Pedidos

```
GET /api/pending-orders
GET /api/completed-orders
```

### Dashboard

```
GET /dashboard
```

### Exportar CSV

```
GET /api/export-csv
```

## Deploy

### Produção

- Frontend: Vercel, Netlify
- Backend: Railway, Heroku
- Banco: PostgreSQL, MongoDB

### Desenvolvimento

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`
- Dashboard: `http://localhost:3001/dashboard`

## Dados do Formulário

O sistema coleta:

- Nome e email do cliente
- Endereço completo (rua, complemento, cidade, CEP)
- Variação do produto
- Método de pagamento (PIX/Cartão)

## Segurança

- Validação de dados no backend
- Tokens de API protegidos
- HTTPS obrigatório em produção
- Webhook com validação

## Licença

Projeto proprietário - Sete Saias
