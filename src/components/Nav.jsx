import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/waitlist', label: 'Waitlist' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" data-cursor="Home" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mint text-ink">
            <Zap className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold">Lumen</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-pale/60 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={pathname === l.to ? 'text-pale' : 'hover:text-pale'}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/waitlist" data-cursor="Join" className="hidden rounded-full bg-mint px-5 py-2 text-sm font-semibold text-ink md:inline-block">
            Join waitlist
          </Link>
          <button onClick={() => setMenu((v) => !v)} className="md:hidden" aria-label="Menu">
            {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-6 overflow-hidden rounded-2xl border border-pale/10 bg-forest/80 backdrop-blur md:hidden"
          >
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="block px-6 py-3.5 text-lg">
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
