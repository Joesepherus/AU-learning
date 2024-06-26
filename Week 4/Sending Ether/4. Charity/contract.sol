// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    address public owner;
    address public charity;

    constructor(address _charity) {
        owner = msg.sender;
        charity = _charity;
    }

    receive() external payable {}

    function tip() public payable {
        owner.call{value: msg.value}("");
    }

    function donate() public payable {
        charity.call{value: address(this).balance}("");
    }
}
