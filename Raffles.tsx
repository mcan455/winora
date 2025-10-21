import React, { useState } from "react";
import { ethers } from "ethers";
import BottomNav from "../components/BottomNav";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract";

export default function Raffles() {
  const [loading, setLoading] = useState(false);

  const raffles = [
    {
      id: 1,
      title: "10 USDC Raffle",
      reward: "10",
      participants: 12,
      maxParticipants: 20,
      status: "active",
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      title: "50 USDC Raffle",
      reward: "50",
      participants: 20,
      maxParticipants: 20,
      status: "passive",
      endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      title: "100 USDC Super Raffle",
      reward: "100",
      participants: 5,
      maxParticipants: 20,
      status: "active",
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  async function getContract() {
    if (!window.ethereum) {
      alert("Please connect your wallet first!");
      throw new Error("Wallet not found");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);
  }

  async function joinRaffle(raffleId: number) {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.joinRaffle(raffleId);
      await tx.wait();
      alert(`🎟️ Successfully joined raffle #${raffleId}!`);
    } catch (error) {
      console.error(error);
      alert("❌ Transaction failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-gray-900 flex flex-col items-center p-6 font-sans tracking-tight pb-20">
      <h1 className="text-3xl font-bold mb-6">Active Raffles</h1>

      {raffles.map((r) => (
        <div
          key={r.id}
          className="bg-white w-full max-w-md rounded-2xl shadow-md p-5 mb-5 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">{r.title}</h2>
            <span
              className={`text-sm font-medium px-2 py-1 rounded-lg ${
                r.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {r.status.toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Reward:</span>
            <span>{r.reward} USDC</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Participants:</span>
            <span>
              {r.participants}/{r.maxParticipants}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Ends:</span>
            <span>{new Date(r.endTime).toLocaleString()}</span>
          </div>

          {r.status === "active" ? (
            <button
              onClick={() => joinRaffle(r.id)}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-xl transition-all"
            >
              {loading ? "Processing..." : "🎟️ Join Raffle"}
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-400 text-white font-medium py-2 rounded-xl"
            >
              Closed
            </button>
          )}
        </div>
      ))}

      <BottomNav />
    </div>
  );
}
