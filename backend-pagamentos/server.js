const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

const app = express();

const pendingOrders = new Map();
const completedOrders = new Map();

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

function saveConfirmedOrder(orderData) {
  const orderId = `COMPLETED-${Date.now()}`;
  completedOrders.set(orderId, {
    ...orderData,
    completed_at: new Date().toISOString(),
    status: "paid",
  });
}

app.post("/api/create-payment", async (req, res) => {
  try {
    const { customer, product, payment_method } = req.body;

    const orderId = `PERFUME-${Date.now()}`;

    pendingOrders.set(orderId, {
      customer,
      product,
      payment_method,
      created_at: new Date().toISOString(),
    });

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
      external_reference: orderId,
    };

    const result = await preference.create({ body: preferenceData });

    res.json({
      success: true,
      payment_url: result.init_point,
      preference_id: result.id,
      order_id: orderId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erro interno do servidor",
    });
  }
});

app.post("/api/webhook", (req, res) => {
  const { type, data } = req.body;

  if (type === "payment" && data && data.id) {
    const payment = new Payment(client);
    payment
      .get({ id: data.id })
      .then((paymentData) => {
        if (paymentData.status === "approved") {
          const externalReference = paymentData.external_reference;

          if (externalReference && pendingOrders.has(externalReference)) {
            const orderData = pendingOrders.get(externalReference);

            saveConfirmedOrder(orderData);

            pendingOrders.delete(externalReference);
          }
        }
      })
      .catch((error) => {
        console.error("Erro ao processar webhook:", error);
      });
  }

  res.status(200).send("OK");
});

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

app.get("/api/completed-orders", (req, res) => {
  const orders = Array.from(completedOrders.entries()).map(([id, data]) => ({
    id,
    ...data,
  }));

  res.json({
    count: orders.length,
    orders,
  });
});

app.get("/dashboard", (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Pedidos Sete Saias</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0e0e0e; 
            color: #f3e8d3; 
            padding: 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { 
            color: #e0a326; 
            margin-bottom: 30px; 
            text-align: center;
            font-size: 2.5rem;
        }
        .stats { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .stat-card { 
            background: #1a1a1a; 
            border: 1px solid #e0a326; 
            border-radius: 10px; 
            padding: 20px; 
            text-align: center; 
        }
        .stat-number { 
            font-size: 2rem; 
            color: #e0a326; 
            font-weight: bold; 
        }
        .stat-label { 
            color: #f3e8d3; 
            margin-top: 5px; 
        }
        .section { 
            background: #1a1a1a; 
            border: 1px solid #e0a326; 
            border-radius: 10px; 
            padding: 20px; 
            margin-bottom: 20px; 
        }
        .section h2 { 
            color: #e0a326; 
            margin-bottom: 15px; 
            border-bottom: 1px solid #e0a326; 
            padding-bottom: 10px; 
        }
        .order-card { 
            background: #2a2a2a; 
            border-radius: 8px; 
            padding: 15px; 
            margin-bottom: 15px; 
            border-left: 4px solid #e0a326; 
        }
        .order-header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 10px; 
        }
        .order-id { 
            font-weight: bold; 
            color: #e0a326; 
        }
        .order-status { 
            padding: 4px 12px; 
            border-radius: 20px; 
            font-size: 0.8rem; 
            font-weight: bold; 
        }
        .status-pending { 
            background: #b10000; 
            color: #f3e8d3; 
        }
        .status-paid { 
            background: #28a745; 
            color: white; 
        }
        .order-details { 
            display: grid; 
            grid-template-columns: 1fr 1fr 1fr; 
            gap: 10px; 
            font-size: 0.9rem; 
        }
        @media (max-width: 768px) {
            .order-details {
                grid-template-columns: 1fr;
                gap: 8px;
            }
        }
        .refresh-btn { 
            background: #b10000; 
            color: #f3e8d3; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 5px; 
            cursor: pointer; 
            font-size: 1rem; 
            margin-bottom: 20px; 
        }
        .refresh-btn:hover { 
            background: #900000; 
        }
        .export-btn { 
            background: #e0a326; 
            color: #0e0e0e; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 5px; 
            cursor: pointer; 
            font-size: 1rem; 
            margin-left: 10px; 
        }
        .export-btn:hover { 
            background: #c4891f; 
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Dashboard - Pedidos Sete Saias</h1>
        
        <div class="stats" id="stats">
            <div class="stat-card">
                <div class="stat-number" id="pending-count">0</div>
                <div class="stat-label">Pedidos Pendentes</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="completed-count">0</div>
                <div class="stat-label">Pedidos Completos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="total-revenue">R$ 0,00</div>
                <div class="stat-label">Receita Total</div>
            </div>
        </div>

        <button class="refresh-btn" onclick="loadData()">Atualizar Dados</button>
        <button class="export-btn" onclick="exportData()">Exportar CSV</button>

        <div class="section">
            <h2>Pedidos Completos</h2>
            <div id="completed-orders"></div>
        </div>

        <div class="section">
            <h2>Pedidos Pendentes</h2>
            <div id="pending-orders"></div>
        </div>
    </div>

    <script>
        async function loadData() {
            try {
                // Carregar pedidos pendentes
                const pendingResponse = await fetch('/api/pending-orders');
                const pendingData = await pendingResponse.json();
                
                // Carregar pedidos completos
                const completedResponse = await fetch('/api/completed-orders');
                const completedData = await completedResponse.json();

                // Atualizar estatísticas
                document.getElementById('pending-count').textContent = pendingData.count;
                document.getElementById('completed-count').textContent = completedData.count;
                
                const totalRevenue = completedData.orders.reduce((sum, order) => {
                    return sum + (order.product?.unit_price || 0);
                }, 0);
                document.getElementById('total-revenue').textContent = 
                    'R$ ' + totalRevenue.toFixed(2).replace('.', ',');

                // Renderizar pedidos completos
                const completedContainer = document.getElementById('completed-orders');
                completedContainer.innerHTML = completedData.orders.length ? 
                    completedData.orders.map(order => renderOrder(order, 'paid')).join('') :
                    '<p>Nenhum pedido completo encontrado.</p>';

                // Renderizar pedidos pendentes
                const pendingContainer = document.getElementById('pending-orders');
                pendingContainer.innerHTML = pendingData.orders.length ? 
                    pendingData.orders.map(order => renderOrder(order, 'pending')).join('') :
                    '<p>Nenhum pedido pendente encontrado.</p>';

            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        }

        function renderOrder(order, status) {
            const date = new Date(order.created_at || order.completed_at).toLocaleString('pt-BR');
            return \`
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id">\${order.id}</span>
                        <span class="order-status status-\${status}">
                            \${status === 'paid' ? 'Pago' : 'Pendente'}
                        </span>
                    </div>
                    <div class="order-details">
                        <div><strong>Cliente:</strong> \${order.customer?.name || 'N/A'}</div>
                        <div><strong>Email:</strong> \${order.customer?.email || 'N/A'}</div>
                        <div><strong>Endereço:</strong> \${order.customer?.address?.street || 'N/A'}</div>
                        <div><strong>Complemento:</strong> \${order.customer?.address?.complement || 'N/A'}</div>
                        <div><strong>Cidade:</strong> \${order.customer?.address?.city || 'N/A'}</div>
                        <div><strong>CEP:</strong> \${order.customer?.address?.zip_code || 'N/A'}</div>
                        <div><strong>Produto:</strong> \${order.product?.title || 'N/A'}</div>
                        <div><strong>Variação:</strong> \${order.product?.variation || 'N/A'}</div>
                        <div><strong>Valor:</strong> R$ \${(order.product?.unit_price || 0).toFixed(2).replace('.', ',')}</div>
                        <div><strong>Pagamento:</strong> \${order.payment_method === 'pix' ? 'PIX' : 'Cartão'}</div>
                        <div><strong>Data:</strong> \${date}</div>
                    </div>
                </div>
            \`;
        }

        function exportData() {
            fetch('/api/export-csv')
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'pedidos-sete-saias.csv';
                    a.click();
                });
        }

        // Carregar dados ao abrir a página
        loadData();
        
        // Atualizar automaticamente a cada 30 segundos
        setInterval(loadData, 30000);
    </script>
</body>
</html>
  `;

  res.send(html);
});

app.get("/api/export-csv", (req, res) => {
  const allOrders = [
    ...Array.from(pendingOrders.entries()).map(([id, data]) => ({
      id,
      ...data,
      status: "pending",
    })),
    ...Array.from(completedOrders.entries()).map(([id, data]) => ({
      id,
      ...data,
      status: "paid",
    })),
  ];

  const csvHeader =
    "ID,Cliente,Email,Endereco,Complemento,Cidade,CEP,Produto,Variacao,Valor,Pagamento,Status,Data\n";
  const csvData = allOrders
    .map((order) => {
      const date = new Date(
        order.created_at || order.completed_at
      ).toLocaleDateString("pt-BR");
      return [
        order.id,
        order.customer?.name || "",
        order.customer?.email || "",
        order.customer?.address?.street || "",
        order.customer?.address?.complement || "",
        order.customer?.address?.city || "",
        order.customer?.address?.zip_code || "",
        order.product?.title || "",
        order.product?.variation || "",
        (order.product?.unit_price || 0).toFixed(2).replace(".", ","),
        order.payment_method === "pix" ? "PIX" : "Cartão",
        order.status === "paid" ? "Pago" : "Pendente",
        date,
      ]
        .map((field) => `"${field}"`)
        .join(",");
    })
    .join("\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="pedidos-sete-saias.csv"'
  );
  res.send(csvHeader + csvData);
});

app.get("/", (req, res) => {
  res.json({
    message: "Servidor funcionando",
    timestamp: new Date().toISOString(),
    pending_orders: pendingOrders.size,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
