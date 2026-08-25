import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { AlertTriangle, Check, Copy, ExternalLink, Wallet } from 'lucide-react';
import {
  DONATION_ADDRESS,
  DONATION_CHAINS,
  explorerLink,
  isPlaceholderAddress,
} from '../lib/config';
import { nativeDeepLink, qrPayload } from '../lib/donation';
import { copyToClipboard } from '../lib/format';
import { Card } from './ui';

export default function DonationPanel() {
  const [chainIndex, setChainIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const chain = DONATION_CHAINS[chainIndex];

  const onCopy = async () => {
    const ok = await copyToClipboard(DONATION_ADDRESS);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="label-caps text-tawf-gold">Donation Wallet</span>
          <h3 className="mt-2 font-serif text-2xl text-tawf-green">
            Send directly to the Tawf × Telaga multisig
          </h3>
        </div>
        <Wallet className="h-8 w-8 shrink-0 text-tawf-gold" aria-hidden />
      </div>

      <p className="mt-3 text-tawf-muted">
        One shared multisig on every network. Funds go straight to the Tawf × Telaga Charity wallet
        — no intermediary, no custody. Choose a network, then copy the address, scan the QR, or open
        your wallet.
      </p>

      {/* Network tabs */}
      <div className="mt-6 grid grid-cols-3 gap-2" role="tablist" aria-label="Network">
        {DONATION_CHAINS.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={chainIndex === i}
            onClick={() => setChainIndex(i)}
            className={`rounded-full border px-3 py-2.5 text-sm font-medium transition-colors min-h-[44px] ${
              chainIndex === i
                ? 'border-tawf-green bg-tawf-green text-tawf-sand'
                : 'border-tawf-green/15 bg-white text-tawf-ink hover:border-tawf-green/40'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Address + QR */}
      <div className="mt-6 flex flex-col sm:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <span className="label-caps text-tawf-muted">Address · {chain.name}</span>
          <div className="mt-2 rounded-2xl border border-tawf-green/15 bg-tawf-sand/40 px-4 py-3">
            <p className="tnum break-all font-mono text-sm text-tawf-green">{DONATION_ADDRESS}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={onCopy}
              className="inline-flex items-center gap-2 rounded-full bg-tawf-green text-tawf-sand px-5 py-2.5 text-sm font-medium tracking-wider uppercase hover:bg-tawf-green-light transition-colors min-h-[44px]"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy address'}
            </button>
            <a
              href={nativeDeepLink(chain)}
              className="inline-flex items-center gap-2 rounded-full border border-tawf-green text-tawf-green px-5 py-2.5 text-sm font-medium tracking-wider uppercase hover:bg-tawf-green hover:text-tawf-sand transition-colors min-h-[44px]"
            >
              <Wallet className="h-4 w-4" />
              Open in wallet
            </a>
          </div>

          <p className="mt-4 text-sm text-tawf-muted">
            Native {chain.nativeSymbol}, or{' '}
            <span className="text-tawf-green font-medium">USDC</span> on {chain.name} (ERC-20).
          </p>
          <a
            href={explorerLink(chain, DONATION_ADDRESS)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-tawf-green hover:text-tawf-gold transition-colors"
          >
            View wallet on {chain.name} explorer
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-2">
          <div className="rounded-2xl border border-tawf-green/15 bg-white p-3">
            <QRCodeSVG
              value={qrPayload(chain)}
              size={148}
              fgColor="#0F3D30"
              bgColor="#ffffff"
              level="M"
              aria-label={`QR code for the Tawf × Telaga Charity multisig address (${chain.name})`}
            />
          </div>
          <p className="text-xs text-tawf-muted text-center max-w-[160px]">
            Scan with any wallet. Check the network before you send.
          </p>
        </div>
      </div>

      {isPlaceholderAddress && (
        <div
          className="mt-6 flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
          role="alert"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            <strong>Placeholder address in use.</strong> A sentinel address is configured instead of
            the Tawf × Telaga Charity multisig. Do not send funds to this address.
          </span>
        </div>
      )}
    </Card>
  );
}
