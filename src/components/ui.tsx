import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

type ButtonVariant = 'primary' | 'secondary' | 'gold';
type ButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 inline-flex items-center justify-center gap-2';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-tawf-green text-tawf-sand hover:bg-tawf-green-light',
  secondary: 'border border-tawf-green text-tawf-green hover:bg-tawf-green hover:text-tawf-sand',
  gold: 'bg-tawf-gold text-tawf-green hover:bg-white',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-6 py-2.5',
  md: 'px-8 py-4',
  lg: 'px-10 py-5',
};

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled,
  type = 'button',
  target,
  rel,
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim();
  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

type Background = 'sand' | 'white' | 'ink' | 'green';

const BG: Record<Background, string> = {
  sand: 'bg-tawf-sand',
  white: 'bg-white',
  ink: 'bg-tawf-ink',
  green: 'bg-tawf-green',
};

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: Background;
  id?: string;
}

export function Section({ children, className = '', background = 'sand', id }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 px-6 ${BG[background]} ${className}`.trim()}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeader                                                       */
/* ------------------------------------------------------------------ */

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  badge,
  title,
  description,
  centered = true,
  className = '',
  dark = false,
}: SectionHeaderProps) {
  const container = centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl';
  const titleColor = dark ? 'text-white' : 'text-tawf-green';
  const descColor = dark ? 'text-tawf-sand/70' : 'text-tawf-muted';
  return (
    <div className={`${container} mb-16 ${className}`.trim()}>
      {badge && (
        <div className={`flex items-center gap-3 mb-8 ${centered ? 'justify-center' : ''}`}>
          <div className="h-px w-12 bg-tawf-gold"></div>
          <span className="label-caps text-tawf-gold">{badge}</span>
          <div className="h-px w-12 bg-tawf-gold"></div>
        </div>
      )}
      <h2 className={`text-4xl md:text-5xl font-light ${titleColor} mb-6`}>{title}</h2>
      {description && <p className={`${descColor} text-xl leading-relaxed`}>{description}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card & Badge                                                        */
/* ------------------------------------------------------------------ */

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-tawf-green/10 bg-white p-6 md:p-8 ${className}`.trim()}>
      {children}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold tracking-wider uppercase bg-tawf-sand/70 text-tawf-green px-3 py-1 rounded-full border border-tawf-green/10">
      {children}
    </span>
  );
}
