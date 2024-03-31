// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Switch {
    address recipient;
    address owner;
    uint startDate;

    constructor(address _address) payable {
        recipient = _address;
        owner = msg.sender;
        startDate = block.timestamp;
    }

    function withdraw() external {
        require(block.timestamp > startDate + 52 weeks);
        (bool success, ) = recipient.call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    function ping() external {
        require(owner == msg.sender);
        startDate = block.timestamp;
    }
}
