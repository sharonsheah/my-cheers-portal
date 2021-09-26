// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract CheersPortal {
    uint256 totalCheers;
    mapping (address => uint256) cheersLog;
    uint256 private seed;
    mapping(address => uint256) public lastCheersAt;

	event NewCheers(address indexed from, uint256 timestamp, string message);

    struct Cheers {
        address cheersFrom;
        string message;
        uint256 timestamp;
    }

    Cheers[] cheersArray;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function cheers(string memory _message) public {
        require(
            lastCheersAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

        lastCheersAt[msg.sender] = block.timestamp;

		totalCheers += 1;
		console.log("*Clink!* Cheers from %s!", msg.sender);

		cheersLog[msg.sender] += 1;
		console.log("%s has total of %d cheers!", msg.sender, cheersLog[msg.sender]);

        cheersArray.push(Cheers(msg.sender, _message, block.timestamp));

        uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %s", randomNumber);

        seed = randomNumber;

        if (randomNumber < 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than they contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewCheers(msg.sender, block.timestamp, _message);
    }

    function getAllCheers() public view returns (Cheers[] memory) {
        return cheersArray;
    }

    function getTotalCheers() public view returns (uint256) {
      	return totalCheers;
    }
}
