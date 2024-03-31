// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
    uint public amount;
    address[] members;
    mapping(address => bool) paid;

    constructor(uint _amount) {
        amount = _amount;
    }

    function rsvp() external payable {
        require(msg.value == amount);
        require(!paid[msg.sender]);
        paid[msg.sender] = true;
        members.push(msg.sender);
    }
}
