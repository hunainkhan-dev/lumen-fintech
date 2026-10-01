import { lazy, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap, Shield, PiggyBank, Globe, ArrowRight, Check } from 'lucide-react';
import { features, txns, stats } from '../data.js';
import { useWaitlist } from '../waitlist.jsx';

const Card3D = lazy(() => import('../three/Card3D.jsx'));
const icons = { Zap, Shield, PiggyBank, Globe };

const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function Home() {
  const reduced = useReducedMotion();
  const { joined, position, join } = useWaitlist();
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = requestAnimationFrame(() => setShow3D(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  const submit = (e) => {
    e.preventDefault();
    if (!join(email)) {
      setErr('Enter a valid email.');
      return;
    }
    setErr('');
  };

  return (
    <motion.div {...page}>
      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-12 md:grid-cols-2 md:py-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 text-sm text-mint"
          >
            <span className="h-2 w-2 rounded-full bg-mint" /> Launching Q3 2026
          </motion.div>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Banking built for <span className="text-mint">the way you work.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-pale/60">
            Lumen is the account for freelancers and creators. Get paid faster, keep more of what you
            earn, and see exactly where it goes.
          </p>

          {joined ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-2xl border border-mint/30 bg-mint/10 p-5">
              <p className="flex items-center gap-2 font-semibold text-mint">
                <Check className="h-5 w-5" /> You're #{position.toLocaleString()} in line.
              </p>
              <Link to="/waitlist" data-cursor="Perks" className="mt-2 inline-block text-sm text-pale/70 underline">
                See your referral perks →
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
          {err && <p className="mt-2 text-sm text-mint">{err}</p>}
        </div>

        {/* 3D card + txn mockup */}
        <div className="relative h-[380px]">
          {show3D && !reduced ? (
            <Suspense fallback={null}>
              <Card3D />
            </Suspense>
          ) : (
            <div className="mx-auto aspect-[1.6/1] w-full max-w-sm rotate-[-6deg] rounded-2xl bg-gradient-to-br from-mint to-emerald-700 p-6 text-ink shadow-2xl shadow-mint/20">
              <div className="flex justify-between">
                <span className="font-bold">Lumen</span>
                <Zap className="h-6 w-6" />
              </div>
              <div className="mt-10 font-mono text-xl tracking-widest">•••• •••• •••• 2408</div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -bottom-2 right-0 z-20 w-full max-w-[16rem] rounded-2xl border border-pale/10 bg-forest/70 p-5 backdrop-blur-xl"
          >
            <p className="mb-3 text-xs text-pale/50">Recent activity</p>
            <div className="space-y-3">
              {txns.map((t) => (
                <div key={t.name} className="flex items-center justify-between text-sm">
                  <span className="text-pale/80">{t.name}</span>
                  <span className={t.pos ? 'text-mint' : 'text-pale/50'}>{t.amt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features preview */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl text-4xl font-extrabold tracking-tight md:text-5xl">Everything a modern earner needs.</h2>
          <Link to="/features" data-cursor="More" className="text-sm text-mint underline">
            See how it works →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = icons[f.icon] || Zap;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="rounded-2xl border border-pale/10 bg-forest/30 p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-mint/15 text-mint">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
                <p className="text-pale/60">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 border-y border-pale/10 bg-forest/20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
          {stats.map(([v, l]) => (
            <div key={l}>
              <div className="text-4xl font-extrabold text-mint">{v}</div>
              <div className="mt-1 text-sm text-pale/50">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
