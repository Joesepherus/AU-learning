const { ethers } = require("hardhat");

async function main() {
  // Get the signer
  // console.log('ethers: ', ethers);
  const [signer] = await ethers.getSigners();
  console.log('signer: ', signer);

  // // Fetch the Ethereum address
  const address = await signer.getAddress();
  console.log("Address:", address);

  const transactionCount = await signer.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: address,
    nonce: transactionCount + 1
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}`,
    `Token deployed to ${token.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
