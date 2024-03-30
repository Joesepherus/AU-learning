// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    address original;
    uint price;
    event Deployed(address indexed _address);
    event Transfer(address indexed _owner, address indexed _newOwner);
    event ForSale(uint _price, uint _block);
    event Purchase(uint _amount, address indexed _buyer);

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

    function purchase() external payable {
        require(msg.value == price);
        require(price > 0);
        (bool success, ) = original.call{value: msg.value}("");
        require(success);
        original = msg.sender;
        markPrice(0);
        emit Purchase(msg.value, msg.sender);
    }
}
