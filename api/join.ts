import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createFrameTransactionResponse } from "@farcaster/frame-sdk";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../src/config/contract";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const tx = {
      chainId: "eip155:8453", // Base mainnet
      method: "eth_sendTransaction",
      params: {
        abi: CONTRACT_ABI.abi,
        to: CONTRACT_ADDRESS,
        functionName: "joinRaffle",
        args: [],
        value: "0x0",
      },
    };

    const frameTx = createFrameTransactionResponse(tx);
    return res.status(200).json(frameTx);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating Farcaster transaction frame");
  }
}

