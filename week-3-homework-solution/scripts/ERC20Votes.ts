import { utils } from 'ethers';
import { ethers } from "hardhat";
import { Ballot__factory, MyERC20Votes__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();


const MINT_VALUE = ethers.utils.parseUnits("100")

async function main() {
    // console.log(process.env.PRIVATE_KEY)
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    // const provider = new ethers.providers.JsonRpcProvider(
    //     process.env.ALCHEMY_API_URL
    // );

    // const signer = wallet.connect(provider);

    // const balance = await signer.getBalance();
    // console.log(`Balance is: ${ethers.utils.formatUnits(balance)} ETH`);


    const [deployer, acct1, acct2] = await ethers.getSigners();
    const contractFactory = new MyERC20Votes__factory(deployer);
    const contract = await contractFactory.deploy()
    const deployTxnReceipt = await contract.deployTransaction.wait()

    console.log(`The contract was deployed at address ${contract.address} at the block ${deployTxnReceipt.blockNumber} \n \n`)

    const acct1balanceBeforeMinting = await contract.balanceOf(acct1.address)

    console.log(
        `Token balance of ${acct1.address} at Block Number ${deployTxnReceipt.blockNumber} before miniting is ${acct1balanceBeforeMinting} Tokens \n
    `)
    
    const mintTx = await contract.mint(acct1.address, MINT_VALUE)
    const mintTxReceipt = await mintTx.wait()


    console.log(
        `Minted ${ethers.utils.formatUnits(MINT_VALUE)} tokens to  ${acct1.address} at Block Number ${mintTxReceipt.blockNumber} with BlockHash ${mintTxReceipt.blockHash} \n
    `)

    const acct1balanceAfterMinting = await contract.balanceOf(acct1.address)

    console.log(`
        Token balance of ${acct1.address} at Block Number ${mintTxReceipt.blockNumber} After miniting is ${ethers.utils.formatUnits(acct1balanceAfterMinting)} Tokens \n
    `)


    const votingPowerBeforeDelegation = await contract.getVotes(acct1.address);

    console.log(`
        Account ${acct1.address} has ${ethers.utils.formatUnits(votingPowerBeforeDelegation)} voting powers before self delegation \n
    `)

    const delegaTx = await contract.connect(acct1).delegate(acct1.address)
    await delegaTx.wait()

    const votingPowerAfterDelegation = await contract.getVotes(acct1.address);

    console.log(`
        Account ${acct1.address} has ${ethers.utils.formatUnits(votingPowerAfterDelegation)} voting powers After self delegation \n
    `)
    
    console.log(`
        Transferring Token From ${acct1.address} to ${acct2.address} \n
    `)

    const transferTx = await contract.connect(acct1).transfer(acct2.address, MINT_VALUE.div(2))
    await transferTx.wait()

    const vote1AfterTrasnfer = await contract.getVotes(acct1.address)

    console.log(`
        Account ${acct1.address} has ${ethers.utils.formatUnits(vote1AfterTrasnfer)} units of  voting power \n
    `)

    const vote2AfterTrasnfer = await contract.getVotes(acct2.address)

    console.log(`
        Account ${acct2.address} has ${ethers.utils.formatUnits(vote2AfterTrasnfer)} units of  voting power \n
    `)


    //deploy Ballot contract
    let proposals = process.argv.slice(2)
    const proposalNames = proposals.map(ethers.utils.formatBytes32String)
    
    const BallotFactory = new Ballot__factory(deployer)
    const BallotContract = await BallotFactory.deploy(
        proposalNames, 
        contract.address, 
        deployTxnReceipt.blockNumber
    );

    const BallotContractTxReceipt = await BallotContract.deployTransaction.wait()
    
    const voteTx = await BallotContract.connect(acct1).vote(1, 10, BallotContractTxReceipt.blockNumber - 1) //remember to get last block propoerly

    console.log(`Quering Result ............... \n`)
    const winner = await BallotContract.winnerName()
    console.log(`Winning proposal is => ${winner}`)

}   

main().catch((err) => {
    console.error(err)
    process.exitCode = 1
});
