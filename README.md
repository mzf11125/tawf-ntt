<div align="center">

# Tawf × Telaga Charity — NTT Emergency Relief

*Stand with East Nusa Tenggara. Send crypto, directly.*

A single-page crypto donation site for flood and cyclone relief in NTT (Nusa
Tenggara Timur), run as a joint initiative of **Tawf Islamic Foundation** and
**Telaga Charity**, built to the Tawf Islamic Foundation design guideline.

**ntt.tawf.foundation**

</div>

---

## What it does

- Shows the NTT disaster-relief case and where funds go (shelter, clean water, food).
- Lets donors **send crypto directly to the shared Tawf × Telaga Charity multisig** — no custody, no intermediary.
- Supports **Polygon**, **Base**, and **Arbitrum**, in native token or USDC.
- Two ways to give:
  1. **Manual** — copy the address, scan the QR, or open your wallet via deep-link.
  2. **Connect &amp; send** — sign the transfer yourself with RainbowKit/wagmi.

## The partnership

Tawf Islamic Foundation and Telaga Charity run this relief effort together
through a single on-chain **multisig**:

```
0x0677C3ad6Df3A157Dce8f16b0Ef26a0EC753598C
```

Funds are signed and released jointly, so neither foundation can move the
wallet alone. Every disbursement is recorded on-chain and verifiable via any
block explorer.

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

The donation address **defaults to the Tawf × Telaga Charity multisig** and
needs no setup. Copy `.env.example` to `.env` only if you need to change it:

| Variable | Purpose |
|----------|---------|
| `VITE_DONATION_ADDRESS` | Optional override for the wallet address (0x…) used on every network. Defaults to the joint multisig in [`src/lib/config.ts`](src/lib/config.ts). |
| `VITE_WC_PROJECT_ID` | WalletConnect project id for RainbowKit. Optional — without it, only injected wallets are offered. |

The supported networks and their canonical USDC contracts also live in
[`src/lib/config.ts`](src/lib/config.ts).

## Deploy to Vercel

1. Connect this repo to Vercel (framework preset: **Vite**).
2. (Optional) Add `VITE_WC_PROJECT_ID` for WalletConnect support.
3. Set the domain to `ntt.tawf.foundation`.

The `vercel.json` SPA rewrite is already included.

## License

Apache 2.0 — see [LICENSE](LICENSE).
