import { ethers } from "ethers";
import { useEffect, useState } from "react";
import deploy from "./deploy";
import Escrow from "./Escrow";
import axios from "axios";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const serverUrl = "http://localhost:4000";

export async function sendGoods(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).sendGoods();
  await approveTxn.wait();
}

export async function confirmReceipt(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).confirmReceipt();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  console.log('escrows: ', escrows);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send("eth_requestAccounts", []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  useEffect(() => {
    async function getContracts() {
      const { data } = await axios.get(`${serverUrl}/contract`, {
        // TODO: add request body parameters here!
      });
      console.log("data: ", data);
      setEscrows(data);
    }
    getContracts();
  }, []);

  async function newContract() {
    const beneficiary = document.getElementById("beneficiary").value;
    const value = ethers.utils.parseEther(document.getElementById("eth").value);
    const escrowContract = await deploy(signer, beneficiary, value);

    const escrow = {
      address: escrowContract.address,
      beneficiary,
      value: value.toString(),
      handleSendGoods: async () => {
        escrowContract.on("GoodsSent", () => {
          document.getElementById(escrowContract.address).className =
            "complete";
          document.getElementById(escrowContract.address).innerText =
            "✓ Goods have been sent!";
        });

        await sendGoods(escrowContract, signer);
      },
      handleApprove: async () => {
        escrowContract.on("Approved", () => {
          document.getElementById(escrowContract.address).className =
            "complete";
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await confirmReceipt(escrowContract, signer);
      },
    };
    console.log('escrow: ', escrow);

    const { data } = await axios.post(`${serverUrl}/contract`, {
      contract: JSON.stringify(escrow),
    });
    console.log('data: ', data);

    setEscrows([...escrows, escrow]);
  }

  return (
    <div className="appContainer">
      <div className="contract">
        <h1> New Contract </h1>
     

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in ETH)
          <input type="text" id="eth" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} handleSendGoods={escrow.handleSendGoods}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
