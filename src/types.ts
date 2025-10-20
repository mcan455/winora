export type RaffleStatus = 'ACTIVE' | 'PAUSED' | 'ENDED'

export interface Raffle {
  id: string
  title: string            // "10 USDC Raffle"
  rewardSymbol: string     // "USDC"
  rewardAmount: string     // "10"
  participants: number     // 0..20
  participantsMax: number  // 20
  endsAt: number           // timestamp (ms)
  status: RaffleStatus
}

export interface Winner {
  address: string
  username?: string
  amount: string // "10 USDC"
  at: number     // timestamp
}
