// Import packages
const express = require("express");
const path = require("path");

// Import routes
const errorsys = require("./routes/error-system");
const index = require("./routes/index");

// Environment variable (lebih aman)
const TOKEN = process.env.BETTERSTACK_TOKEN || "ocBP47vc5zLvNPHJahqK6Fbe";

// Initialize app
const app = express();
const PORT = process.env.PORT || 9001;

// Middlewares
app.use(express.json());

// Routes
app.use("/", index);
app.use("/err", errorsys);

// --- Helper function untuk request ke BetterStack API ---
async function fetchBetterStack(endpoint) {
  const url = `https://uptime.betterstack.com/api/v2/${endpoint}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const contentType = res.headers.get("content-type") || "application/json";
  const body = await res.text(); // biar tetap aman untuk error response
  return { status: res.status, contentType, body };
}

// --- API Proxy Routes ---
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

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notfound.json"));
});

// --- Start server ---
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
