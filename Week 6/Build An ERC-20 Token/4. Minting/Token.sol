// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Token {
    uint public totalSupply = 1000 * (10 ** 18);
    string public name = "Joes Experiences Token";
    string public symbol = "JET";
    uint8 public decimals = 18;
    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address _address) external view returns (uint) {
        return balances[_address];
    }
}
