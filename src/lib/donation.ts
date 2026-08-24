import { DONATION_ADDRESS, type DonationChain } from './config';

/**
 * EIP-681 URI that opens a wallet pre-filled with the recipient and chain for a
 * native-token send. Widely supported by EVM wallets.
 */
export function nativeDeepLink(chain: DonationChain): string {
  return `ethereum:${DONATION_ADDRESS}@${chain.id}`;
}

/**
 * The value encoded in the QR code. A plain address is the most compatible
 * payload — wallets can scan it and then pick the asset/network themselves.
 */
export function qrPayload(_chain: DonationChain): string {
  return DONATION_ADDRESS;
}
