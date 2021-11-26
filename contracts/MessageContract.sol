// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MessagePortal {
    uint256 totalMessages;

    uint256 private seed;

    event NewMessage(address indexed from, uint256 timestamp, string message);
 
    struct Message {
        address sender; 
        string message; 
        uint256 timestamp; 
    }
  
    Message[] message;

    mapping(address => uint256) public lastMessagedAt;

    constructor() payable {
        console.log("Constructor runs...");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function sendMessage(string memory _message) public {
        require(
            lastMessagedAt[msg.sender] + 10 seconds < block.timestamp,
            "Wait 10sec"
        );
        lastMessagedAt[msg.sender] = block.timestamp;


        totalMessages += 1;
        console.log("%s has messaged!", msg.sender);

        message.push(Message(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewMessage(msg.sender, block.timestamp, _message);
    }

    
    function getAllMessages() public view returns (Message[] memory) {
        return message;
    }

    function getTotalMessages() public view returns (uint256) {
        console.log("We have %d total message!", totalMessages);
        return totalMessages;
    }
}