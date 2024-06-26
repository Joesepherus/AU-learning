// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Sidekick {
    function makeContact(address hero) external {
        // TODO: trigger the hero's fallback function!
        (bool success, ) = hero.call(
            abi.encodeWithSignature("alert(uint256,bool,bool)", 10, true, true)
        );

        require(success);
    }
}
