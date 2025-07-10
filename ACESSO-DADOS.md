# Acesso aos Dados do Formulário

## Dashboard Web

### Acesso:

```
http://localhost:3001/dashboard
```

### Funcionalidades:

- Visualização de pedidos pendentes e completos
- Estatísticas de vendas e receita
- Exportação CSV
- Atualização automática (30 segundos)

### Informações Exibidas:

- Nome e email do cliente
- Endereço completo (rua, complemento, cidade, CEP)
- Produto e variação
- Valor do pedido
- Método de pagamento
- Status do pagamento
- Data e hora do pedido

## API Endpoints

### Pedidos Completos:

```
GET http://localhost:3001/api/completed-orders
```

### Pedidos Pendentes:

```
GET http://localhost:3001/api/pending-orders
```

### Exportar CSV:

```
GET http://localhost:3001/api/export-csv
```

## Arquivo CSV

### Colunas:

- ID: Identificador único
- Cliente: Nome completo
- Email: Email do cliente
- Endereco: Endereço completo
- Complemento: Complemento do endereço
- Cidade: Cidade de entrega
- CEP: Código postal
- Produto: Nome do produto
- Variacao: Feminino ou Masculino
- Valor: Valor em R$
- Pagamento: PIX ou Cartão
- Status: Pendente ou Pago
- Data: Data do pedido

### Como Usar:

1. Acesse o dashboard
2. Clique em "Exportar CSV"
3. Arquivo será baixado automaticamente
4. Abra no Excel ou Google Sheets

## Configuração para Produção

### Banco de Dados:

- SQLite para projetos pequenos
- PostgreSQL para produção
- MySQL para compatibilidade

### Segurança:

- Adicionar autenticação no dashboard
- Usar HTTPS em produção
- Backup regular dos dados
- Monitoramento de logs

## Inicialização

### Servidor:

```bash
cd backend-pagamentos
node server.js
```

### Dashboard:

```
http://localhost:3001/dashboard
```

### Teste:

Faça um pedido em `http://localhost:5173` para ver os dados aparecerem.
