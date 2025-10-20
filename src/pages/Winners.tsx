import BottomNav from "../components/BottomNav";

export default function Winners() {
  const winners = [
    { username: "@alexmartin", wallet: "0x2f9A...E94b", amount: 50 },
    { username: "@sofia_l", wallet: "0x1b7D...F21a", amount: 20 },
    { username: "@nate_ross", wallet: "0x9c12...D3a5", amount: 10 },
    { username: "@winora_user", wallet: "0x42De...Bb9c", amount: 5 },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 text-gray-900 flex flex-col items-center p-6 font-sans tracking-tight">
      <h1 className="text-3xl font-bold mb-6">Winners</h1>

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
            <span className="text-indigo-600 font-semibold">{w.amount} USDC</span>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Winners are listed from highest to lowest rewards.
      </p>

      <BottomNav />
    </div>
  );
}

