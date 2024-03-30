// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    address original;
    uint price;
    event Deployed(address _address);
    event Transfer(address _owner, address _newOwner);
    event ForSale(uint _price, uint _block);

    constructor() {
        original = msg.sender;
        emit Deployed(msg.sender);
    }

    function transfer(address _address) public {
        require(msg.sender == original);
        emit Transfer(original, _address);
        original = _address;
    }

    function markPrice(uint _price) public {
        require(msg.sender == original);
        emit ForSale(_price, block.timestamp);
        price = _price;
    }
}
