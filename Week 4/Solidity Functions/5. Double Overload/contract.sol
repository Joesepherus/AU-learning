// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    function double(uint num) external pure returns (uint double) {
        double = num * 2;
    }

    function double(
        uint num,
        uint secondNum
    ) external pure returns (uint, uint) {
        return (num * 2, secondNum * 2);
    }
}
