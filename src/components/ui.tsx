import type { ReactNode } from 'react';

export function SectionCard(props: { angka: string; judul: string; deskripsi?: string; children: ReactNode }) {
  return (
    <section className="paper-card rounded-lg p-5 sm:p-7">
      <div className="mb-5 flex items-start gap-4 border-b border-[var(--rule)] pb-4">
        <span className="roman-badge grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[var(--primary)] text-lg text-[var(--primary)]">
          {props.angka}
        </span>
        <div>
          <h2 className="font-display text-xl text-[var(--primary)]">{props.judul}</h2>
          {props.deskripsi && <p className="mt-0.5 text-sm text-[var(--ink-soft)]">{props.deskripsi}</p>}
        </div>
      </div>
      {props.children}
    </section>
  );
}

export function HeaderCard(props: { judul: string; deskripsi?: string; children: ReactNode }) {
  return (
    <section className="paper-card rounded-lg p-5 sm:p-7">
      <div className="mb-5 border-b border-[var(--rule)] pb-4">
        <h2 className="font-display text-xl text-[var(--primary)]">{props.judul}</h2>
        {props.deskripsi && <p className="mt-0.5 text-sm text-[var(--ink-soft)]">{props.deskripsi}</p>}
      </div>
      {props.children}
    </section>
  );
}

export function Field(props: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${props.className ?? ''}`}>
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]">
        {props.label}
      </span>
      {props.children}
      {props.hint && <span className="mt-1 block text-xs text-[var(--ink-soft)]">{props.hint}</span>}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return <input type="text" className={`field-line ${className ?? ''}`} {...rest} />;
}

export function NumberInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return <input type="number" inputMode="numeric" className={`field-line ${className ?? ''}`} {...rest} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return <textarea className={`field-line ${className ?? ''}`} {...rest} />;
}

export function ChoiceGroup<T extends string>(props: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={props.className}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]">
        {props.label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {props.options.map((opt) => (
          <button
            type="button"
            key={opt}
            data-active={props.value === opt}
            onClick={() => props.onChange(opt)}
            className="chip rounded-full px-3 py-1 text-sm transition-colors"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function GhostButton(props: {
  onClick: () => void;
  children: ReactNode;
  danger?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
        props.danger
          ? 'border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger-tint)]'
          : 'border-[var(--rule)] text-[var(--ink-soft)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
      } ${props.className ?? ''}`}
    >
      {props.children}
    </button>
  );
}

export function PrimaryButton(props: {
  onClick?: () => void;
  type?: 'button' | 'submit';
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[#fffdf7] transition-colors hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-50 ${props.className ?? ''}`}
    >
      {props.children}
    </button>
  );
}

export function Modal(props: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(28,43,39,0.4)] p-4"
      onClick={props.onClose}
    >
      <div className="paper-card w-full max-w-sm rounded-lg p-5" onClick={(e) => e.stopPropagation()}>
        <h3 className="mb-3 font-display text-lg text-[var(--primary)]">{props.title}</h3>
        {props.children}
      </div>
    </div>
  );
}
