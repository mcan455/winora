import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import BottomNav from "../components/BottomNav";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract";

export default function Winners() {
  const [winners, setWinners] = useState<{ address: string; amount: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function getContract() {
    if (!window.ethereum) throw new Error("Wallet not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer);
  }

  async function fetchWinners() {
    try {
      setLoading(true);
      const contract = await getContract();

      // kontratta bir "getWinners()" fonksiyonu olduğunu varsayıyoruz
      const data = await contract.getWinners(); // [{winner, amount}, ...]
      const formatted = data.map((w: any) => ({
        address: w.winner,
        amount: ethers.formatUnits(w.amount, 6), // USDC genelde 6 decimal
      }));

      setWinners(formatted);
    } catch (err) {
      console.error("Error fetching winners:", err);
      alert("❌ Could not fetch winners.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWinners();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 text-gray-900 flex flex-col items-center p-6 font-sans tracking-tight pb-20">
      <h1 className="text-3xl font-bold mb-6">🎉 Winners</h1>

      {loading ? (
        <p className="text-gray-500">Loading winners...</p>
      ) : winners.length === 0 ? (
        <p className="text-gray-500">No winners yet.</p>
      ) : (
        <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md border border-gray-200">
          {winners.map((w, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-none"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {w.address.slice(0, 6)}...{w.address.slice(-4)}
                </p>
              </div>
              <span className="text-indigo-600 font-semibold">
                {w.amount} USDC
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={fetchWinners}
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition-all"
      >
        🔄 Refresh
      </button>

      <BottomNav />
    </div>
  );
}
