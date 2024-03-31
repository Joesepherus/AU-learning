// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MultiSig {
    address[] public owners;
    uint public required;

    struct Transaction {
        address destination;
        uint value;
        bool executed;
    }
    mapping(uint => Transaction) public transactions;
    uint public transactionCount = 0;

    constructor(address[] memory _owners, uint _required) {
        require(_owners.length > 0);
        require(_required != 0);
        require(_owners.length > _required);
        owners = _owners;
        required = _required;
    }
}
