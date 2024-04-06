// import testing libraries: https://www.chaijs.com/guide/styles/ 
const { expect, assert } = require("chai");

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("TestModifyHello", function () {
  it("should change hello to 'Greetings friend'", async function () {
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");
    const _x = 42; // Example value for _x
    const _hello = 'Hi'; // Example value for _hello
    const contract = await ModifyVariable.deploy(_x, _hello);
  
    // Wait for the deployment transaction to be mined
    await contract.waitForDeployment();
    // modify x from 10 to 1337 via this function!
    await contract.modifyHello("Greetings friend");
    
    // getter for state variable x
    const newHello = await contract.hello();
    
    assert.equal(newHello, "Greetings friend");
  });
});