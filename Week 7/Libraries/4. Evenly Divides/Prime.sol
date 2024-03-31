// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Prime {
    function dividesEvenly(uint _one, uint _two) public pure returns (bool) {
        return _one % _two == 0;
    }
}
