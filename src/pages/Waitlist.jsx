import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Gift } from 'lucide-react';
import { perks, stats } from '../data.js';
import { useWaitlist } from '../waitlist.jsx';

const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Waitlist() {
  const { joined, position, email, join } = useWaitlist();
  const [value, setValue] = useState('');
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!join(value)) {
      setErr('Enter a valid email address.');
      return;
    }
    setErr('');
  };

  return (
    <motion.div {...page} className="relative z-10 mx-auto max-w-4xl px-6 py-16 md:py-24">
      <div className="text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 text-sm text-mint">
          <span className="h-2 w-2 rounded-full bg-mint" /> 12,000+ already in line
        </div>
        <h1 className="mx-auto max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          {joined ? "You're on the list." : 'Be first through the door.'}
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-pale/60">
          {joined
            ? 'Refer friends to move up the line and unlock founding-member perks.'
            : 'Join the waitlist to reserve your spot and lock in perks that disappear at launch.'}
        </p>
      </div>

      {joined ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto mt-10 max-w-md rounded-3xl border border-mint/30 bg-forest/40 p-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-mint text-ink">
            <Check className="h-7 w-7" />
          </div>
          <p className="text-pale/60">Your position</p>
          <p className="font-mono text-5xl font-extrabold text-mint">#{position.toLocaleString()}</p>
          <p className="mt-2 text-sm text-pale/50">{email}</p>
          <div className="mt-6 rounded-xl bg-mint/10 p-3 text-sm text-pale/70">
            Share your link — you jump 20 spots per friend who joins. (Demo: sharing is illustrative.)
          </div>
        </motion.div>
      ) : (
        <form onSubmit={submit} noValidate className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setErr('');
            }}
            maxLength={120}
            placeholder="you@email.com"
            className="l-input flex-1"
          />
          <button data-cursor="Join" className="flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-3.5 font-semibold text-ink transition-transform hover:scale-[1.02]">
            Join <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}
      {err && <p className="mt-2 text-center text-sm text-mint">{err}</p>}

      {/* Perks */}
      <div className="mt-20">
        <div className="mb-8 flex items-center gap-2 text-mint">
          <Gift className="h-5 w-5" />
          <h2 className="text-xl font-bold text-pale">Founding-member perks</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {perks.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-3 rounded-2xl border border-pale/10 bg-forest/20 p-5"
            >
              <Check className="h-5 w-5 flex-none text-mint" />
              <span className="text-pale/80">{p}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-8 rounded-3xl border border-pale/10 bg-forest/20 p-8 md:grid-cols-4">
        {stats.map(([v, l]) => (
          <div key={l} className="text-center">
            <div className="text-3xl font-extrabold text-mint">{v}</div>
            <div className="mt-1 text-sm text-pale/50">{l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
