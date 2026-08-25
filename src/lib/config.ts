import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { arbitrum, base, polygon } from 'wagmi/chains';

/**
 * The joint Tawf × Telaga Charity multisig. Every supported network sends to
 * this same address. It can be overridden at build time with
 * `VITE_DONATION_ADDRESS` if the wallet ever needs to change.
 */
export const TELAGA_MULTISIG = '0x0677C3ad6Df3A157Dce8f16b0Ef26a0EC753598C';

/** Kept as a sentinel: the UI refuses to send while this value is in use. */
export const PLACEHOLDER_ADDRESS = '0x000000000000000000000000000000000000dEaD';

export const DONATION_ADDRESS = (
  (import.meta.env.VITE_DONATION_ADDRESS as string | undefined)?.trim() ||
  TELAGA_MULTISIG
) as `0x${string}`;

/** True while the address is the placeholder sentinel — never send funds to it. */
export const isPlaceholderAddress =
  DONATION_ADDRESS.toLowerCase() === PLACEHOLDER_ADDRESS.toLowerCase();

/** Co-branding partner information. */
export const PARTNER = {
  name: 'Telaga Charity',
  logo: '/images/telaga-logo.png',
} as const;

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
  appName: 'Tawf × Telaga Charity NTT Relief',
  projectId: import.meta.env.VITE_WC_PROJECT_ID ?? 'ntt_relief_local',
  chains: [polygon, base, arbitrum],
  transports: {
    [polygon.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
  },
  ssr: false,
});
