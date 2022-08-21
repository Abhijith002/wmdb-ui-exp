import { ethers } from "ethers";
import { wmdbABI, governorABI } from "../data/abi";

export async function votecount(proposalId) {
  let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const governor = new ethers.Contract(
    "0x328655ae79A76fc2839f8Bf16F36f2aB90B5e841",
    governorABI,
    signer
  );

  const proposalVotes = await governor.proposalVotes(proposalId);
  const proposalState = await governor.state(proposalId);

  console.log(`Current Proposal Deadline: ${proposalVotes}`);
  return { proposalVotes: `${proposalVotes}`, proposalState: proposalState };
}
