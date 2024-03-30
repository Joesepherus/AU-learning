// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;
    bool public isApproved = false;

    constructor(address _arbiter, address _beneficiary) payable {
        depositor = msg.sender;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
    }

    function approve() external payable {
        uint balance = address(this).balance;
        require(msg.sender == arbiter);
        (bool sent, ) = beneficiary.call{value: balance}("");
        require(sent, "Failed to send ether");
        isApproved = true;
    }
}
