import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, PiggyBank, Globe, ArrowRight, Plus, Minus } from 'lucide-react';
import { features, steps, faqs } from '../data.js';

const icons = { Zap, Shield, PiggyBank, Globe };
const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Features() {
  const [open, setOpen] = useState(0);

  return (
    <motion.div {...page} className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-mint">How it works</p>
      <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
        Set up once. Get paid, sorted, forever.
      </h1>

      {/* Steps */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-pale/10 bg-forest/30 p-8"
          >
            <span className="font-mono text-mint">{s.n}</span>
            <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-pale/60">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Feature detail */}
      <div className="mt-24 grid gap-6 sm:grid-cols-2">
        {features.map((f) => {
          const Icon = icons[f.icon] || Zap;
          return (
            <div key={f.title} className="flex gap-5 rounded-2xl border border-pale/10 bg-forest/20 p-7">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-mint/15 text-mint">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-1 text-pale/60">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mt-24 grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-3xl font-extrabold md:text-4xl">Questions, answered.</h2>
        <div className="divide-y divide-pale/10 border-y border-pale/10">
          {faqs.map((f, i) => (
            <div key={f.q} className="py-5">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between text-left">
                <span className="text-lg font-semibold">{f.q}</span>
                {open === i ? <Minus className="h-5 w-5 flex-none text-mint" /> : <Plus className="h-5 w-5 flex-none text-mint" />}
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="pt-3 text-pale/60">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 rounded-3xl border border-mint/30 bg-gradient-to-br from-mint/15 to-transparent p-10 text-center md:p-16">
        <h2 className="text-3xl font-extrabold md:text-5xl">Ready when you are.</h2>
        <p className="mx-auto mt-4 max-w-md text-pale/60">Join the waitlist and lock in founding-member perks.</p>
        <Link to="/waitlist" data-cursor="Join" className="mt-8 inline-flex items-center gap-2 rounded-full bg-mint px-8 py-3.5 font-semibold text-ink transition-transform hover:scale-[1.03]">
          Join the waitlist <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
