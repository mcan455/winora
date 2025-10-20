// api/frame.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const baseUrl = "https://winora-ivory.vercel.app" // kendi domainin
  res.setHeader("Content-Type", "text/html")
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="og:title" content="Winora Raffles 🏆" />
        <meta property="og:description" content="Katıl, kazan, liderlik tablosunda yerini al!" />
        <meta property="og:image" content="${baseUrl}/og-image.png" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/frame-preview.png" />
        <meta property="fc:frame:button:1" content="🎟️ Enter Raffle" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:post_url" content="${baseUrl}/api/raffle-entry" />
      </head>
      <body></body>
    </html>
  `)
}

