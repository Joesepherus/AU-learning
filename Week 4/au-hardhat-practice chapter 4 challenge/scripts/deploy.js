async function main() {

  const winner = await hre.ethers.deployContract("WinnerContract");

  await winner.waitForDeployment();

  console.log(
    `Winner deployed to ${winner.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
