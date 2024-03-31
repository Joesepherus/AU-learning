// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IERC20.sol";

contract Chest {
    function plunder(address[] memory _addresses) external {
        for (uint i = 0; i < _addresses.length; i++) {
            address tokenAddress = _addresses[i];
            address chestAddress = address(this);
            IERC20 token = IERC20(tokenAddress);
            uint balanceOfAddress = token.balanceOf(chestAddress);
            token.transfer(msg.sender, balanceOfAddress);
        }
    }
}
