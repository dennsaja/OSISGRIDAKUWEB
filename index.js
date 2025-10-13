// Import packages
const express = require("express");
const path = require('path');
const errorsys = require("./routes/error-system");
const index = require("./routes/index");

// Middlewares
const app = express();
app.use(express.json());

// Routes

app.use("/", index);
app.use("/err", errorsys);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'notfound.json'));
});

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
