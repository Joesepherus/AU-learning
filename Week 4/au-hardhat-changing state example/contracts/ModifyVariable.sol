//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ModifyVariable {
  uint public x;
  string public hello;

  constructor(uint _x, string memory _hello) {
    x = _x;
    hello = _hello;
  }

  function modifyToLeet() public {
    x = 1337;
  }

  function modifyHello(string memory greeting) public {
    hello = greeting;
  }

}