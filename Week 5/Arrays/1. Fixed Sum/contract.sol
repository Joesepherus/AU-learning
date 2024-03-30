// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function sum(uint[5] memory _array) external pure returns (uint) {
        uint sumNum = 0;
        for (uint i = 0; i < _array.length; i++) {
            sumNum += _array[i];
        }
        return sumNum;
    }
}
