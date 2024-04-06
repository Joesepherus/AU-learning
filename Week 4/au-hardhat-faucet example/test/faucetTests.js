const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const initialBalance = ethers.parseEther("10");
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy({ value: initialBalance });

    const [owner, user] = await ethers.getSigners();

    console.log("Signer 1 address: ", owner.address);
    return { faucet, owner, user };
  }

  it("should deploy and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("dont let user withraw more than 0.1 ETH", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    let withdrawAmount = ethers.parseUnits("1", "ether");
    console.log("withdrawAmount: ", withdrawAmount);
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it("let user withraw less than or equal 0.1 ETH", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    let withdrawAmount = ethers.parseUnits("0.01", "ether");
    console.log("withdrawAmount: ", withdrawAmount);
    await expect(faucet.withdraw(withdrawAmount));
  });

  it("let owner to withdraw all", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdrawAll());
  });

  it("make sure withdraw all gives all the remaining funds to owner", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    const faucetBalance = await ethers.provider.getBalance(faucet.target);
    console.log("faucetBalance: ", faucetBalance);
    const ownerBalance = await ethers.provider.getBalance(owner.address);
    console.log("ownerBalance: ", ownerBalance);
    await faucet.withdrawAll();
    const newOwnerBalance = await ethers.provider.getBalance(owner.address);
    console.log("newOwnerBalance: ", newOwnerBalance);

    await expect(newOwnerBalance == ownerBalance + faucetBalance);
  });

  it("dont let other users than owner to withdraw all", async function () {
    const { faucet, owner, user } = await loadFixture(
      deployContractAndSetVariables
    );
    await expect(faucet.connect(user).withdrawAll()).to.be.reverted;
  });

  it("make sure the contract is destroyed after destroyFaucet is called", async function () {
    const { faucet, owner, user } = await loadFixture(
      deployContractAndSetVariables
    );
    await faucet.destroyFaucet();
    const res = await ethers.provider.getCode(faucet.target);
    console.log("res: ", res);
    await expect(res).to.equal("0x");
  });
});
