// Exemplo de API em Node.js para integração com Mercado Pago
// Instalar dependências: npm install express cors mercadopago

const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: "APP_USR-1485c51e-7246-4649-9510-ba7fe4381ac5", 
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
        success: "https://seusite.com/sucesso",
        failure: "https://seusite.com/falha",
        pending: "https://seusite.com/pendente",
      },
      auto_return: "approved",
      external_reference: `PERFUME-${Date.now()}`, // ID único do pedido
    };

    // Criar preferência
    const result = await preference.create({ body: preferenceData });

    res.json({
      success: true,
      payment_url: result.init_point, // URL para redirecionar o usuário
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

  if (type === "payment") {
    // Aqui você processaria a confirmação do pagamento
    console.log("Pagamento confirmado:", data.id);

    // Enviar email de confirmação
    // Atualizar banco de dados
    // Etc.
  }

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
