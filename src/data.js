// Lumen — mock content (fictional neobank).

export const features = [
  { icon: 'Zap', title: 'Get paid 2 days faster', desc: 'Early direct deposit puts your money in your account the moment it lands.' },
  { icon: 'PiggyBank', title: 'No monthly fees', desc: 'No minimums, no maintenance fees, no surprises. Ever.' },
  { icon: 'Shield', title: 'Bank-grade security', desc: '256-bit encryption, biometric login, and instant card freeze.' },
  { icon: 'Globe', title: 'Spend anywhere', desc: 'Zero foreign transaction fees in 150+ countries.' },
];

export const txns = [
  { name: 'Stripe payout', amt: '+$2,400.00', pos: true },
  { name: 'Adobe CC', amt: '-$54.99', pos: false },
  { name: 'Client — Meridian', amt: '+$1,800.00', pos: true },
];

export const stats = [
  ['12,000+', 'On the waitlist'],
  ['$0', 'Monthly fees'],
  ['2 days', 'Faster payouts'],
  ['150+', 'Countries'],
];

export const steps = [
  { n: '01', title: 'Join in 2 minutes', desc: 'Apply from your phone — no branch, no paperwork, no credit pull to see if you qualify.' },
  { n: '02', title: 'Connect your income', desc: 'Link Stripe, PayPal, or direct deposit and Lumen fronts you payouts up to two days early.' },
  { n: '03', title: 'Spend and set aside', desc: 'Auto-split every payment into taxes, savings and spend so you never scramble in April.' },
];

export const perks = [
  'Skip the line for every 3 friends who join',
  'Founding-member metal card',
  'Locked-in 0% foreign fees for life',
  'Priority access to the tax vault beta',
];

export const faqs = [
  { q: 'Is Lumen a real bank?', a: 'This is a portfolio case study — Lumen is a fictional product built to demonstrate a fintech launch experience. No real accounts, money or data are involved.' },
  { q: 'How do faster payouts work?', a: 'In the concept, Lumen advances funds from connected processors up to two days before they clear, at no cost to members.' },
  { q: 'What does it cost?', a: 'The concept is fee-free: no monthly fee, no minimum balance, no foreign transaction fees.' },
  { q: 'When does it launch?', a: 'The fictional launch window is Q3 2026 — the waitlist here demonstrates the referral-position flow.' },
];
