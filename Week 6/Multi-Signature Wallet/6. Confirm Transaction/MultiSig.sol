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
    mapping(uint => mapping(address => bool)) public confirmations;

    constructor(address[] memory _owners, uint _required) {
        require(_owners.length > 0);
        require(_required != 0);
        require(_owners.length > _required);
        owners = _owners;
        required = _required;
    }

    function addTransaction(
        address destination,
        uint value
    ) public returns (uint) {
        Transaction memory transaction = Transaction(destination, value, false);
        transactions[transactionCount] = transaction;
        transactionCount++;
        return transactionCount - 1;
    }

    function confirmTransaction(uint transactionId) public {
        confirmations[transactionId][msg.sender] = true;
    }

    function getConfirmationsCount(
        uint transactionId
    ) public view returns (uint) {
        uint confirmationsCount = 0;
        for (uint i = 0; i < owners.length; i++) {
            if (confirmations[transactionId][owners[i]]) {
                confirmationsCount++;
            }
        }
        return confirmationsCount;
    }
}
