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
    ) internal returns (uint) {
        Transaction memory transaction = Transaction(destination, value, false);
        transactions[transactionCount] = transaction;
        transactionCount++;
        return transactionCount - 1;
    }

    function isOwner() internal view returns (bool) {
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    modifier needsToBeOwner() {
        require(isOwner());
        _;
    }

    function confirmTransaction(uint transactionId) public needsToBeOwner {
        confirmations[transactionId][msg.sender] = true;
        if (isConfirmed(transactionId)) {
            executeTransaction(transactionId);
        }
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

    function submitTransaction(address destination, uint value) external {
        uint transactionId = addTransaction(destination, value);
        confirmTransaction(transactionId);
    }

    receive() external payable {}

    function isConfirmed(uint transactionId) public view returns (bool) {
        uint confirmationsCount = getConfirmationsCount(transactionId);
        if (confirmationsCount >= required) return true;
        return false;
    }

    function executeTransaction(uint transactionId) public {
        require(isConfirmed(transactionId));
        Transaction storage transaction = transactions[transactionId];
        (bool success, ) = transaction.destination.call{
            value: transaction.value
        }("");
        require(success, "Failed to execute transaction");
        transaction.executed = true;
    }
}
