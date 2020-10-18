const express = require('express');
const app = express();
if (process.env.NODE_ENV === "dev") {
  require('dotenv').config()
}

app.get('/', (req, res) => {
  res.json({ api: "e-billing API" });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`e-Billing is running on http://localhost:${port}`);
});
