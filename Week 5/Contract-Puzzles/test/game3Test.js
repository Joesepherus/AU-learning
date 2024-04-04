const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signer };
  }

  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect

    const [addr1,addr2,addr3] = await ethers.getSigners();

    const gameWithAddr1 = game.connect(addr1);
    const gameWithAddr2 = game.connect(addr2);
    const gameWithAddr3 = game.connect(addr3);

    await gameWithAddr1.buy({ value: ethers.utils.parseEther('2') });
    await gameWithAddr2.buy({ value: ethers.utils.parseEther('3') });
    await gameWithAddr3.buy({ value: ethers.utils.parseEther('1') });

    // TODO: win expects three arguments
    await game.win(addr1.getAddress(), addr2.getAddress(), addr3.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
