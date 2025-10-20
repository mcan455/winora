import BottomNav from "../components/BottomNav";

export default function Profile() {
  return (
    <div className="min-h-screen bg-neutral-100 text-gray-900 flex flex-col items-center p-6 font-sans tracking-tight">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md border border-gray-200">
        <div className="flex items-center mb-4">
          <img
            src="https://i.pravatar.cc/80"
            alt="Profile"
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
            <span className="font-medium">20 USDC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Win Rate</span>
            <span className="font-medium">25%</span>
          </div>
        </div>

        <button className="w-full mt-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all">
          Claim Rewards
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
