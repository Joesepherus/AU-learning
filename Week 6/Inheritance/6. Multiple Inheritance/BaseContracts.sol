// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Ownable {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }
}

contract Transferable is Ownable {
    function transfer(address _owner) public onlyOwner {
        owner = _owner;
    }
}
