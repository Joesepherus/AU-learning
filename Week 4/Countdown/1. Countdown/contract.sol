// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    uint tickNumber = 10;

    function tick() external {
        tickNumber--;
        if (tickNumber == 0) {
            selfdestruct(payable(msg.sender));
        }
    }
}
