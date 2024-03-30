// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Collectible {
    address original;
    event Deployed(address _address);

    constructor() {
        original = msg.sender;
        emit Deployed(msg.sender);
    }
}
