# 📊 Acesso aos Dados do Formulário - Sete Saias

## 🚀 Dashboard Web (RECOMENDADO)

### 1. Acesse o Dashboard

```
http://localhost:3001/dashboard
```

### 2. Funcionalidades do Dashboard:

- **Visualização em tempo real** dos pedidos pendentes e completos
- **Estatísticas** de vendas e receita total
- **Exportação CSV** para análises externas
- **Atualização automática** a cada 30 segundos
- **Design responsivo** com cores da marca

### 3. Informações Exibidas:

- Nome e email do cliente
- Endereço (cidade)
- Produto e variação (Feminino/Masculino)
- Valor do pedido
- Método de pagamento (PIX/Cartão)
- Status do pagamento
- Data e hora do pedido

---

## 🔧 API Endpoints

### Pedidos Completos (Pagos):

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

---

## 📁 Arquivo CSV

### Colunas do Export:

- **ID**: Identificador único do pedido
- **Cliente**: Nome completo
- **Email**: Email do cliente
- **Cidade**: Cidade de entrega
- **Produto**: Nome do produto
- **Variacao**: Feminino ou Masculino
- **Valor**: Valor em R$
- **Pagamento**: PIX ou Cartão
- **Status**: Pendente ou Pago
- **Data**: Data do pedido

### Como Usar:

1. Acesse o dashboard
2. Clique em "Exportar CSV"
3. O arquivo será baixado automaticamente
4. Abra no Excel ou Google Sheets

---

## 🛠 Próximos Passos (Opcional)

### Para Projetos Maiores:

1. **Banco de Dados**:

   - SQLite para simplicidade
   - PostgreSQL para produção
   - MySQL para compatibilidade

2. **Autenticação**:

   - Login para acessar dashboard
   - Diferentes níveis de permissão

3. **Notificações**:

   - Email automático para novos pedidos
   - WhatsApp Business API
   - Telegram Bot

4. **Análises Avançadas**:
   - Gráficos de vendas
   - Relatórios mensais
   - Análise de conversão

---

## 🔐 Segurança

### Importante:

- Dashboard não tem autenticação (adicionar se necessário)
- Dados ficam em memória (reiniciar servidor = perder dados)
- Para produção, use banco de dados real
- Webhook do Mercado Pago já tem validação

### Recomendações:

1. Adicione autenticação básica
2. Use HTTPS em produção
3. Faça backup dos dados regularmente
4. Monitore logs do servidor

---

## 🚀 Como Iniciar

1. **Inicie o servidor**:

   ```bash
   cd backend-pagamentos
   node server.js
   ```

2. **Acesse o dashboard**:

   ```
   http://localhost:3001/dashboard
   ```

3. **Faça um pedido teste** para ver os dados aparecerem

---

## 📞 Suporte

Se precisar de mais funcionalidades ou tiver problemas:

- Verifique se o servidor está rodando
- Confira os logs no terminal
- Teste os endpoints diretamente no navegador
