// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function filterEven(
        uint[] memory _array
    ) external pure returns (uint[] memory) {
        uint numberOfEven = 0;
        for (uint i = 0; i < _array.length; i++) {
            if (_array[i] % 2 == 0) {
                numberOfEven += 1;
            }
        }
        uint[] memory evenNumbers = new uint[](numberOfEven);
        uint j = 0;
        for (uint i = 0; i < _array.length; i++) {
            if (_array[i] % 2 == 0) {
                evenNumbers[j] = _array[i];
                j++;
            }
        }
        return evenNumbers;
    }
}
