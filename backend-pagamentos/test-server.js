// Teste simples do servidor
const http = require("http");

console.log("Testando servidor na porta 3001...");

// Teste da rota principal
http
  .get("http://localhost:3001/", (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      console.log("✅ Rota principal funcionando:", data);

      // Teste do dashboard
      http
        .get("http://localhost:3001/dashboard", (res) => {
          console.log("✅ Dashboard respondendo:", res.statusCode);

          // Teste das APIs
          http
            .get("http://localhost:3001/api/pending-orders", (res) => {
              let apiData = "";
              res.on("data", (chunk) => (apiData += chunk));
              res.on("end", () => {
                console.log("✅ API pending-orders:", apiData);
                process.exit(0);
              });
            })
            .on("error", (err) => {
              console.log("❌ Erro na API pending-orders:", err.message);
              process.exit(1);
            });
        })
        .on("error", (err) => {
          console.log("❌ Erro no dashboard:", err.message);
          process.exit(1);
        });
    });
  })
  .on("error", (err) => {
    console.log("❌ Servidor não está rodando:", err.message);
    console.log("Execute: node server.js");
    process.exit(1);
  });
