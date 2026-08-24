<div align="center">

# Tawf NTT Emergency Relief

*Stand with East Nusa Tenggara. Send crypto, directly.*

A single-page crypto donation site for flood and cyclone relief in NTT (Nusa
Tenggara Timur), built to the Tawf Islamic Foundation design guideline.

**ntt.tawf.foundation**

</div>

---

## What it does

- Shows the NTT disaster-relief case and where funds go (shelter, clean water, food).
- Lets donors **send crypto directly to the relief wallet address** — no custody, no intermediary.
- Supports **Polygon**, **Base**, and **Arbitrum**, in native token or USDC.
- Two ways to give:
  1. **Manual** — copy the address, scan the QR, or open your wallet via deep-link.
  2. **Connect &amp; send** — sign the transfer yourself with RainbowKit/wagmi.

## Stack

React 19 · TypeScript · Vite 6 · Tailwind CSS v4 · Motion · lucide-react ·
wagmi/viem · RainbowKit · qrcode.react. Fonts self-hosted via `@fontsource`.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # type-check + production build
npm run lint    # type-check only
```

## Configuration

Copy `.env.example` to `.env` and set:

| Variable | Purpose |
|----------|---------|
| `VITE_DONATION_ADDRESS` | The single relief wallet address (0x…) used on every network. **Required before going live.** |
| `VITE_WC_PROJECT_ID` | WalletConnect project id for RainbowKit. Optional — without it, only injected wallets are offered. |

The address is a **placeholder by default** and the UI refuses to send to it.
Set `VITE_DONATION_ADDRESS` to your real wallet before deployment.

The supported networks and their canonical USDC contracts live in
[`src/lib/config.ts`](src/lib/config.ts).

## Deploy to Vercel

1. Connect this repo to Vercel (framework preset: **Vite**).
2. Add environment variables `VITE_DONATION_ADDRESS` (and optionally
   `VITE_WC_PROJECT_ID`).
3. Set the domain to `ntt.tawf.foundation`.

The `vercel.json` SPA rewrite is already included.

## License

Apache 2.0 — see [LICENSE](LICENSE).
