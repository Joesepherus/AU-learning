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
    }

    Proposal[] public proposals;

    function newProposal(address _target, bytes calldata _data) external {
        proposals.push(Proposal(_target, _data, 0, 0));
    }

    function castVote(uint _proposalId, bool _vote) external {
        Proposal storage proposal = proposals[_proposalId];

        if (_vote) {
            proposal.yesCount++;
        }
        if (!_vote) {
            proposal.noCount++;
        }
    }
}
