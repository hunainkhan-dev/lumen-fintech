import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col items-center justify-between gap-6 border-t border-pale/10 pt-10 md:flex-row">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mint text-ink">
            <Zap className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold">Lumen</span>
        </Link>
        <p className="text-sm text-pale/40">Portfolio case study · Lumen is a fictional product</p>
        <div className="flex gap-6 text-sm text-pale/60">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-pale">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pale">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
