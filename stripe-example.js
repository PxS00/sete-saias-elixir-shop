// Exemplo de API em Node.js para integração com Stripe
// Instalar dependências: npm install express cors stripe

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("SEU_SECRET_KEY_STRIPE_AQUI");

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint para criar sessão de checkout
app.post("/api/create-payment", async (req, res) => {
  try {
    const { customer, product, payment_method } = req.body;

    // Configurar métodos de pagamento baseado na escolha
    const payment_method_types =
      payment_method === "pix" ? ["customer_balance"] : ["card"];

    const session = await stripe.checkout.sessions.create({
      payment_method_types,
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: product.title,
            },
            unit_amount: Math.round(product.unit_price * 100), // Stripe usa centavos
          },
          quantity: product.quantity,
        },
      ],
      mode: "payment",
      customer_email: customer.email,
      success_url:
        "https://seusite.com/sucesso?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://seusite.com/cancelado",
      metadata: {
        customer_name: customer.name,
        customer_address: customer.address.street,
        customer_city: customer.address.city,
        customer_zip: customer.address.zip_code,
      },
    });

    res.json({
      success: true,
      payment_url: session.url,
      session_id: session.id,
    });
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor",
    });
  }
});

// Webhook para receber eventos do Stripe
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        "SEU_WEBHOOK_SECRET_AQUI"
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("Pagamento confirmado:", session.id);

        // Processar pedido
        // Enviar email de confirmação
        // Atualizar banco de dados
        break;
      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    res.json({ received: true });
  }
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
