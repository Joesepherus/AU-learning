const { ethers, upgrades } = require('hardhat');

// TO DO: Place the address of your proxy here!
const proxyAddress = '0xc2769fc545D630f7d1734e70708C55078896c70F';

async function main() {
  const VendingMachineV3 = await ethers.getContractFactory('VendingMachineV3');
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV3);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );

  console.log("The current contract owner is: " + await upgraded.owner());
  console.log('Implementation contract address: ' + implementationAddress);
}

main();