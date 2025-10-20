import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(), // istersen Alchemy/Infura RPC koy
  },
})

