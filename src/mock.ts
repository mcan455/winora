import { Raffle, Winner } from './types'

export const MOCK_RAFFLES: Raffle[] = [
  {
    id: 'raffle-1',
    title: '10 USDC Raffle',
    rewardSymbol: 'USDC',
    rewardAmount: '10',
    participants: 145, // örnek; UI için gösterim
    participantsMax: 1000,
    endsAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
    status: 'ACTIVE',
  },
  {
    id: 'raffle-2',
    title: '10 USDC Raffle',
    rewardSymbol: 'USDC',
    rewardAmount: '10',
    participants: 0,
    participantsMax: 20,
    endsAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    status: 'ACTIVE',
  },
  {
    id: 'raffle-3',
    title: '10 USDC Raffle',
    rewardSymbol: 'USDC',
    rewardAmount: '10',
    participants: 20,
    participantsMax: 20,
    endsAt: Date.now() + 60 * 60 * 1000, // 1s sonra başlayacak senaryo
    status: 'PAUSED', // (UI örneği)
  },
]

export const MOCK_WINNERS: Winner[] = [
  { address: '0x6e15...2aaf', username: 'kardanhalam', amount: '10 USDC', at: Date.now() - 86400000 },
  { address: '0x1234...abcd', username: 'alice', amount: '10 USDC', at: Date.now() - 172800000 },
]
