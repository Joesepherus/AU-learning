// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
    address public beneficiary;
    address public depositor;
    bool public goodsSent;
    bool public goodsReceived;

    bool public isApproved;

    constructor(address _beneficiary) payable {
        beneficiary = _beneficiary;
        depositor = msg.sender;
        goodsSent = false;
        goodsReceived = false;
    }

    event Approved(uint);
    event GoodsSent(bool);

    function sendGoods() external {
        require(
            msg.sender == beneficiary,
            "Only beneficiary can call this function"
        );
        require(!goodsSent, "Goods have already been sent");

        emit GoodsSent(true);
        goodsSent = true;
    }

    function confirmReceipt() external {
        require(
            msg.sender == depositor,
            "Only depositor can call this function"
        );
        require(goodsSent, "Goods must be sent first");
        require(!goodsReceived, "Goods have already been received");

        // Perform actions to confirm receipt of goods

        goodsReceived = true;
        approve();
    }

    function approve() internal {
        uint balance = address(this).balance;
        (bool sent, ) = payable(beneficiary).call{value: balance}("");
        require(sent, "Failed to send Ether");
        emit Approved(balance);
        isApproved = true;
    }
}
