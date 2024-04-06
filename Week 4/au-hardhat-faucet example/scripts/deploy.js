async function main() {

  const faucetOld = await hre.ethers.deployContract("FaucetOld");

  await faucetOld.waitForDeployment();

  console.log(
    `FaucetOld deployed to ${faucetOld.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
