import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ethers } from "ethers"

// 🧠 Kontrat ABI ve adresini buraya koy
import raffleABI from "@/config/raffleABI.json"

const CONTRACT_ADDRESS = "0x1234567890abcdef..." // güncel adresle değiştir

export default function RafflePage() {
  const [winners, setWinners] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showBoard, setShowBoard] = useState(false)

  const getWinners = async () => {
    try {
      setLoading(true)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const contract = new ethers.Contract(CONTRACT_ADDRESS, raffleABI, provider)
      const data = await contract.getWinners() // kontrattaki fonksiyon
      // örnek: data = [["0xabc", 5], ["0xdef", 3]]
      const formatted = data.map(([address, wins]: [string, number]) => ({
        address,
        wins: Number(wins),
      }))
      // azdan çoğa sıralama:
      formatted.sort((a, b) => b.wins - a.wins)
      setWinners(formatted)
      setShowBoard(true)
    } catch (err) {
      console.error("Error fetching winners:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Raffles</h1>
        <Button onClick={getWinners} disabled={loading}>
          {loading ? "Loading..." : "Winners 🏆"}
        </Button>
      </div>

      {showBoard && (
        <Card className="mt-4 shadow-lg">
          <CardHeader>
            <h2 className="text-lg font-semibold">Leaderboard</h2>
          </CardHeader>
          <CardContent>
            {winners.length === 0 ? (
              <p>No winners yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {winners.map((w, i) => (
                  <li key={i} className="py-2 flex justify-between">
                    <span className="font-mono text-sm">{w.address.slice(0, 6)}...{w.address.slice(-4)}</span>
                    <span className="font-semibold">{w.wins} wins</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
