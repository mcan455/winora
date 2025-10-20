import BottomNav from "../components/BottomNav";

export default function Raffles() {
  const raffles = [
    {
      title: "10 USDC Raffle",
      reward: "10",
      participants: 12,
      maxParticipants: 20,
      status: "active",
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 gün sonra
    },
    {
      title: "50 USDC Raffle",
      reward: "50",
      participants: 20,
      maxParticipants: 20,
      status: "passive",
      endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // bitmiş
    },
    {
      title: "100 USDC Super Raffle",
      reward: "100",
      participants: 5,
      maxParticipants: 20,
      status: "active",
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 gün sonra
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 text-gray-900 flex flex-col items-center p-6 font-sans tracking-tight">
      <h1 className="text-3xl font-bold mb-6">Active Raffles</h1>
      {raffles.map((r, i) => (
        <RaffleCard key={i} {...r} />
      ))}
    </div>
  );
}
<BottomNav />
