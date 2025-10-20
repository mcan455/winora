interface RaffleCardProps {
  title: string;
  reward: string;
  participants: number;
  maxParticipants: number;
  status: "active" | "passive" | string; // Hata düzeltildi
  endTime: string;
  winnerName?: string;
}

export default function RaffleCard({
  title,
  reward,
  participants,
  maxParticipants,
  status,
  endTime,
  winnerName,
}: RaffleCardProps) {
  const isActive = status === "active";

  return (
    <div
      className={`rounded-2xl shadow-md p-4 mb-4 bg-white border ${
        isActive ? "border-green-500" : "border-red-400"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span
          className={`text-sm font-medium ${
            isActive ? "text-green-600" : "text-red-500"
          }`}
        >
          {isActive ? "Active" : "Ended"}
        </span>
      </div>

      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-600 text-sm">Reward</span>
        <span className="font-medium">{reward}</span>
      </div>

      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-600 text-sm">Participants</span>
        <span className="font-medium">
          {participants}/{maxParticipants}
        </span>
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-600 text-sm">Ends in</span>
        <span className="font-medium">{endTime}</span>
      </div>

      {!isActive && winnerName && (
        <div className="text-center mt-2">
          <p className="text-gray-700 text-sm">
            <strong>{winnerName}</strong>
          </p>
          <p className="text-green-600 font-semibold text-sm">
            🎉 Congratulations!
          </p>
        </div>
      )}
    </div>
  );
}

