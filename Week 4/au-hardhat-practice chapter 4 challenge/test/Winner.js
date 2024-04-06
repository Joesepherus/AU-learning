const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Winner", function () {
  it("should change x to 1337", async function () {
    const Contract2 = await ethers.getContractFactory("Contract2");
    const contract2 = await Contract2.deploy();
    console.log('contract2: ', contract2);

    const Winner = await ethers.getContractFactory("WinnerContract");
    const winner = await Winner.deploy();
    console.log('winner: ', winner.target);


    // const _x = 42; // Example value for _x
    // const _hello = "Hi"; // Example value for _hello


    const res = await winner.sendAlert(contract2.target);
    console.log('res: ', res);

    // // getter for state variable x
    // const newX = await contract.x();

    // assert.equal(Number(newX), 1337);
  });
});
