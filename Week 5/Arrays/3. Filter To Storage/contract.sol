// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    uint[] public evenNumbers;

    function filterEven(uint[] calldata _array) external {
        for (uint i = 0; i < _array.length; i++) {
            if (_array[i] % 2 == 0) {
                evenNumbers.push(_array[i]);
            }
        }
    }
}
