async function main() {
  // make sure to replace the "JoesExperiences" reference with your own ERC-20 name!
  const token = await hre.ethers.deployContract("Spender");
  await token.waitForDeployment();

  console.log(
    `Spender deployed to ${token.target}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
