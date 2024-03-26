// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
error NotItemCreator();

contract Contract {
    address deployer;
    constructor() payable {
        require(msg.value >= 1 ether, "Not enough ether sent");
        deployer = msg.sender;
    }

    function withdraw() public {
        if (msg.sender != deployer) {
            revert NotItemCreator();
        }
        deployer.call{value: address(this).balance}("");
    }
}
