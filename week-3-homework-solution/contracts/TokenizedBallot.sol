// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IMyERC20Votes {
    function getPastVotes(address, uint256) external view returns (uint256);
}
contract Ballot {
    struct Proposal {
        bytes32 name;
        uint voteCount;
    }

    Proposal[] public proposals;
    IMyERC20Votes public tokenContract;
    uint256 public targetBlockNumber;

    mapping(address => uint256) public votingPowerSpent;

    constructor(bytes32[] memory proposalNames, address _tokenContract, uint256 _targetBlockNumber) {
        tokenContract = IMyERC20Votes(_tokenContract);
        targetBlockNumber = _targetBlockNumber;
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
    }

    function vote(uint proposal, uint256 amount, uint256 _blockNumber) public {
        require(votingPower(msg.sender, _blockNumber) >= amount, "You cant vote more that allowed");
        votingPowerSpent[msg.sender] += amount;
        proposals[proposal].voteCount += amount;
    }

    function votingPower(address _account, uint256 _blockNumber) public view returns (uint256)  {
        return tokenContract.getPastVotes(_account, _blockNumber) - votingPowerSpent[_account];
    }

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }

    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
