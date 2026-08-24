import { useMemo, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { erc20Abi, parseEther, parseUnits } from 'viem';
import { useAccount, useBalance, useChainId, useReadContract, useSendTransaction, useSwitchChain, useWriteContract } from 'wagmi';
import { AlertTriangle, CheckCircle2, Coins, Info } from 'lucide-react';
import { DONATION_ADDRESS, DONATION_CHAINS, isPlaceholderAddress } from '../lib/config';
import { Button, Card } from './ui';

type Asset = 'native' | 'usdc';

export default function SendCard() {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const [chainIndex, setChainIndex] = useState(0);
  const [asset, setAsset] = useState<Asset>('native');
  const [amountInput, setAmountInput] = useState('');
  const chain = DONATION_CHAINS[chainIndex];

  const wrongNetwork = isConnected && chainId !== chain.id;

  // Amount as a fixed-point integer (wei / base units) for the chosen asset.
  const amount = useMemo(() => {
    if (!amountInput || Number.isNaN(Number(amountInput)) || Number(amountInput) <= 0) return 0n;
    try {
      return asset === 'native'
        ? parseEther(amountInput)
        : parseUnits(amountInput, 6);
    } catch {
      return 0n;
    }
  }, [amountInput, asset]);

  const nativeBalance = useBalance({
    address,
    chainId: chain.id,
  });

  const usdcBalance = useReadContract({
    address: chain.usdc,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: chain.id,
    query: { enabled: !!address && asset === 'usdc' },
  });

  const balance = asset === 'native' ? nativeBalance.data?.value ?? 0n : (usdcBalance.data as bigint | undefined) ?? 0n;
  const insufficient = amount > 0n && balance < amount;

  const sendNative = useSendTransaction();
  const sendUsdc = useWriteContract();
  const busy = asset === 'native' ? sendNative.isPending : sendUsdc.isPending;
  const txHash = asset === 'native' ? sendNative.data : sendUsdc.data;

  const onSubmit = () => {
    if (amount === 0n || insufficient || isPlaceholderAddress) return;
    if (asset === 'native') {
      sendNative.sendTransaction({ to: DONATION_ADDRESS, value: amount });
    } else {
      sendUsdc.writeContract({
        address: chain.usdc,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [DONATION_ADDRESS, amount],
      });
    }
  };

  const canSend = isConnected && !wrongNetwork && amount > 0n && !insufficient && !isPlaceholderAddress && !busy;

  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="label-caps text-tawf-gold">Connect &amp; Send</span>
          <h3 className="mt-2 font-serif text-2xl text-tawf-green">Sign the transfer yourself</h3>
        </div>
        <Coins className="h-8 w-8 shrink-0 text-tawf-gold" aria-hidden />
      </div>

      <p className="mt-3 text-tawf-muted">
        Connect your wallet and sign a direct transfer to the relief wallet. You keep custody the
        whole time — the page never touches your funds.
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

      {/* Asset toggle */}
      <div className="mt-6">
        <span className="label-caps text-tawf-muted">Asset</span>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => setAsset('native')}
            aria-pressed={asset === 'native'}
            className={`rounded-2xl border px-4 py-3 text-left transition-colors min-h-[44px] ${
              asset === 'native'
                ? 'border-tawf-green bg-tawf-green text-tawf-sand'
                : 'border-tawf-green/15 bg-white text-tawf-ink hover:border-tawf-green/40'
            }`}
          >
            <span className="block text-sm font-medium">{chain.nativeSymbol}</span>
            <span className={`block text-xs ${asset === 'native' ? 'text-tawf-sand/70' : 'text-tawf-muted'}`}>
              Native token
            </span>
          </button>
          <button
            onClick={() => setAsset('usdc')}
            aria-pressed={asset === 'usdc'}
            className={`rounded-2xl border px-4 py-3 text-left transition-colors min-h-[44px] ${
              asset === 'usdc'
                ? 'border-tawf-green bg-tawf-green text-tawf-sand'
                : 'border-tawf-green/15 bg-white text-tawf-ink hover:border-tawf-green/40'
            }`}
          >
            <span className="block text-sm font-medium">USDC</span>
            <span className={`block text-xs ${asset === 'usdc' ? 'text-tawf-sand/70' : 'text-tawf-muted'}`}>
              ERC-20 on {chain.name}
            </span>
          </button>
        </div>
      </div>

      {/* Amount */}
      <div className="mt-6">
        <label htmlFor="send-amount" className="label-caps text-tawf-muted">
          Amount ({asset === 'native' ? chain.nativeSymbol : 'USDC'})
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-tawf-green/15 bg-tawf-sand/40 px-4 py-3">
          <input
            id="send-amount"
            inputMode="decimal"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            placeholder="0.00"
            className="tnum w-full bg-transparent text-xl outline-none"
            disabled={!isConnected}
          />
        </div>
        {isConnected && (
          <p className="mt-2 text-sm text-tawf-muted">
            Balance:{' '}
            <span className="tnum">
              {asset === 'native'
                ? `${(nativeBalance.data ? Number(nativeBalance.data.formatted) : 0).toFixed(4)} ${chain.nativeSymbol}`
                : `${usdcBalance.data ? Number((usdcBalance.data as bigint)) / 1e6 : 0} USDC`}
            </span>
          </p>
        )}
      </div>

      {/* Action */}
      <div className="mt-6 space-y-3">
        {!isConnected ? (
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <Button onClick={openConnectModal} className="w-full">
                Connect Wallet
              </Button>
            )}
          </ConnectButton.Custom>
        ) : wrongNetwork ? (
          <Button
            onClick={() => switchChain({ chainId: chain.id })}
            className="w-full"
            disabled={isSwitching}
          >
            {isSwitching ? 'Switching…' : `Switch to ${chain.name}`}
          </Button>
        ) : (
          <Button onClick={onSubmit} className="w-full" disabled={!canSend}>
            {busy ? 'Sending…' : `Send ${amountInput || '0'} ${asset === 'native' ? chain.nativeSymbol : 'USDC'}`}
          </Button>
        )}
      </div>

      {insufficient && isConnected && !wrongNetwork && (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>Insufficient {asset === 'native' ? chain.nativeSymbol : 'USDC'} balance for this amount.</span>
        </div>
      )}

      {isPlaceholderAddress && (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900" role="alert">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>Sending is disabled until a real relief wallet address is configured.</span>
        </div>
      )}

      {txHash && (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-tawf-green/20 bg-tawf-sand/60 p-4 text-sm text-tawf-green" role="status">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            Transaction submitted:{' '}
            <a
              href={`${chain.explorer}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono underline break-all"
            >
              {txHash.slice(0, 18)}…
            </a>
          </span>
        </div>
      )}

      <p className="mt-6 border-t border-tawf-green/10 pt-4 text-xs text-tawf-muted">
        The amount, your wallet address, and the recipient are publicly recorded on the blockchain.
        This is not a private transaction.
      </p>
    </Card>
  );
}
