// Servidor de pagamentos com Mercado Pago
const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();

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

// Endpoint para criar pagamento
app.post("/api/create-payment", async (req, res) => {
  try {
    const { customer, product, payment_method } = req.body;

    console.log("Dados recebidos:", req.body);

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
            ? [{ id: "credit_card" }, { id: "debit_card" }]
            : [{ id: "pix" }],
        installments: payment_method === "cartao" ? 12 : 1,
      },
      back_urls: {
        success: "http://localhost:5173/sucesso",
        failure: "http://localhost:5173/falha",
        pending: "http://localhost:5173/pendente",
      },
      auto_return: "approved",
      external_reference: `PERFUME-${Date.now()}`,
    };

    // Criar preferência
    const result = await preference.create({ body: preferenceData });

    console.log("Preferência criada:", result.id);

    res.json({
      success: true,
      payment_url: result.init_point,
      preference_id: result.id,
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

  console.log("Webhook recebido:", { type, data });

  if (type === "payment") {
    console.log("Pagamento confirmado:", data.id);

    // Aqui você processaria a confirmação do pagamento
    // Enviar email de confirmação
    // Atualizar banco de dados
    // Etc.
  }

  res.status(200).send("OK");
});

// Rota de teste
app.get("/", (req, res) => {
  res.json({
    message: "Servidor de pagamentos funcionando!",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(
    `📝 API disponível em: http://localhost:${PORT}/api/create-payment`
  );
  console.log(`🔗 Teste em: http://localhost:${PORT}`);
});
