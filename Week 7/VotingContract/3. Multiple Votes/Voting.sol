// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    enum VoteStates {
        Absent,
        Yes,
        No
    }
    struct Proposal {
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
        mapping(address => VoteStates) voteStates;
    }

    Proposal[] public proposals;

    function newProposal(address _target, bytes calldata _data) external {
        Proposal storage proposal = proposals.push();
        proposal.target = _target;
        proposal.data = _data;
    }

    function castVote(uint _proposalId, bool _vote) external {
        Proposal storage proposal = proposals[_proposalId];
        VoteStates vote = proposal.voteStates[address(msg.sender)];

        if (vote == VoteStates.Yes) {
            proposal.yesCount--;
        }
        if (vote == VoteStates.No) {
            proposal.noCount--;
        }
        if (_vote) {
            proposal.yesCount++;
        }
        if (!_vote) {
            proposal.noCount++;
        }
        proposal.voteStates[msg.sender] = _vote
            ? VoteStates.Yes
            : VoteStates.No;
    }
}
