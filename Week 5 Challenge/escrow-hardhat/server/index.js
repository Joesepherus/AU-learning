const express = require("express");
const cors = require("cors");

const port = 4000;

const app = express();
app.use(express.json());
app.use(cors());
const contracts = [];

app.post("/contract", (req, res) => {
  const { contract } = req.body;
  console.log("contract: ", contract);
  if (contract) {
    contracts.push(JSON.parse(contract));
  }
  res.json(contract);
});

app.get("/contract", (req, res) => {
  console.log("contracts: ", contracts);

  res.json(contracts);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
