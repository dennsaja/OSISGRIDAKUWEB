// Import packages
const express = require("express");
const path = require("path");
const cors = require("cors");

// Import routes
const errorsys = require("./routes/error-system");
const index = require("./routes/index");

// Environment variable
const TOKEN = process.env.BETTERSTACK_TOKEN || "ocBP47vc5zLvNPHJahqK6Fbe";

// Initialize app
const app = express();
const PORT = process.env.PORT || 9001;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ["https://framer.com", /\.framer\.website$/],
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
//app.use("/", index);
app.get('*', (req, res) => {
  res.redirect(301, '/gridaku')
})

app.get('/gridaku', (req, res) => {
  res.sendFile(path.join(__dirname, "views", "gkgkgk.html"));
})
app.use("/err", errorsys);

// --- BetterStack Helper ---
async function fetchBetterStack(endpoint) {
  const url = `https://uptime.betterstack.com/api/v2/${endpoint}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const contentType = res.headers.get("content-type") || "application/json";
  const body = await res.text();
  return { status: res.status, contentType, body };
}

async function fetchTimeAPI(zone = "Asia/Jakarta") {
  const url = `https://timeapi.io/api/Time/current/zone?timeZone=${zone}`;
  const res = await fetch(url);
  const contentType = res.headers.get("content-type") || "application/json";
  const body = await res.text();
  return { status: res.status, contentType, body };
}

// --- BetterStack Routes ---
app.get("/app/monitor/:id", async (req, res) => {
  try {
    const { status, contentType, body } = await fetchBetterStack(`monitors/${req.params.id}`);
    res.status(status).type(contentType).send(body);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", detail: err.message });
  }
});

app.get("/app/monitor/:id/response-times", async (req, res) => {
  try {
    const { status, contentType, body } = await fetchBetterStack(`monitors/${req.params.id}/response-times`);
    res.status(status).type(contentType).send(body);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", detail: err.message });
  }
});

app.get("/app/monitor/asiajakarta", async (req, res) => {
  try {
    const { status, contentType, body } = await fetchTimeAPI("Asia/Jakarta");
    res.status(status).type(contentType).send(body);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", detail: err.message });
  }
});

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notfound.json"));
});

// --- Start server ---
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
