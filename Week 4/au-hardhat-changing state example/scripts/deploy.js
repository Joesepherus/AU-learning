async function main() {

  const faucet = await hre.ethers.deployContract("Faucet");

  await faucet.waitForDeployment();

  console.log(
    `Faucet deployed to ${faucet.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
