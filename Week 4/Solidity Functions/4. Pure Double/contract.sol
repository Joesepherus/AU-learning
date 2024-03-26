// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    function double(uint _num) external pure returns (uint _double) {
        _double = _num * 2;
    }
}
