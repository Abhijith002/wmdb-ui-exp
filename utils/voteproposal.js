import { ethers } from "ethers";
import { wmdbABI, governorABI } from "../data/abi";

// async function main(proposalId, reason) {
//   // 0 = Against, 1 = For, 2 = Abstain for this example
//   const voteWay = 1;
//   const reason = "I lika do da cha cha";
//   await vote(proposalId, voteWay, reason);
// }

// 0 = Against, 1 = For, 2 = Abstain for this example
export async function voteProposal(proposalId, voteWay, reason) {
  console.log("Voting...");
  console.log(proposalId);
  let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const governor = new ethers.Contract(
    "0x328655ae79A76fc2839f8Bf16F36f2aB90B5e841",
    governorABI,
    signer
  );
  const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason);
  const voteTxReceipt = await voteTx.wait(1);
  console.log(voteTxReceipt.events[0].args.reason);
  const proposalState = await governor.state(proposalId);
  console.log(`Current Proposal State: ${proposalState}`);
  const proposalVotes = await governor.proposalVotes(proposalId);
  return { proposalVotes: `${proposalVotes}` };
}
