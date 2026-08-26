import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowDown,
  Droplets,
  Home,
  UtensilsCrossed,
  ShieldCheck,
  ExternalLink,
  HeartHandshake,
} from 'lucide-react';
import { DONATION_ADDRESS, isPlaceholderAddress, PARTNER } from '../../lib/config';
import { Section, SectionHeader, Card, Badge } from '../ui';
import DonationPanel from '../DonationPanel';
import SendCard from '../SendCard';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const RELIEF_AREAS = [
  {
    icon: <Home className="w-8 h-8 text-tawf-gold" />,
    title: 'Emergency shelter',
    desc: 'Tarpaulins, blankets, and temporary housing repair for families whose homes were damaged by floodwater and wind.',
  },
  {
    icon: <Droplets className="w-8 h-8 text-tawf-gold" />,
    title: 'Clean water',
    desc: 'Safe drinking water and purification supplies for communities cut off from damaged wells and pipelines.',
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8 text-tawf-gold" />,
    title: 'Food & essentials',
    desc: 'Rice, staples, and hygiene kits delivered to the villages most affected by the flooding and cyclones.',
  },
];

const FAQS = [
  {
    q: 'Where does my crypto go?',
    a: 'Directly to the Tawf × Telaga Charity multisig address shown on this page. There is no intermediary and no custody. The transfer is signed by your wallet and recorded on-chain, where anyone can verify it.',
  },
  {
    q: 'Who runs this relief fund?',
    a: 'Tawf Islamic Foundation and Telaga Charity run it together through a shared multisig. Funds are signed and released jointly, so neither foundation can move the wallet alone.',
  },
  {
    q: 'Which networks can I donate on?',
    a: 'Polygon, Base, and Arbitrum. Each accepts its native token (POL or ETH) and USDC. Use the network you hold funds on to minimise fees.',
  },
  {
    q: 'Why are there gas fees?',
    a: 'Gas is paid to the network, not to Tawf or Telaga Charity. On Polygon, Base, and Arbitrum these fees are small (typically a fraction of a dollar), and 100% of the amount you send reaches the multisig.',
  },
  {
    q: 'How can I verify my donation?',
    a: 'Every transfer is public. Use the explorer link on the donation card to view the wallet and confirm your transaction arrived.',
  },
  {
    q: 'Is this a Sharia-aligned donation?',
    a: 'This is a voluntary sadaqah-style emergency relief fund. Funds are used exclusively for disaster relief for affected families.',
  },
];

export default function Landing() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 relative overflow-hidden flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none flex items-center justify-center">
          <div className="w-[90vw] max-w-[600px] h-[90vw] max-h-[600px] border border-tawf-green rounded-full absolute"></div>
          <div className="w-[120vw] max-w-[900px] h-[120vw] max-h-[900px] border border-tawf-green rounded-full absolute"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-tawf-gold"></div>
              <span className="label-caps text-tawf-gold">Emergency Relief · East Nusa Tenggara</span>
              <div className="h-px w-12 bg-tawf-gold"></div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-[1.05] tracking-tight text-tawf-green mb-8">
              Stand with NTT.<br />
              <span className="italic text-tawf-gold">Send crypto, directly.</span>
            </h1>

            <p className="text-xl text-tawf-muted font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              Floods and cyclones have torn through East Nusa Tenggara. Your crypto reaches the
              Tawf × Telaga Charity multisig on-chain, traceable, transparent, and straight to the
              families who need it.
            </p>

            <div className="flex flex-col items-center gap-3 mb-10">
              <span className="label-caps text-tawf-muted">A Tawf × Telaga Charity initiative</span>
              <div className="flex items-center gap-4">
                <img
                  src="/images/tawftransparent.png"
                  alt="Tawf Islamic Foundation"
                  className="h-12 w-auto invert"
                />
                <span className="font-serif italic text-2xl text-tawf-gold">×</span>
                <img src={PARTNER.logo} alt={PARTNER.name} className="h-6 w-auto invert" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollTo('donate')}
                className="bg-tawf-green text-tawf-sand px-8 py-4 rounded-full text-base font-medium tracking-widest uppercase hover:bg-tawf-green-light transition-colors inline-flex items-center justify-center gap-2"
              >
                Donate Crypto
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTo('case')}
                className="bg-transparent border border-tawf-green text-tawf-green px-8 py-4 rounded-full text-base font-medium tracking-widest uppercase hover:bg-tawf-green/5 transition-colors inline-flex items-center justify-center gap-2"
              >
                See the impact
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Case */}
      <Section id="case" background="white" className="border-y border-tawf-green/10">
        <SectionHeader
          badge="The Case"
          title="When the waters rise in the east"
          description="Nusa Tenggara Timur sits in the path of the region's fiercest cyclones. Repeated floods displace families, destroy homes, and cut off clean water, and recovery is slowest in the villages with the least."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RELIEF_AREAS.map((item, idx) => (
            <motion.div
              key={item.title}
              {...reveal}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 border border-tawf-green/10 bg-tawf-sand/30 rounded-2xl"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-5 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif font-medium text-tawf-green mb-3">{item.title}</h3>
              <p className="text-tawf-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Badge>100% to the field</Badge>
          <Badge>On-chain traceability</Badge>
          <Badge>No custody</Badge>
          <Badge>Voluntary sadaqah</Badge>
        </div>
      </Section>

      {/* Partnership */}
      <Section id="partnership" background="sand" className="border-t border-tawf-green/10">
        <SectionHeader
          centered
          badge="Partnership"
          title="Two foundations, one wallet"
          description="Tawf Islamic Foundation and Telaga Charity have joined forces to run the NTT emergency relief as a single, transparent effort, governed together through a shared multisig."
        />

        <motion.div
          {...reveal}
          className="flex flex-col items-center gap-8 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <img
              src="/images/tawftransparent.png"
              alt="Tawf Islamic Foundation"
              className="h-16 w-auto invert"
            />
            <span className="font-serif italic text-3xl text-tawf-gold">×</span>
            <img src={PARTNER.logo} alt={PARTNER.name} className="h-7 w-auto invert" />
          </div>

          <div className="max-w-2xl">
            <p className="label-caps text-tawf-muted mb-4">Shared multisig</p>
            <p className="font-mono tnum text-sm text-tawf-green break-all">{DONATION_ADDRESS}</p>
            <p className="mt-6 text-tawf-muted leading-relaxed">
              Funds are held and released jointly by both foundations, so no single party can move
              the wallet alone. Every disbursement is signed collectively and recorded on-chain,
              where anyone can follow it.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Transparency */}
      <Section id="transparency" background="ink">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-tawf-gold"></div>
              <span className="label-caps text-tawf-gold">Transparency</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Not as promises. <span className="italic text-tawf-gold">As on-chain reality.</span>
            </h2>
            <p className="text-tawf-sand/70 text-xl leading-relaxed mb-6">
              You don't have to take our word for where the funds go. You send straight to a public
              wallet address, and every satoshi of the journey is visible on the blockchain.
            </p>
            <ul className="space-y-4 text-tawf-sand/80">
              {[
                'Direct transfer: you sign, the wallet receives',
                'Public address anyone can audit on a block explorer',
                'No middleman holding funds on your behalf',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-tawf-gold shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="bg-white/5 border-white/10">
            <span className="label-caps text-tawf-gold">Tawf × Telaga Charity Multisig</span>
            <p className="mt-4 font-mono tnum text-sm text-white break-all">{DONATION_ADDRESS}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>Polygon</Badge>
              <Badge>Base</Badge>
              <Badge>Arbitrum</Badge>
            </div>
            <p className="mt-6 text-sm text-tawf-sand/60">
              One joint wallet, three networks. The same address receives native tokens and USDC,
              held and signed collectively by both foundations.
              {isPlaceholderAddress && (
                <span className="block mt-2 text-amber-300">
                  Placeholder address in use. Do not send funds.
                </span>
              )}
            </p>
          </Card>
        </div>
      </Section>

      {/* Donate */}
      <Section id="donate" background="sand">
        <SectionHeader
          badge="Donate"
          title="Send crypto to the Tawf × Telaga multisig"
          description="Choose how you want to give: copy the address or scan the QR, or connect your wallet and sign the transfer yourself."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <DonationPanel />
          <SendCard />
        </div>
      </Section>

      {/* Allocation / goal */}
      <Section background="green" className="text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-tawf-gold"></div>
            <span className="label-caps text-tawf-gold">Allocation</span>
            <div className="h-px w-12 bg-tawf-gold"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Every unit reaches the field</h2>
          <p className="text-tawf-sand/80 text-xl leading-relaxed mb-10">
            The shared multisig is used solely for emergency aid: shelter, clean water, and food for
            flood- and cyclone-affected families in NTT. Distribution is documented and verifiable
            on-chain.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {RELIEF_AREAS.map((a) => (
              <div key={a.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {a.icon}
                </div>
                <h3 className="font-serif text-lg text-white">{a.title}</h3>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-tawf-sand/50 italic">
            Figures on this page are illustrative until live distribution data is wired in.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" background="white" className="border-t border-tawf-green/10">
        <SectionHeader
          badge="FAQ"
          title="Before you send"
          description="A few practical answers about donating crypto to NTT relief."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-tawf-green/10 bg-tawf-sand/30 p-6"
            >
              <summary className="flex items-center justify-between cursor-pointer font-serif text-xl text-tawf-green list-none">
                {f.q}
                <ArrowDown className="h-5 w-5 text-tawf-gold shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-tawf-muted leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://tawf.foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-tawf-green text-tawf-green px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase hover:bg-tawf-green hover:text-tawf-sand transition-colors"
          >
            Tawf Islamic Foundation
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => scrollTo('donate')}
            className="inline-flex items-center gap-2 bg-tawf-gold text-tawf-green px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase hover:bg-white transition-colors"
          >
            <HeartHandshake className="w-4 h-4" />
            Donate now
          </button>
        </div>
      </Section>
    </>
  );
}
