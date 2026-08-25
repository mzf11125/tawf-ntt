import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PARTNER } from '../lib/config';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-tawf-sand">
      <header>
        <nav
          className="fixed top-0 left-0 right-0 z-50 bg-tawf-sand/90 backdrop-blur-md border-b border-tawf-green/10"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="https://tawf.foundation" aria-label="Tawf Islamic Foundation home">
                <img
                  src="/images/tawftransparent.png"
                  alt="Tawf Islamic Foundation"
                  className="pt-1 h-14 w-auto invert"
                />
              </a>
              <span className="hidden sm:block h-8 w-px bg-tawf-green/20" aria-hidden="true"></span>
              <img
                src={PARTNER.logo}
                alt={PARTNER.name}
                title={`In partnership with ${PARTNER.name}`}
                className="hidden sm:block h-7 w-auto invert"
              />
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollTo('case')}
                className="text-sm font-medium tracking-widest uppercase text-tawf-ink/70 hover:text-tawf-green transition-colors"
              >
                The Case
              </button>
              <button
                onClick={() => scrollTo('transparency')}
                className="text-sm font-medium tracking-widest uppercase text-tawf-ink/70 hover:text-tawf-green transition-colors"
              >
                Transparency
              </button>
              <button
                onClick={() => scrollTo('faq')}
                className="text-sm font-medium tracking-widest uppercase text-tawf-ink/70 hover:text-tawf-green transition-colors"
              >
                FAQ
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => scrollTo('donate')}
                className="flex items-center gap-2 bg-tawf-green text-tawf-sand px-6 py-2.5 rounded-full text-sm font-medium tracking-widest uppercase hover:bg-tawf-green-light transition-colors"
              >
                Donate Crypto
              </button>
            </div>

            <button
              className="md:hidden p-3 text-tawf-green min-h-[48px] min-w-[48px] flex items-center justify-center"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {open && (
            <div className="md:hidden border-t border-tawf-green/10 bg-white px-6 py-4 space-y-1">
              {[
                ['The Case', 'case'],
                ['Transparency', 'transparency'],
                ['FAQ', 'faq'],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => {
                    setOpen(false);
                    scrollTo(id);
                  }}
                  className="block w-full text-left text-sm font-medium tracking-widest uppercase text-tawf-ink/70 hover:text-tawf-green py-3"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  scrollTo('donate');
                }}
                className="mt-2 w-full bg-tawf-green text-tawf-sand px-6 py-3 rounded-full text-sm font-medium tracking-widest uppercase text-center"
              >
                Donate Crypto
              </button>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow pt-20" id="main-content" role="main">
        {children}
      </main>

      <footer className="bg-tawf-ink text-white/60 py-16 border-t border-white/10" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <img
              src="/images/tawftransparent.png"
              alt="Tawf Islamic Foundation"
              className="-ml-3 h-20 w-auto mb-2"
            />
            <img
              src={PARTNER.logo}
              alt={PARTNER.name}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm max-w-sm leading-relaxed">
              The NTT Emergency Relief is a joint initiative of Tawf Islamic Foundation and Telaga
              Charity, run through a shared on-chain multisig.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium tracking-widest uppercase text-xs mb-6">
              Foundation
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="https://tawf.foundation" className="hover:text-tawf-gold transition-colors">
                  Tawf Islamic Foundation
                </a>
              </li>
              <li>
                <a
                  href="https://tawf.foundation/about"
                  className="hover:text-tawf-gold transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tawf-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tawf-gold transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium tracking-widest uppercase text-xs mb-6">
              Programs
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="https://zakat.tawf.foundation"
                  className="hover:text-tawf-gold transition-colors"
                >
                  Zakat
                </a>
              </li>
              <li>
                <a
                  href="https://waqf.tawf.foundation"
                  className="hover:text-tawf-gold transition-colors"
                >
                  Cash Waqf
                </a>
              </li>
              <li>
                <a
                  href="https://qurban.tawf.foundation"
                  className="hover:text-tawf-gold transition-colors"
                >
                  Qurban
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
          <p>
            &copy; {new Date().getFullYear()} Tawf Islamic Foundation &amp; Telaga Charity. All
            rights reserved.
          </p>
          <p className="max-w-md text-center md:text-right">
            Crypto donations are sent directly to the shared multisig and recorded on-chain. Not tax
            or financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
