import { ethers } from "ethers";
import { wmdbABI, governorABI } from "../data/abi";

export async function propose(args, functionToCall, proposalDescription) {
  let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const governor = new ethers.Contract(
    "0x328655ae79A76fc2839f8Bf16F36f2aB90B5e841",
    governorABI,
    signer
  );
  const wmdb = new ethers.Contract(
    "0x65600cbA4A03dE2cfEe8E76Eb8828d46FBD02419",
    wmdbABI,
    signer
  );
  console.log(wmdb);
  const encodedFunctionCall = wmdb.interface.encodeFunctionData(
    functionToCall,
    args
  );
  console.log(`Proposing ${functionToCall} on ${wmdb.address} with ${args}`);
  console.log(`Proposal Description:\n  ${proposalDescription}`);
  const proposeTx = await governor.propose(
    [wmdb.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  );
  // If working on a development chain, we will push forward till we get to the voting period.
  //   if (developmentChains.includes(network.name)) {
  //     await moveBlocks(VOTING_DELAY + 1);
  //   }
  const proposeReceipt = await proposeTx.wait(1);
  const proposalId = proposeReceipt.events[0].args.proposalId;
  console.log(`Proposed with proposal ID:\n  ${proposalId}`);

  const proposalState = await governor.state(proposalId);
  const proposalSnapShot = await governor.proposalSnapshot(proposalId);
  const proposalDeadline = await governor.proposalDeadline(proposalId);

  // The state of the proposal. 1 is not passed. 0 is passed.
  console.log(`Current Proposal State: ${proposalState}`);
  // What block # the proposal was snapshot
  console.log(`Current Proposal Snapshot: ${proposalSnapShot}`);
  // The block number the proposal voting expires
  console.log(`Current Proposal Deadline: ${proposalDeadline}`);
  return { proposalId: `${proposalId}`, proposalState: proposalState };
}
