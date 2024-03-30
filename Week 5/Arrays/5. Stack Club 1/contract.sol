// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract StackClub {
    address[] members;

    constructor() {
        members.push(msg.sender);
    }

    function addMember(address newMember) external {
        members.push(newMember);
    }

    function isMember(address _address) public view returns (bool) {
        for (uint i; i < members.length; i++) {
            if (members[i] == _address) {
                return true;
            }
        }
        return false;
    }
}
