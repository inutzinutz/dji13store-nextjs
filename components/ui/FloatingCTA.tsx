'use client';

import { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);

  return (
    <div className="float-cta">
      {open && (
        <div className="flex flex-col gap-2 items-end">
          <a
            href="tel:+66894500055"
            className="flex items-center gap-2.5 bg-card text-foreground shadow-xl border border-border px-4 py-2.5 rounded-2xl text-sm font-semibold hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            <span className="w-7 h-7 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Phone size={13} className="text-primary" />
            </span>
            089-450-0055
          </a>
          <a
            href="tel:+66656946155"
            className="flex items-center gap-2.5 bg-card text-foreground shadow-xl border border-border px-4 py-2.5 rounded-2xl text-sm font-semibold hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            <span className="w-7 h-7 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Phone size={13} className="text-primary" />
            </span>
            065-694-6155
          </a>
          <a
            href="https://line.me/ti/p/~@dji13store"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#06C755] text-white shadow-xl px-4 py-2.5 rounded-2xl text-sm font-semibold hover:bg-[#05b34d] hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            <MessageCircle size={15} />
            LINE: @dji13store
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-200 ${
          open
            ? 'bg-[hsl(222,47%,15%)] hover:bg-[hsl(220,35%,25%)] rotate-0'
            : 'bg-primary hover:bg-primary/90 hover:scale-105'
        }`}
        aria-label="ติดต่อเรา"
      >
        {open
          ? <X size={20} className="text-white" />
          : <Phone size={20} className="text-white" />
        }
      </button>
    </div>
  );
}
