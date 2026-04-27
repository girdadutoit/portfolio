/* global React */
// ===== Shared primitives =====
const { useState, useEffect, useMemo, useRef, createContext, useContext } = React;

// ===== Icons (lightweight inline SVG) =====
const Icon = ({ name, size = 18, stroke = 1.75, className = '', style = {} }) => {
  const s = size;
  const paths = {
    home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    bell: <><path d="M6 8a6 6 0 0112 0c0 7 3 7 3 9H3c0-2 3-2 3-9z" /><path d="M10 21a2 2 0 004 0" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    check: <><path d="M4 12l5 5L20 6" /></>,
    x: <><path d="M6 6l12 12M6 18L18 6" /></>,
    star: <><path d="M12 3l2.9 6 6.6.8-4.9 4.5 1.4 6.6L12 17.8 5.9 20.9 7.3 14.3 2.4 9.8 9 9z" /></>,
    shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /></>,
    spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></>,
    heart: <><path d="M12 21s-7-4.5-9-10a5 5 0 019-3 5 5 0 019 3c-2 5.5-9 10-9 10z" /></>,
    bookmark: <><path d="M6 3h12v18l-6-4-6 4z" /></>,
    image: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8.5" cy="10.5" r="1.5" /><path d="M21 17l-5-5-8 8" /></>,
    camera: <><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="4" /></>,
    arrowRight: <><path d="M5 12h14M13 5l7 7-7 7" /></>,
    arrowUpRight: <><path d="M7 17L17 7M9 7h8v8" /></>,
    arrowDown: <><path d="M12 5v14M5 12l7 7 7-7" /></>,
    message: <><path d="M4 5h16v12H9l-5 4z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>,
    pound: <><path d="M16 7a4 4 0 00-8 0v4H5h8m-8 0c0 4-2 5-2 5h14" /></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" /></>,
    key: <><circle cx="8" cy="15" r="4" /><path d="M10.5 12.5L20 3m-3 3l3 3M14 6l3 3" /></>,
    map: <><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" /><path d="M9 3v15M15 6v15" /></>,
    filter: <><path d="M3 5h18M6 12h12M10 19h4" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
    chevDown: <><path d="M6 9l6 6 6-6" /></>,
    chevRight: <><path d="M9 6l6 6-6 6" /></>,
    chevLeft: <><path d="M15 6l-6 6 6 6" /></>,
    sparkles: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" /></>,
    wrench: <><path d="M14.7 6.3a4 4 0 105.7 5.7L21 14l-5 5L3 6l3-3 3.6 3.6a4 4 0 005.1.7z" /></>,
    paint: <><rect x="3" y="3" width="18" height="8" rx="1" /><path d="M7 11v4h10v3a2 2 0 01-2 2h-2v3h-2v-3a2 2 0 01-2-2v-5" /></>,
    leaf: <><path d="M21 3c-10 0-16 6-16 14v3l3 1c8 0 14-6 14-16z" /><path d="M8 16c4-4 6-6 12-13" /></>,
    users: <><circle cx="9" cy="8" r="4" /><circle cx="17" cy="9" r="3" /><path d="M2 20c0-4 3-6 7-6s7 2 7 6M15 20c0-3 3-5 6-5" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></>,
    upload: <><path d="M12 16V4M6 10l6-6 6 6" /><path d="M4 20h16" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1A1.7 1.7 0 009 19.4a1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3h0A1.7 1.7 0 0010 3.1V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v0a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></>,
    logout: <><path d="M15 3h3a2 2 0 012 2v14a2 2 0 01-2 2h-3M9 12h12M16 7l5 5-5 5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    dot: <><circle cx="12" cy="12" r="3" /></>,
    bed: <><path d="M2 10V6M2 18h20M2 14h20v4M6 14a3 3 0 010-6h5a2 2 0 012 2v4" /></>,
    bath: <><path d="M4 11h16v4a3 3 0 01-3 3H7a3 3 0 01-3-3zM6 11V6a2 2 0 014 0M4 22l1-3M20 22l-1-3" /></>,
    ruler: <><path d="M21 6L6 21l-3-3L18 3z" /><path d="M7 9l2 2M10 6l2 2M13 15l2 2M16 12l2 2" /></>,
    flame: <><path d="M12 21a6 6 0 006-6c0-4-3-6-3-10 0 0-3 2-5 6-1 2-4 4-4 8a6 6 0 006 2z" /></>,
    wifi: <><path d="M2 9a15 15 0 0120 0M5 13a10 10 0 0114 0M8 17a5 5 0 018 0" /><circle cx="12" cy="20" r="1" /></>,
    dash: <><path d="M5 12h14" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" /></>,
    envelope: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" /></>,
    pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z" /></>,
    doc: <><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18" /></>
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
    className={className} style={{ flexShrink: 0, ...style }}>
      {paths[name]}
    </svg>);

};

// ===== Avatar (initials w/ gradient bg) =====
const Avatar = ({ name = 'AB', size = 40, src, hue = 30, style = {} }) => {
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  const bg = `linear-gradient(135deg, oklch(0.80 0.10 ${hue}), oklch(0.72 0.14 ${hue + 20}))`;
  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.38, background: src ? 'none' : bg, ...style }}>
      {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
    </div>);

};

// ===== Ring (compatibility / score donut, matches reference aesthetic) =====
const Ring = ({ value = 72, size = 120, label, color = 'coral', thickness = 12 }) => {
  const colors = {
    coral: 'var(--coral-500)',
    blue: 'var(--blue-500)',
    ink: 'var(--ink)',
    peach: 'oklch(0.75 0.13 55)'
  };
  const circ = 2 * Math.PI * 42;
  const dash = value / 100 * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.88 0.02 40)" strokeWidth={thickness} />
        <circle cx="50" cy="50" r="42" fill="none" stroke={colors[color]} strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dasharray .6s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: thickness + 4, gap: 6 }}>
        <div className="display" style={{ fontSize: size * 0.36, lineHeight: 0.95 }}>{value}</div>
        {label && <div style={{ fontSize: Math.max(10, Math.min(13, size * 0.10)), color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.1, maxWidth: '90%', fontWeight: 500 }}>{label}</div>}
      </div>
    </div>);

};

// ===== Placeholder image (with optional label) =====
const PhImg = ({ label = 'image', h = 180, hue = 30, style = {} }) =>
<div style={{
  height: h,
  borderRadius: 'var(--r-md)',
  background: `
      radial-gradient(400px 200px at 70% 20%, oklch(0.82 0.12 ${hue}) 0%, transparent 60%),
      radial-gradient(300px 200px at 20% 80%, oklch(0.86 0.09 ${hue + 20}) 0%, transparent 60%),
      linear-gradient(135deg, oklch(0.90 0.06 ${hue}), oklch(0.94 0.03 ${hue + 30}))`,
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid var(--line)',
  ...style
}}>
    <div style={{
    position: 'absolute', left: 10, bottom: 10,
    fontFamily: 'var(--font-mono)', fontSize: 10, color: 'oklch(0.3 0.05 30 / 0.6)',
    padding: '3px 8px', background: 'oklch(1 0 0 / 0.5)', borderRadius: 6, backdropFilter: 'blur(4px)'
  }}>{label}</div>
  </div>;


// ===== Logo =====
const Logo = ({ onClick, size = 22, invert = false }) =>
<button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 0 }}>
    <svg width={size + 4} height={size + 4} viewBox="0 0 28 28">
      <defs>
        <linearGradient id="lg-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.78 0.15 30)" />
          <stop offset="1" stopColor="oklch(0.65 0.17 28)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="26" height="26" rx="8" fill="url(#lg-g)" />
      <path d="M7 17 L7 12 L10 9 L10 19 L18 19 L18 13 L21 13 L21 21 L7 21 Z" fill="white" opacity="0.98" />
      <circle cx="20" cy="9" r="2.4" fill="white" />
    </svg>
    <span className="display" style={{ fontSize: size, color: invert ? 'white' : 'var(--ink)', letterSpacing: '-0.01em' }}>
      GoodLet
    </span>
  </button>;


// ===== Shared NavContext =====
const NavCtx = createContext({ go: () => {}, route: '/', back: () => {} });
const useNav = () => useContext(NavCtx);

// ===== BackButton =====
// Universal back button. Uses route history when available, otherwise the
// `fallback` prop (or sensible default inferred by App). Two visual variants:
//   <BackButton/>            — pill, sits inside content (default)
//   <BackButton variant="ghost"/>  — text + chevron, no background
//   <BackButton label="Listings"/> — custom label
const BackButton = ({ fallback, label = 'Back', variant = 'pill', style = {} }) => {
  const { back } = useContext(NavCtx);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontSize: 13, color: 'var(--ink-2)',
    cursor: 'pointer'
  };
  if (variant === 'ghost') {
    return (
      <button onClick={() => back(fallback)} aria-label={`Back to ${label}`} style={{ ...base, padding: '6px 0', ...style }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span>{label}</span>
      </button>);

  }
  return (
    <button onClick={() => back(fallback)} aria-label={`Back to ${label}`} style={{
      ...base,
      padding: '8px 14px 8px 10px',
      borderRadius: 999,
      background: 'white',
      border: '1px solid var(--line)',
      boxShadow: '0 1px 2px oklch(0.3 0.05 30 / 0.04)',
      ...style
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span>Back
</span>
    </button>);

};

// Export everything to window
Object.assign(window, { Icon, Avatar, Ring, PhImg, Logo, NavCtx, useNav, BackButton });