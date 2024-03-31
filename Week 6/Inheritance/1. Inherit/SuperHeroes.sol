// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Hero.sol";

// TODO: create Mage/Warrior Heroes
contract Mage is Hero {
    function attack(address _enemyAddress) public {}
}

contract Warrior is Hero {
    function attack(address _enemyAddress) public {}
}
