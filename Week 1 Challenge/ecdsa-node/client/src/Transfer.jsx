import { useState } from "react";
import server from "./server";
import { keccak256 } from "js-sha3";
import { Buffer } from "buffer";
import { ec as EC } from "elliptic";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const to = Buffer.from(recipient, "hex"); 
      const value = Buffer.from(sendAmount.toString(), "hex"); 

      const transactionDataHash = keccak256(Buffer.concat([to, value]));

      const ec = new EC("secp256k1");

      const signature = ec.sign(
        transactionDataHash.toString("hex"),
        privateKey,
        "hex",
        { canonical: true }
      );

      const {
        data: { balance, message },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature,
        hash: transactionDataHash,
      });
      setBalance(balance);
      alert(message);
    } catch (ex) {
      alert(ex.response.data.error.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Your PrivateKey
        <input
          placeholder="Type an address, for example: 0x2"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
