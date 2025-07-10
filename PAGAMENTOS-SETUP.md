# Sistema de Pagamentos

## Implementação Realizada

- Frontend com integração para APIs de pagamento
- Formulário com validação e estados de loading
- Backend para Mercado Pago
- Tratamento de erros e redirecionamento

## Configuração do Backend

### Mercado Pago

1. Criar conta em https://mercadopago.com.br
2. Obter credenciais no painel do desenvolvedor
3. Instalar dependências:
   ```bash
   npm install express cors mercadopago
   ```
4. Configurar token de acesso no servidor

### Estrutura de Dados

```json
{
  "customer": {
    "name": "Nome do Cliente",
    "email": "email@exemplo.com",
    "address": {
      "street": "Rua Example, 123",
      "city": "São Paulo",
      "zip_code": "01234-567"
    }
  },
  "product": {
    "title": "Perfume Sete Saias",
    "unit_price": 237.0,
    "quantity": 1
  },
  "payment_method": "pix"
}
```

## Fluxo de Pagamento

1. Cliente preenche formulário
2. Frontend envia dados para API
3. Backend cria preferência de pagamento
4. Cliente é redirecionado para pagamento
5. Webhook confirma pagamento

## Variáveis de Ambiente

```env
MERCADOPAGO_ACCESS_TOKEN=SEU_TOKEN_AQUI
FRONTEND_URL=https://seusite.com
```

## Deploy

- Frontend: Vercel/Netlify
- Backend: Railway/Heroku
- Banco: MongoDB/PostgreSQL
- HTTPS obrigatório

## Testes

- Usar credenciais de teste do Mercado Pago
- Cartões de teste disponíveis na documentação

## Configuração

1. Obter credenciais do Mercado Pago
2. Configurar servidor backend
3. Testar com credenciais sandbox
4. Deploy em produção
5. Configurar webhooks
