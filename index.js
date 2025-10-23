// Import packages
const express = require("express");
const path = require('path');
const fetch = require('node-fetch');
const errorsys = require("./routes/error-system");
const index = require("./routes/index");

const TOKEN = 'ocBP47vc5zLvNPHJahqK6Fbe';

// Middlewares
const app = express();
app.use(express.json());

// Routes

app.use("/", index);
app.use("/err", errorsys);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'notfound.json'));
});

app.get("/app/monitor/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const r = await fetch(`https://uptime.betterstack.com/api/v2/monitors/${id}`, {
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    const body = await r.text(); // jangan selalu .json() karena mungkin error
    res.status(r.status).type(r.headers.get("content-type") || "application/json").send(body);
  } catch (err) {
    res.status(500).send({ error: "proxy error", detail: err.message });
  }
});

app.get("/app/monitor/:id/response-times", async (req, res) => {
  const id = req.params.id;
  try {
    const r = await fetch(`https://uptime.betterstack.com/api/v2/monitors/${id}response-times`, {
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    const body = await r.text(); // jangan selalu .json() karena mungkin error
    res.status(r.status).type(r.headers.get("content-type") || "application/json").send(body);
  } catch (err) {
    res.status(500).send({ error: "proxy error", detail: err.message });
  }
});

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
