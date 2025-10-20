import { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";

interface RaffleCardProps {
  title: string;
  reward: string;
  participants: number;
  maxParticipants: number;
  status: "active" | "passive";
  endTime: string; // ISO format
  winnerName?: string; // Kazanan ismi
}

function RaffleCard({
  title,
  reward,
  participants,
  maxParticipants,
  status: initialStatus,
  endTime,
  winnerName,
}: RaffleCardProps) {
  const [joined, setJoined] = useState(false);
  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [status, setStatus] = useState(initialStatus);
  const [ended, setEnded] = useState(false);

  // Timer - sadece gün bazlı
  useEffect(() => {
    const updateDays = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setRemainingDays(0);
        setStatus("passive");
        setEnded(true);
      } else {
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        setRemainingDays(days);
      }
    };

    updateDays();
    const interval = setInterval(updateDays, 60 * 60 * 1000); // 1 saatte bir
    return () => clearInterval(interval);
  }, [endTime]);

  const handleJoin = () => {
    if (status === "active" && !joined) {
      setJoined(true);
    }
  };

  const isDisabled = status === "passive" || joined;

  return (
    <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-5 mb-5 transition-transform hover:scale-[1.01] border border-gray-200">
      {/* Başlık ve durum */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-lg ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status === "active" ? "ACTIVE" : "ENDED"}
        </span>
      </div>

      {/* Ödül & katılımcı bilgisi */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <img
            src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029"
            alt="USDC"
            className="w-5 h-5"
          />
          <span className="font-medium text-gray-800">
            {reward} USDC Raffle
          </span>
        </div>
        <span className="text-gray-600 text-sm">
          {participants}/{maxParticipants} joined
        </span>
      </div>

      {/* Geri sayım veya kazanan */}
      {!ended ? (
        <p className="text-sm text-gray-500 mb-4">
          Ends in {remainingDays} {remainingDays === 1 ? "day" : "days"}
        </p>
      ) : (
        <div className="text-center mb-4">
          <p className="text-base font-semibold text-gray-800 mb-1">
            The raffle has ended!
          </p>
          {winnerName && (
            <>
              <p className="text-indigo-700 font-medium text-lg">{winnerName}</p>
              <p className="text-sm text-gray-500 mt-1">Congratulations 🎉</p>
            </>
          )}
        </div>
      )}

      {/* Katılım butonu */}
      {!ended && (
        <button
          onClick={handleJoin}
          disabled={isDisabled}
          className={`w-full py-2 rounded-xl text-white font-medium transition-all ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {joined ? "Joined ✅" : status === "active" ? "Enter Raffle" : "Closed"}
        </button>
      )}
    </div>
  );
}

// 🔹 Ana Sayfa (Raffles listesi)
export default function Raffles() {
  const raffles = [
    {
      title: "10 USDC Raffle",
      reward: "10",
      participants: 15,
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
      winnerName: "@alexmartin",
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
    <div className="min-h-screen bg-neutral-100 text-gray-900 flex flex-col items-center p-6 font-sans tracking-tight pb-20">
      <h1 className="text-3xl font-bold mb-6">Active Raffles</h1>
      {raffles.map((r, i) => (
        <RaffleCard
  key={i}
  title={r.title}
  reward={r.reward}
  participants={r.participants}
  maxParticipants={r.maxParticipants}
  status={r.status as "active" | "passive"}
  endTime={r.endTime}
  winnerName={r.winnerName}
/>
      ))}
      <BottomNav />
    </div>
  );
}
