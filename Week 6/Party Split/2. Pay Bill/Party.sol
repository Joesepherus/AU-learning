// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Party {
	uint public amount;
    address[]  members;
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

    function payBill(address payable _address, uint _amount) external payable {
        bool callSuccess = _address.send(_amount);
        require(callSuccess, "Transfer failed");
        uint equalAmount = address(this).balance / members.length;
        for(uint i = 0; i < members.length; i++) {
            (bool success, ) = members[i].call{ value: equalAmount }("");
            require(success, "Transfer failed");
        }
    }
}