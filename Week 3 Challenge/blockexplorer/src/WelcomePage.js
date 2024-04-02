import { useEffect, useState } from "react";
import { alchemy } from "./App";
import React from "react";

const WelcomePage = () => {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [blockTransactions, setBlockTransactions] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  useEffect(async () => {
    if (blockNumber) {
      const _block = await alchemy.core.getBlock(blockNumber);
      const _blockTransaction = await alchemy.core.getBlockWithTransactions(
        blockNumber
      );
      console.log("_blockTransaction: ", _blockTransaction);
      setBlock(_block);
      setBlockTransactions(_blockTransaction);
    }
  }, [blockNumber]);
  console.log("block: ", block);
  console.log("blockTransactions: ", blockTransactions);

  async function getTransaction(transactionId) {
    const transaction = await alchemy.core.getTransaction(transactionId);
    setTransactionDetails(transaction);
    console.log("transaction: ", transaction);
  }

  return (
    <div>
      <div onClick={() => setShowDetails(!showDetails)}>
        Block Number: {blockNumber}
      </div>
      {showDetails ? (
        <div>
          <p>Hash:{block?.hash}</p>
          <p>Gas used: {block?.gasUsed._hex}</p>
          <p>Miner: {block?.miner}</p>
          <p>Nonce: {block?.nonce}</p>
          <p>Timestamp: {block?.timestamp}</p>
          <p>
            Transactions:{" "}
            <div>
              <p>
                {block?.transactions?.map((transaction) => (
                  <p onClick={() => getTransaction(transaction)}>
                    {transaction}
                    {transactionDetails?.hash === transaction ? (
                      <div>
                        <p>From: {transactionDetails.from}</p>

                        <p>Data: {transactionDetails.data}</p>
                        <p>Hash: {transactionDetails.hash}</p>
                        <p>Nonce: {transactionDetails.nonce}</p>
                      </div>
                    ) : null}
                  </p>
                ))}
              </p>
            </div>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default WelcomePage;
