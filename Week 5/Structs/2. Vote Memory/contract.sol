// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
pragma experimental ABIEncoderV2;

contract Contract {
    enum Choices {
        Yes,
        No
    }

    struct Vote {
        Choices choice;
        address voter;
    }

    // TODO: make a new createVote function
    function createVote(Choices _choices) external returns (Vote memory) {
        Vote memory newVote = Vote(_choices, msg.sender);
        return newVote;
    }
}
