// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    enum Choices {
        Yes,
        No
    }

    struct Vote {
        Choices choice;
        address voter;
    }

    Vote none = Vote(Choices(0), address(0));

    // TODO: create a public state variable: an array of votes
    Vote[] public votes;

    function createVote(Choices choice) external {
        // TODO: add a new vote to the array of votes state variable
        require(!hasVoted(msg.sender));
        votes.push(Vote(choice, msg.sender));
    }

    function hasVoted(address _address) public view returns (bool) {
        for (uint i = 0; i < votes.length; i++) {
            if (votes[i].voter == _address) {
                return true;
            }
        }
        return false;
    }

    function findVote(address _address) public view returns (Vote memory) {
        for (uint i = 0; i < votes.length; i++) {
            if (votes[i].voter == _address) {
                return votes[i];
            }
        }
        return none;
    }

    function findChoice(address _address) external view returns (Choices) {
        Vote memory foundVote = findVote(_address);
        return foundVote.choice;
    }

    function findVoteIndex(address _address) public view returns (uint) {
        for (uint i = 0; i < votes.length; i++) {
            if (votes[i].voter == _address) {
                return i;
            }
        }
        return 0;
    }

    function changeVote(Choices _choice) external {
        uint voteIndex = findVoteIndex(msg.sender);
        require(votes[voteIndex].voter != none.voter);

        votes[voteIndex].choice = _choice;
    }
}
