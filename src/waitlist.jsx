import { createContext, useContext, useState, useCallback } from 'react';

const Ctx = createContext(null);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistProvider({ children }) {
  const [joined, setJoined] = useState(false);
  const [position, setPosition] = useState(0);
  const [email, setEmail] = useState('');

  const join = useCallback((value) => {
    if (!EMAIL_RE.test(String(value).trim())) return false;
    setEmail(value.trim());
    setPosition(1200 + Math.floor(Math.random() * 800));
    setJoined(true);
    return true;
  }, []);

  return <Ctx.Provider value={{ joined, position, email, join }}>{children}</Ctx.Provider>;
}

export function useWaitlist() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useWaitlist must be inside WaitlistProvider');
  return ctx;
}
