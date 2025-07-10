# Sistema de Frete para E-commerce

## Opções de Frete no Brasil

### 1. Correios (PAC/SEDEX)

- **Integração**: API oficial dos Correios
- **Cobertura**: Nacional
- **Custo**: Baixo a médio
- **Prazo**: 3-15 dias úteis
- **Rastreamento**: Código de rastreamento

### 2. Transportadoras Privadas

- **Jadlog**: Cobertura nacional, preços competitivos
- **Total Express**: Foco em e-commerce
- **Sequoia**: Entrega rápida grandes centros
- **Loggi**: Last mile, entregas no mesmo dia

### 3. Marketplace de Frete

- **Melhor Envio**: Múltiplas transportadoras
- **Kangu**: Comparação de preços
- **Frenet**: API unificada
- **Correios Fácil**: Integração simplificada

## Implementação Técnica

### 1. Cálculo de Frete no Frontend

```javascript
// Exemplo de integração com Melhor Envio
const calcularFrete = async (cep, produtos) => {
  const response = await fetch("/api/calcular-frete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cep_destino: cep,
      produtos: produtos,
    }),
  });

  const opcoes = await response.json();
  return opcoes;
};
```

### 2. Backend - Integração com APIs

```javascript
// Exemplo com Melhor Envio
app.post("/api/calcular-frete", async (req, res) => {
  const { cep_destino, produtos } = req.body;

  const cotacao = {
    from: {
      postal_code: "01310-100", // CEP origem
    },
    to: {
      postal_code: cep_destino,
    },
    products: produtos.map((p) => ({
      id: p.id,
      width: p.largura,
      height: p.altura,
      length: p.comprimento,
      weight: p.peso,
      insurance_value: p.valor,
      quantity: p.quantidade,
    })),
  };

  try {
    const response = await axios.post(
      "https://melhorenvio.com.br/api/v2/me/shipment/calculate",
      cotacao,
      {
        headers: {
          Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao calcular frete" });
  }
});
```

## Configuração no Formulário

### Adicionar Campo CEP no Checkout

```javascript
// Atualizar CheckoutForm.tsx
const [freteOptions, setFreteOptions] = useState([]);
const [selectedFrete, setSelectedFrete] = useState(null);

const calcularFrete = async (cep) => {
  if (cep.length === 8) {
    const opcoes = await fetch(`/api/calcular-frete/${cep}`);
    const frete = await opcoes.json();
    setFreteOptions(frete);
  }
};

// No JSX
<div>
  <Label>CEP para entrega</Label>
  <Input
    value={cep}
    onChange={(e) => {
      setCep(e.target.value);
      calcularFrete(e.target.value);
    }}
    placeholder="00000-000"
  />
</div>;

{
  freteOptions.length > 0 && (
    <div>
      <Label>Opções de frete</Label>
      {freteOptions.map((opcao) => (
        <div key={opcao.id} className="frete-option">
          <input
            type="radio"
            value={opcao.id}
            onChange={() => setSelectedFrete(opcao)}
          />
          <span>{opcao.name}</span>
          <span>R$ {opcao.price}</span>
          <span>{opcao.delivery_time} dias</span>
        </div>
      ))}
    </div>
  );
}
```

## Configuração de Produto

### Dimensões e Peso

```javascript
// Adicionar ao produto
const produto = {
  id: 1,
  nome: "Perfume Sete Saias",
  preco: 237.0,
  // Informações para frete
  peso: 0.5, // kg
  largura: 10, // cm
  altura: 15, // cm
  comprimento: 5, // cm
  categoria: "perfume",
};
```

## Integração com Dashboard

### Mostrar Dados de Frete

```javascript
// Atualizar o dashboard para mostrar frete
const orderDetails = `
  <div><strong>Frete:</strong> ${order.shipping?.method || "N/A"}</div>
  <div><strong>Valor Frete:</strong> R$ ${order.shipping?.cost || "0,00"}</div>
  <div><strong>Prazo:</strong> ${
    order.shipping?.delivery_time || "N/A"
  } dias</div>
  <div><strong>Código Rastreamento:</strong> ${
    order.shipping?.tracking_code || "N/A"
  }</div>
`;
```

## Recomendações

### Para Perfumes (Produtos Pequenos)

1. **Melhor Envio**: Boa integração, múltiplas opções
2. **Correios**: Cobertura nacional, preços baixos
3. **Jadlog**: Alternativa aos Correios

### Para Começar

1. Cadastre-se no Melhor Envio
2. Obtenha token de API
3. Configure dimensões dos produtos
4. Implemente cálculo no checkout
5. Adicione campos no formulário

### Fluxo Recomendado

1. Cliente digita CEP
2. Sistema calcula opções de frete
3. Cliente escolhe modalidade
4. Valor total = produto + frete
5. Após pagamento, gera etiqueta
6. Envia código de rastreamento

## Custos Típicos

### Perfume 500ml (0.5kg)

- **PAC**: R$ 15-25 (5-10 dias)
- **SEDEX**: R$ 25-35 (2-5 dias)
- **Jadlog**: R$ 20-30 (3-7 dias)

### Dicas de Economia

- Negocie contrato com transportadora
- Use embalagem menor possível
- Considere frete grátis acima de X valor
- Ofereça retirada local

## Exemplo de Implementação Completa

```javascript
// Adicionar ao servidor
app.post("/api/create-payment-with-shipping", async (req, res) => {
  const { customer, product, payment_method, shipping } = req.body;

  const valorTotal = product.unit_price + shipping.cost;

  const orderData = {
    customer,
    product,
    shipping: {
      method: shipping.method,
      cost: shipping.cost,
      delivery_time: shipping.delivery_time,
      tracking_code: null, // Será preenchido após envio
    },
    payment_method,
    total_amount: valorTotal,
  };

  // Salvar pedido com dados de frete
  pendingOrders.set(orderId, orderData);

  // Criar preferência com valor total
  const preferenceData = {
    items: [
      {
        title: product.title,
        unit_price: valorTotal,
        quantity: 1,
      },
    ],
    // ... resto da configuração
  };
});
```

## Próximos Passos

1. Escolher fornecedor de frete
2. Cadastrar conta e obter credenciais
3. Implementar cálculo no frontend
4. Atualizar backend para processar frete
5. Testar com diferentes CEPs
6. Configurar geração de etiquetas
