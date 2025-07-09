// Servidor de pagamentos com Mercado Pago
const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();

// Armazenamento temporário dos pedidos (em produção, usar banco de dados)
const pendingOrders = new Map();

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-4374509141180080-070918-bee7ca8241a0bf5388cac5a37f0ccebe-1464890816",
  options: {
    timeout: 5000,
    idempotencyKey: "abc123",
  },
});

app.use(cors());
app.use(express.json());

// Função para salvar pedido confirmado (implementar conforme sua necessidade)
function saveConfirmedOrder(orderData) {
  console.log("💾 SALVANDO PEDIDO CONFIRMADO:");
  console.log("Cliente:", orderData.customer);
  console.log("Produto:", orderData.product);
  console.log("Forma de pagamento:", orderData.payment_method);
  console.log("Data:", new Date().toISOString());

  // Aqui você pode:
  // - Salvar no banco de dados
  // - Enviar email de confirmação
  // - Atualizar estoque
  // - Etc.
}

// Endpoint para criar pagamento
app.post("/api/create-payment", async (req, res) => {
  try {
    const { customer, product, payment_method } = req.body;

    console.log("Dados recebidos:", req.body);

    // Gerar ID único para o pedido
    const orderId = `PERFUME-${Date.now()}`;

    // Salvar dados temporariamente (só será processado se pagamento for confirmado)
    pendingOrders.set(orderId, {
      customer,
      product,
      payment_method,
      created_at: new Date().toISOString(),
    });

    console.log(`📝 Pedido temporário salvo: ${orderId}`);

    // Configuração da preferência de pagamento
    const preference = new Preference(client);

    const preferenceData = {
      items: [
        {
          title: product.title,
          unit_price: product.unit_price,
          quantity: product.quantity,
        },
      ],
      payer: {
        name: customer.name,
        email: customer.email,
        address: {
          street_name: customer.address.street,
          city_name: customer.address.city,
          zip_code: customer.address.zip_code,
        },
      },
      payment_methods: {
        excluded_payment_methods:
          payment_method === "pix"
            ? [{ id: "credit_card" }, { id: "debit_card" }, { id: "ticket" }]
            : [{ id: "pix" }, { id: "ticket" }],
        excluded_payment_types:
          payment_method === "pix"
            ? [{ id: "credit_card" }, { id: "debit_card" }, { id: "ticket" }]
            : [{ id: "bank_transfer" }],
        installments: payment_method === "cartao" ? 12 : 1,
        default_payment_method_id: payment_method === "pix" ? "pix" : null,
      },
      back_urls: {
        success: "https://www.mercadopago.com.br/checkout/v1/redirect",
        failure: "https://www.mercadopago.com.br/checkout/v1/redirect",
        pending: "https://www.mercadopago.com.br/checkout/v1/redirect",
      },
      // auto_return: 'approved', // Removido para evitar erro
      external_reference: orderId,
    };

    // Criar preferência
    const result = await preference.create({ body: preferenceData });

    console.log("Preferência criada:", result.id);

    res.json({
      success: true,
      payment_url: result.init_point,
      preference_id: result.id,
      order_id: orderId,
    });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor",
    });
  }
});

// Webhook para receber notificações do Mercado Pago
app.post("/api/webhook", (req, res) => {
  const { type, data } = req.body;

  console.log("🔔 Webhook recebido:", { type, data });

  if (type === "payment") {
    console.log("💰 Pagamento confirmado:", data.id);

    // Aqui você buscaria os detalhes do pagamento para pegar o external_reference
    // Por simplicidade, vou simular que temos o external_reference
    const orderId = `PERFUME-${data.id}`; // Isso viria do pagamento real

    // Buscar dados do pedido temporário
    const orderData = pendingOrders.get(orderId);

    if (orderData) {
      console.log("✅ Processando pedido confirmado:", orderId);

      // Salvar pedido confirmado
      saveConfirmedOrder(orderData);

      // Remover dos pedidos temporários
      pendingOrders.delete(orderId);

      console.log("🎉 Pedido processado com sucesso!");
    } else {
      console.log("⚠️ Pedido não encontrado:", orderId);
    }
  }

  res.status(200).send("OK");
});

// Endpoint para listar pedidos pendentes (para debug)
app.get("/api/pending-orders", (req, res) => {
  const orders = Array.from(pendingOrders.entries()).map(([id, data]) => ({
    id,
    ...data,
  }));

  res.json({
    count: orders.length,
    orders,
  });
});

// Rota de teste
app.get("/", (req, res) => {
  res.json({
    message: "Servidor de pagamentos funcionando!",
    timestamp: new Date().toISOString(),
    pending_orders: pendingOrders.size,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(
    `📝 API disponível em: http://localhost:${PORT}/api/create-payment`
  );
  console.log(`🔗 Teste em: http://localhost:${PORT}`);
  console.log(
    `📋 Pedidos pendentes: http://localhost:${PORT}/api/pending-orders`
  );
});
