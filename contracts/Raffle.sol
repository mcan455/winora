// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Raffle {
    address public owner;
    address[] public participants;
    address[] public winners;

    uint256 public ticketPrice = 0.01 ether;
    uint256 public maxWinners = 3;
    bool public raffleOpen = true;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function enterRaffle() external payable {
        require(raffleOpen, "Raffle closed");
        require(msg.value == ticketPrice, "Incorrect ticket price");
        participants.push(msg.sender);
    }

    function drawWinners() external onlyOwner {
        require(raffleOpen, "Already drawn");
        require(participants.length > 0, "No participants");

        raffleOpen = false;
        delete winners;

        uint256 total = participants.length;
        uint256 drawCount = total < maxWinners ? total : maxWinners;

        for (uint256 i = 0; i < drawCount; i++) {
            uint256 randomIndex = uint256(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, i))
            ) % participants.length;

            address winner = participants[randomIndex];
            winners.push(winner);

            // remove selected winner
            participants[randomIndex] = participants[participants.length - 1];
            participants.pop();
        }
    }

    function getWinners() external view returns (address[] memory) {
        return winners;
    }

    function getParticipants() external view returns (address[] memory) {
        return participants;
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function resetRaffle() external onlyOwner {
        delete participants;
        delete winners;
        raffleOpen = true;
    }
}
