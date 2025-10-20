import { Address } from "viem";

export const CONTRACT_ADDRESS: Address =
  "0xYourContractAddressHere"; // ← buraya kontrat adresin gelecek (Base testnet veya mainnet)
export const CONTRACT_ABI = [
  {
    name: "getPastWinners",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        components: [
          { name: "username", type: "string" },
          { name: "wallet", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        name: "",
        type: "tuple[]",
      },
    ],
  },
];
