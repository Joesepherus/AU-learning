//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract Bucket {
    event Winner(address);

    function drop(address erc20, uint amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(IERC20(erc20).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit Winner(msg.sender);
    }
}

contract CallerContract {
    function callDrop(address bucketAddress, address erc20Address, uint amount) external {
        Bucket bucket = Bucket(bucketAddress);
        require(IERC20(erc20Address).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        bucket.drop(erc20Address, amount);
    }
}

// contract Spender {
//     mapping(address => uint) pooled;
//     address erc20;

//     // ...
//     constructor(){
//         poolTokens(10);
//     }

//     function poolTokens(uint256 amount) public returns (bool success) {
//         // pull the tokens from the msg.sender using transferFrom
//         bool success = ERC20(address(0x873289a1aD6Cf024B927bd13bd183B264d274c68)).drop(msg.sender, amount);
//         require(success);
        
//         // account for this balance update 
//         pooled[msg.sender] += amount;
//     }
// }

// contract MyERC20 {
//     mapping (address => uint256) balances;
//     mapping (address => mapping (address => uint256)) allowed;
    
//     function approve(address spender, uint256 value) public returns (bool success) {
//         allowed[msg.sender][spender] = value;
//         return true;
//     }

//     function transferFrom(address from, address to, uint256 value) public returns (bool success) {
//         balances[to] += value;
//         balances[from] -= value;
//         allowed[from][msg.sender] -= value;
//         return true;
//     }
// }