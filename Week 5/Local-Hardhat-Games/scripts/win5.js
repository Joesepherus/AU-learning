// add the game address here and update the contract name if necessary
const gameAddr = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";
const contractName = "Game5";

async function main() {
    // attach to the game
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    const giveMeAllowanceTx = await game.giveMeAllowance(1000000);
    await giveMeAllowanceTx.wait();

    const mingTx = await game.mint(100000);
    await mingTx.wait();

    const tx = await game.win();

    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx.wait();
    console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
