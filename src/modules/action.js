import { config } from "./config";
import { ABI } from "../components/constants";
import { ethers } from "ethers";
import { writeContract } from "wagmi/actions";

export function transferAmount(amount, contractAddress) {
  return writeContract(config, {
    address: contractAddress,
    abi: ABI,
    functionName: "payOwner",
    value: ethers.utils.parseEther((Number(amount) - 0.003).toString()),
  });
}
