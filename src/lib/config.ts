import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { arbitrum, base, polygon } from 'wagmi/chains';

/**
 * The single donation wallet address. Every supported network sends to this
 * same address. It is intentionally a placeholder until a real address is set
 * via `VITE_DONATION_ADDRESS`; the UI refuses to let anyone send to it while
 * it still matches the placeholder.
 */
export const PLACEHOLDER_ADDRESS = '0x000000000000000000000000000000000000dEaD';

export const DONATION_ADDRESS = (
  (import.meta.env.VITE_DONATION_ADDRESS as string | undefined)?.trim() ||
  PLACEHOLDER_ADDRESS
) as `0x${string}`;

/** True while the address is still the placeholder — never send funds to it. */
export const isPlaceholderAddress =
  DONATION_ADDRESS.toLowerCase() === PLACEHOLDER_ADDRESS.toLowerCase();

export interface DonationChain {
  id: number;
  name: string;
  nativeSymbol: string;
  nativeDecimals: number;
  explorer: string;
  /** Canonical native USDC contract on this chain (6 decimals). */
  usdc: `0x${string}`;
}

export const DONATION_CHAINS: DonationChain[] = [
  {
    id: polygon.id,
    name: 'Polygon',
    nativeSymbol: 'POL',
    nativeDecimals: 18,
    explorer: 'https://polygonscan.com',
    usdc: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
  },
  {
    id: base.id,
    name: 'Base',
    nativeSymbol: 'ETH',
    nativeDecimals: 18,
    explorer: 'https://basescan.org',
    usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
  {
    id: arbitrum.id,
    name: 'Arbitrum',
    nativeSymbol: 'ETH',
    nativeDecimals: 18,
    explorer: 'https://arbiscan.io',
    usdc: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  },
];

export const explorerLink = (chain: DonationChain, addr: string) =>
  `${chain.explorer}/address/${addr}`;

/**
 * RainbowKit + wagmi config. WalletConnect needs a project id; without one only
 * injected wallets are offered, which is a perfectly usable fallback rather
 * than a hard failure.
 */
export const wagmiConfig = getDefaultConfig({
  appName: 'Tawf NTT Emergency Relief',
  projectId: import.meta.env.VITE_WC_PROJECT_ID ?? 'ntt_relief_local',
  chains: [polygon, base, arbitrum],
  transports: {
    [polygon.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
  },
  ssr: false,
});
