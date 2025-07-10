# 🎯 Exemplo Prático - Dashboard Sete Saias

## 🚀 Teste Rápido

### 1. Inicie o Servidor

```bash
cd backend-pagamentos
node server.js
```

### 2. Acesse o Dashboard

Abra no navegador:

```
http://localhost:3001/dashboard
```

### 3. Faça um Pedido Teste

- Vá para o site: `http://localhost:5173`
- Preencha o formulário
- Faça um pedido PIX ou Cartão

### 4. Visualize os Dados

- O pedido aparecerá na seção "Pedidos Pendentes"
- Após pagamento confirmado, vai para "Pedidos Completos"

---

## 📊 O que Você Verá

### Estatísticas no Topo:

```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Pedidos         │ │ Pedidos         │ │ Receita         │
│ Pendentes       │ │ Completos       │ │ Total           │
│      0          │ │      0          │ │   R$ 0,00       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### Exemplo de Pedido Completo:

```
┌─────────────────────────────────────────────────────────────┐
│ COMPLETED-1738123456789                              [PAGO] │
├─────────────────────────────────────────────────────────────┤
│ Cliente: Maria Silva          │ Email: maria@email.com      │
│ Endereço: Rua das Flores, 123 │ Complemento: Apto 45      │
│ Cidade: São Paulo             │ CEP: 01234-567             │
│ Produto: Sete Saias          │ Variação: Feminino          │
│ Valor: R$ 237,00             │ Pagamento: PIX              │
│ Data: 29/01/2025 14:30:25    │                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Testando APIs Diretamente

### No Navegador:

```
http://localhost:3001/api/pending-orders
http://localhost:3001/api/completed-orders
http://localhost:3001/api/export-csv
```

### Exemplo de Resposta JSON:

```json
{
  "count": 1,
  "orders": [
    {
      "id": "COMPLETED-1738123456789",
      "customer": {
        "name": "Maria Silva",
        "email": "maria@email.com",
        "address": {
          "street": "Rua das Flores, 123",
          "complement": "Apto 45",
          "city": "São Paulo",
          "zip_code": "01234-567"
        }
      },
      "product": {
        "title": "Sete Saias",
        "variation": "Feminino",
        "unit_price": 237.0
      },
      "payment_method": "pix",
      "status": "paid",
      "completed_at": "2025-01-29T17:30:25.123Z"
    }
  ]
}
```

---

## 📁 Exemplo de CSV Exportado

```csv
ID,Cliente,Email,Endereco,Complemento,Cidade,CEP,Produto,Variacao,Valor,Pagamento,Status,Data
"COMPLETED-1738123456789","Maria Silva","maria@email.com","Rua das Flores, 123","Apto 45","São Paulo","01234-567","Sete Saias","Feminino","237,00","PIX","Pago","29/01/2025"
"PENDING-1738123456790","João Santos","joao@email.com","Av. Brasil, 456","Casa 2","Rio de Janeiro","20000-000","Sete Saias","Masculino","237,00","Cartão","Pendente","29/01/2025"
```

---

## 🔄 Fluxo Completo

### 1. Cliente Preenche Formulário

- Nome: Maria Silva
- Email: maria@email.com
- Endereço: Rua das Flores, 123
- Complemento: Apto 45
- Cidade: São Paulo
- CEP: 01234-567
- Variação: Feminino
- Pagamento: PIX

### 2. Pedido Criado

- Aparece no dashboard como "Pendente"
- ID: `PERFUME-1738123456789`

### 3. Pagamento Processado

- Mercado Pago redireciona para PIX
- Cliente paga via PIX

### 4. Webhook Confirmação

- Mercado Pago notifica o servidor
- Pedido move para "Completos"
- ID muda para: `COMPLETED-1738123456789`

### 5. Dados Disponíveis

- Dashboard atualiza automaticamente
- CSV pode ser exportado
- APIs retornam dados atualizados

---

## 🛠 Logs do Servidor

### Quando Cliente Faz Pedido:

```
Novo pedido criado: PERFUME-1738123456789
Dados do cliente: {
  name: 'Maria Silva',
  email: 'maria@email.com',
  address: {
    street: 'Rua das Flores, 123',
    complement: 'Apto 45',
    city: 'São Paulo',
    zip_code: '01234-567'
  }
}
Produto: Sete Saias (Feminino) - R$ 237,00
Redirecionando para pagamento...
```

### Quando Pagamento é Confirmado:

```
Webhook recebido: { type: 'payment', data: { id: '123456789' } }
Dados do pagamento: { status: 'approved', external_reference: 'PERFUME-1738123456789' }
SALVANDO PEDIDO CONFIRMADO:
Cliente: {
  name: 'Maria Silva',
  email: 'maria@email.com',
  address: {
    street: 'Rua das Flores, 123',
    complement: 'Apto 45',
    city: 'São Paulo',
    zip_code: '01234-567'
  }
}
Produto: Sete Saias (Feminino) - R$ 237,00
Pedido PERFUME-1738123456789 confirmado e salvo!
```

---

## 🎨 Visual do Dashboard

### Cores da Marca:

- **Fundo**: Preto (#0e0e0e)
- **Texto**: Creme (#f3e8d3)
- **Destaque**: Dourado (#e0a326)
- **Botões**: Vermelho (#b10000)

### Responsivo:

- Desktop: 3 colunas de estatísticas
- Mobile: 1 coluna, layout adaptado
- Tablets: 2 colunas

---

## 📞 Próximos Passos

### Se Quiser Melhorar:

1. **Adicionar busca** por nome/email
2. **Filtros** por data, status, pagamento
3. **Gráficos** de vendas por período
4. **Notificações** de novos pedidos
5. **Banco de dados** para persistência

### Pronto para Usar:

- Dashboard funciona imediatamente
- Dados são salvos automaticamente
- Export CSV disponível
- APIs prontas para integração
