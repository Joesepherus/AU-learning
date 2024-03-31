// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Hero.sol";

// TODO: create Mage/Warrior Heroes
contract Mage is Hero(50) {
    function attack(address _enemyAddress) public {}
}

contract Warrior is Hero(200) {
    function attack(address _enemyAddress) public {}
}
