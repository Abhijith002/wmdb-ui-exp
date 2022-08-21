import { ethers } from "ethers";
import { wmdbABI, governorABI } from "../data/abi";

export async function queueAndExecute(
  args,
  functionToCall,
  proposalDescription
) {
  let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const wmdb = new ethers.Contract(
    "0x65600cbA4A03dE2cfEe8E76Eb8828d46FBD02419",
    wmdbABI,
    signer
  );
  const encodedFunctionCall = wmdb.interface.encodeFunctionData(
    functionToCall,
    args
  );
  const descriptionHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(proposalDescription)
  );
  // could also use ethers.utils.id(PROPOSAL_DESCRIPTION)

  const governor = new ethers.Contract(
    "0x328655ae79A76fc2839f8Bf16F36f2aB90B5e841",
    governorABI,
    signer
  );
  console.log("Queueing...");
  const queueTx = await governor.queue(
    [wmdb.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );
  await queueTx.wait(1);

  //   if (developmentChains.includes(network.name)) {
  //     await moveTime(MIN_DELAY + 1)
  //     await moveBlocks(1)
  //   }

  console.log("Executing...");
  // this will fail on a testnet because you need to wait for the MIN_DELAY!
  const executeTx = await governor.execute(
    [wmdb.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );
  await executeTx.wait(1);
  console.log(`wmdb value: ${await wmdb.retrieve()}`);
}
