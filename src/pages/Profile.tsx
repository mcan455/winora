import React, { useState } from "react";
import { ethers } from "ethers";
import BottomNav from "../components/BottomNav";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

  async function getContract() {
    if (!window.ethereum) throw new Error("Wallet not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);
  }

  async function fetchPendingRewards() {
    try {
      const contract = await getContract();
      const reward = await contract.pendingRewards(await contract.signer.getAddress());
      setBalance(ethers.formatUnits(reward, 6)); // USDC = 6 decimals
    } catch (err) {
      console.error("Error fetching rewards:", err);
    }
  }

  async function claimRewards() {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.claimReward();
      await tx.wait();

      alert("✅ Rewards successfully claimed!");
      setClaimed(true);
      setBalance("0");
    } catch (error) {
      console.error(error);
      alert("❌ Claim failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-gray-900 flex flex-col items-center p-6 font-sans tracking-tight pb-20">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md border border-gray-200">
        <div className="flex items-center mb-4">
          <img
            src="https://i.pravatar.cc/80"
            alt="profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <p className="text-lg font-semibold">@username</p>
            <p className="text-sm text-gray-500">0x12a4...bE90</p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Raffles Joined</span>
            <span className="font-medium">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Winnings</span>
            <span className="font-medium">{balance ?? "Loading..."} USDC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Win Rate</span>
            <span className="font-medium">25%</span>
          </div>
        </div>

        <button
          onClick={claimRewards}
          disabled={loading || claimed}
          className={`w-full mt-6 py-2 rounded-xl font-medium transition-all ${
            claimed
              ? "bg-gray-400 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {claimed
            ? "✅ Claimed"
            : loading
            ? "Processing..."
            : "💰 Claim Rewards"}
        </button>

        <button
          onClick={fetchPendingRewards}
          className="w-full mt-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all"
        >
          🔄 Refresh Balance
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
