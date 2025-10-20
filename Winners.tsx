import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract";

export default function Winners() {
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWinners() {
      try {
        const client = createPublicClient({
          chain: baseSepolia, // testnet
          transport: http(),
        });

        const data = await client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "getPastWinners",
        });

        // Eğer kontrat sonuçları {username, wallet, amount} dönerse
        setWinners(
          data.map((w: any) => ({
            username: w.username,
            wallet: w.wallet,
            amount: Number(w.amount) / 1e6, // USDC 6 decimals
          }))
        );
      } catch (err) {
        console.error("Error fetching winners:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWinners();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 text-gray-900 flex flex-col items-center p-6 font-sans tracking-tight">
      <h1 className="text-3xl font-bold mb-6">Winners</h1>

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
                <p className="font-medium text-gray-800">{w.username}</p>
                <p className="text-xs text-gray-500">{w.wallet}</p>
              </div>
              <span className="text-indigo-600 font-semibold">
                {w.amount} USDC
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        Winners are fetched directly from the blockchain.
      </p>

      <BottomNav />
    </div>
  );
}

