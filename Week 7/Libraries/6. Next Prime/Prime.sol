// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Prime {
    function dividesEvenly(uint _one, uint _two) public pure returns (bool) {
        return _one % _two == 0;
    }

    function isPrime(uint _number) public pure returns (bool) {
        for (uint i = 2; i < _number; i++) {
            if (dividesEvenly(_number, i)) {
                return false;
            }
        }
        return true;
    }
}
