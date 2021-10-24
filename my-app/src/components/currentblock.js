import React, { useState, useEffect } from "react";
const Block = require("./models/block");
const ethers = require("ethers");

const CurrentBlock = () => {
  const [block, setBlock] = useState(0);

  useEffect(() => {
    async function fetchCurrentBlock() {
      let currentBlock = await getCurrentBlock();
      setBlock(currentBlock);
    }
    fetchCurrentBlock();
  });

  if (!block) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="currentBlock">
        <div className="number">
          <h1>Block </h1>
          <div className="currentNumber">
            <p>{block.number}</p>
          </div>
        </div>
        <div className="txns">
          <h1>TXNS</h1>
          <div className="currentTxns">
            <p>{block.txns}</p>
          </div>
        </div>
        <div className="miner">
          <h1>Miner</h1>
          <div className="currentMiner">
            <p>{block.miner}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default CurrentBlock;

async function getCurrentBlock() {
  const block = new Block();
  const url =
    "https://eth-mainnet.alchemyapi.io/v2/vPTYIYJvIaPmUtLNbmrhJZd_LhFEySaZ";
  const provider = new ethers.providers.JsonRpcProvider(url);

  block.number = await provider.getBlockNumber();
  const blockData = await provider.getBlock(block.number);

  block.txns = blockData.transactions.length;
  block.miner = blockData.miner;
  return block;
}
