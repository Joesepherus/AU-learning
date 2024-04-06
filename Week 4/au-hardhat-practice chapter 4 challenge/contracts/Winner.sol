// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Contract2 {
    event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}

contract WinnerContract {
    function sendAlert() external {
        address contractAddress = 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502;
        bytes4 signature = bytes4(keccak256("attempt()"));

        (bool success, ) = contractAddress.call(abi.encodePacked(signature));
        require(success, "Function call failed");
    }
}
