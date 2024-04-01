const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const { accounts } = require("./accounts");
console.log("accounts: ", accounts);

app.use(cors());
app.use(express.json());

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const account = accounts.find((acc) => acc.address === address);

  const balance = account.balance || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, hash, signature } = req.body;

  const senderAccount = accounts.find((acc) => acc.address === sender);
  const recipientAccount = accounts.find((acc) => acc.address === recipient);

  // check if sender exists
  if (!senderAccount) {
    return res
      .status(400)
      .json({ error: { message: "Invalid sender address", code: "400" } });
  }

  // check if recipient exists
  if (!recipientAccount) {
    return res
      .status(400)
      .json({ error: { message: "Invalid recipient address", code: "400" } });
  }

  // check if sender and recipient is not the same
  if (senderAccount.address === recipientAccount.address) {
    return res.status(400).json({
      error: { message: "You cant send funds to yourself", code: "400" },
    });
  }

  let hexToDecimal = (x) =>
    ec.keyFromPrivate(x, "hex").getPrivate().toString(10);

  let pubKeyRecovered = ec.recoverPubKey(
    hexToDecimal(hash),
    signature,
    signature.recoveryParam,
    "hex"
  );
  const publicKeyHex = pubKeyRecovered.encodeCompressed("hex");

  if (publicKeyHex === senderAccount.publicKey) {
    senderAccount.balance -= amount;
    recipientAccount.balance += amount;
    console.log(
      `Successfully sent ${amount} from ${senderAccount.address} to ${recipientAccount.address}`
    );
    res.send({
      balance: senderAccount.balance,
      message: `Successfully sent ${amount} from ${senderAccount.address} to ${recipientAccount.address}`,
    });
  } else {
    res.status(400).json({ error: { message: "Bad Request", code: "400" } });
  }
});

app.listen(port, () => {});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
