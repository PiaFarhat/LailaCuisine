"use client";

import { Button } from "@material-tailwind/react";

export default function MaterialTailwindCheck() {
  return (
    <section
      aria-labelledby="material-tailwind-check-title"
      className="mx-auto my-10 max-w-xl border border-[rgba(198,161,91,0.42)] bg-[rgba(255,253,248,0.74)] p-5 text-center shadow-[0_18px_45px_rgba(77,16,39,0.08)]"
    >
      <p
        id="material-tailwind-check-title"
        className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--olive)]"
      >
        Material Tailwind verification
      </p>
      <Button
        type="button"
        ripple={false}
        className="rounded-none border border-[var(--gold)] bg-[var(--burgundy)] px-5 py-3 font-serif text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[var(--ivory)] shadow-[0_10px_24px_rgba(77,16,39,0.16)]"
      >
        Component Loaded
      </Button>
    </section>
  );
}
