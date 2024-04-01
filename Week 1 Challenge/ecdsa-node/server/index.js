const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { randomBytes } = require("crypto");
const {
  privateToAddress,
  ecsign,
  toRpcSig,
  keccak256,
  ecrecover,
  fromRpcSig,
  privateToPublic,
} = require("ethereumjs-util");

app.use(cors());
app.use(express.json());

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAccounts() {
  const accounts = [];
  for (let i = 0; i < 5; i++) {
    const privateKey = randomBytes(32);
    const address = privateToAddress(privateKey);

    accounts.push({
      privateKey: privateKey,
      address: address.toString("hex"),
      balance: generateRandomNumber(50, 100),
    });
  }
  return accounts;
}

const accounts = generateAccounts();
console.log("accounts: ", accounts);

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const account = accounts.find((acc) => acc.address === address);
  console.log("account: ", account);

  const balance = account.balance || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  const senderAccount = accounts.find((acc) => acc.address === sender);
  const recipientAccount = accounts.find((acc) => acc.address === recipient);
  console.log("senderAccount: ", senderAccount);
  console.log("recipientAccount: ", recipientAccount);
  if (!senderAccount) {
    return res
      .status(400)
      .json({ error: { message: "Invalid sender address", code: "400" } });
  }

  if (!recipientAccount) {
    return res
      .status(400)
      .json({ error: { message: "Invalid recipient address", code: "400" } });
  }

  if (senderAccount.address === recipientAccount.address) {
    return res
      .status(400)
      .json({
        error: { message: "You cant send funds to yourself", code: "400" },
      });
  }

  const to = Buffer.from(recipient, "hex"); // Recipient's Ethereum address
  console.log("to: ", to);
  const value = Buffer.from(amount.toString(), "hex"); // Amount of ether to send (in wei)
  console.log("value: ", value);

  const transactionDataHash = keccak256(Buffer.concat([to, value]));

  const privateKey = senderAccount.privateKey;
  const publicKey = privateToPublic(privateKey);
  const { v, r, s } = ecsign(transactionDataHash, privateKey);

  const serializedSignature = toRpcSig(v, r, s);

  const {
    v: extractedV,
    r: extractedR,
    s: extractedS,
  } = fromRpcSig(serializedSignature);

  const isValidSignature = publicKey.equals(
    ecrecover(transactionDataHash, extractedV, extractedR, extractedS)
  );

  console.log("Is Signature Valid?", isValidSignature);
  if (isValidSignature) {
    senderAccount.balance -= amount;
    recipientAccount.balance += amount;
    res.send({ balance: senderAccount.balance });
  } else {
    res.status(400).json({ error: { message: "Bad Request", code: "400" } });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
