const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    async function generateAddressBelowThreshold(threshold) {
      const provider = ethers.provider;

      while (true) {
        // Generate a random private key
        const privateKey = ethers.utils.hexlify(ethers.utils.randomBytes(32));

        // Create a wallet from the private key
        const wallet = new ethers.Wallet(privateKey, provider);
        console.log('wallet.address: ', wallet.address);

        const [addr1] = await ethers.getSigners();
        const addr1Address = await addr1.getAddress();

        // Fund the wallet with some Ether (for example, 10 ETH)
        await provider.send("eth_sendTransaction", [
          {
            from: addr1Address, // replace with your sender address
            to: wallet.address,
            value: ethers.utils.parseEther("10").toHexString(),
          },
        ]);

        // Check if the address is below the threshold
        if (ethers.BigNumber.from(wallet.address).lt(threshold)) {
          return wallet;
        }
      }
    }

    // Example usage:
    const threshold = ethers.BigNumber.from(
      "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf"
    );
    const addrBelowThreshold = await generateAddressBelowThreshold(threshold);
    console.log("Address below threshold:", addrBelowThreshold);

    const gameWithAddr = game.connect(addrBelowThreshold);
    await gameWithAddr.win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
