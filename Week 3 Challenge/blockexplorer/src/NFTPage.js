import { useEffect, useState } from "react";
import React from "react";
import { alchemy } from "./App";
import { ethers } from "ethers";
import { AlchemySubscription } from "alchemy-sdk";
console.log("ethers: ", ethers.formatEther);
const NFTPage = () => {
  const [address, setAddress] = useState();
  const [ownerAddress, setOwnerAddress] = useState();
  const [tokenId, setTokenId] = useState();
  const [token, setToken] = useState();
  const [floorPrice, setFloorPrice] = useState();
  const [transactionId, setTransactionId] = useState();
  const [transaction, setTransaction] = useState();
  const [transfers, setTransfers] = useState();
  const [assetTransfers, setAssetTransfers] = useState();
  const [toAddress, setToAddress] = useState();

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function getToken() {
    if (address && tokenId) {
      console.log("tokenId: ", tokenId, parseInt(tokenId, 16));
      const _token = await alchemy.nft.getNftMetadata(
        address,
        parseInt(tokenId, 16)
      );
      console.log("_token: ", _token);
      setToken(_token);
    }
  }

  async function getFloorPrice() {
    if (address) {
      const _floorPrice = await alchemy.nft.getFloorPrice(address);
      console.log("_floorPrice: ", _floorPrice);
      setFloorPrice(_floorPrice);
    }
  }

  async function getTransfers() {
    console.log("what");
    const transferForOwner = await alchemy.nft.getTransfersForOwner(
      ownerAddress
    );
    console.log("transferForOwner: ", transferForOwner);
    for (let i = 0; i < 10; i++) {
      const transaction = await alchemy.core.getTransaction(
        transferForOwner.nfts[i].transactionHash
      );
      console.log("transaction: ", transaction);
      transferForOwner.nfts[i]["transaction"] = transaction;
    }
    console.log("transferForOwner: ", transferForOwner);
    setTransfers(transferForOwner.nfts);
  }

  async function waitForTransaction() {
    alchemy.ws.on(
      {
        method: AlchemySubscription.MINED_TRANSACTIONS,
        addresses: [{ from: transactionId }],
        includeRemoved: true,
        hashesOnly: false,
      },
      (tx) => {
        setTransaction(tx.transaction);
        console.log(tx);
      }
    );
    // Subscription for new blocks on Eth Mainnet.
  }

  async function subscribeToBlocks() {
    alchemy.ws.on("block", (blockNumber) =>
      console.log("The latest block number is", blockNumber)
    );
  }

  async function getAssetTransfers() {
    const data = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toAddress: toAddress,
      category: ["external", "internal", "erc20", "erc721", "erc1155"],
      order: "desc",
    });
    console.log("data: ", data);
    setAssetTransfers(data.transfers);
  }

  return (
    <div>
      <div>
        <h2>Get NFT Metadata</h2>
        <input
          placeholder="Type an address, for example: 0x2"
          value={address}
          onChange={setValue(setAddress)}
        ></input>
        <input
          placeholder="Type an token id, for example: 0x2"
          value={tokenId}
          onChange={setValue(setTokenId)}
        ></input>
        <button
          onClick={() => {
            getToken();
            getFloorPrice();
          }}
        >
          submit
        </button>
        {token ? (
          <div>
            <p>Title: {token.title}</p>
            <p>Token ID: {token.tokenId}</p>
            <p>Token Type: {token.tokenType}</p>
            <p>Contract Address: {token.contract.address}</p>
          </div>
        ) : null}
      </div>
      <div>
        <h2>Floor Price</h2>

        {floorPrice ? (
          <div>Floor Price: {floorPrice?.looksRare?.floorPrice}</div>
        ) : null}
      </div>

      <div>
        <h2>Transfers</h2>

        <input
          placeholder="Type an address, for example: 0x2"
          value={ownerAddress}
          onChange={setValue(setOwnerAddress)}
        ></input>
        <button onClick={() => getTransfers()}>Get Transfers For Owner</button>
        {transfers ? (
          <div>
            {transfers?.map((transfer) => (
              <div>
                <img
                  src={transfer.image.cachedUrl}
                  width="80px"
                  height="auto"
                />
                <p>{transfer.from}</p>
                <p>{transfer.to}</p>
                {transfer?.transaction?.value._hex ? (
                  <p>{ethers.formatEther(transfer?.transaction?.value._hex)}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <h2>Wait for pending transcation to finish</h2>

        <input
          placeholder="Type an address, for example: 0x2"
          value={transactionId}
          onChange={setValue(setTransactionId)}
        ></input>
        <button onClick={() => waitForTransaction()}>
          Wait for Transaction
        </button>
        {transaction ? (
          <div>
            <p>From: {transaction.from}</p>
            <p>To: {transaction.to}</p>
            <p>Value: {transaction.value}</p>
            <p>Hash: {transaction.hash}</p>
          </div>
        ) : null}
      </div>
      <div>
      <h2>Get transfers</h2>

        <input
          placeholder="Type an address, for example: 0x2"
          value={toAddress}
          onChange={setValue(setToAddress)}
        ></input>
        <button onClick={() => getAssetTransfers()}>Get transfers</button>
        {assetTransfers ? (
          <div>
            {assetTransfers.map((transfer) => (
              <div>
                <p>{transfer.asset}</p>
                <p>{transfer.from}</p>
                <p>{transfer.to}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NFTPage;
