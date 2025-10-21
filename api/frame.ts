import type { VercelRequest, VercelResponse } from "@vercel/node";
import { CONTRACT_ADDRESS } from "../src/config/contract";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const frameMetadata = {
    name: "Winora Raffle 🎟️",
    description: "Join raffles and win USDC prizes on Base!",
    image: "https://winora-ivory.vercel.app/logo.png",
    buttons: [
      {
        label: "🎟️ Join Raffle",
        action: "tx",
        target: "https://winora-ivory.vercel.app/api/join",
      },
      {
        label: "💰 Claim Rewards",
        action: "tx",
        target: "https://winora-ivory.vercel.app/api/claim",
      },
      {
        label: "🏆 View Winners",
        action: "link",
        target: "https://winora-ivory.vercel.app/winners",
      },
    ],
    version: "1.0.0",
    chain: "base",
    contractAddress: CONTRACT_ADDRESS,
  };

  res.status(200).json(frameMetadata);
}
