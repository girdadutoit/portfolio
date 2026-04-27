/* global React, ReactDOM, MarketingPage, TenantApp, LandlordApp, SignInPage, SignUpPage,
   ForTenantsPage, ForLandlordsPage, HowItWorksPage, PricingPage,
   AboutPage, ContactPage, HelpPage, LegalPage, ApplyFlow, ApplyIndex, ApplyMobilePage,
   NavCtx, Icon, Logo, Footer, A11yPanel */
const { useState, useEffect, useMemo } = React;

// ===== Tiny hash router =====
const parseHash = () => {
  const h = window.location.hash.replace(/^#/, '') || '/';
  return h.startsWith('/') ? h : '/' + h;
};



// ===== Tweaks panel =====
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 185,
  "glass": 24,
  "radius": 24,
  "serifHeadings": true
}/*EDITMODE-END*/;

const TweaksPanel = ({ state, setState, onClose }) => {
  const update = (k, v) => {
    setState(s => ({ ...s, [k]: v }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };
  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, zIndex: 100,
      width: 300, padding: 20, borderRadius: 22,
      background: 'color-mix(in oklab, white 90%, transparent)',
      backdropFilter: 'blur(24px) saturate(1.4)',
      border: '1px solid var(--glass-border)',
      boxShadow: '0 30px 60px -20px oklch(0.3 0.1 30 / 0.3)',
      fontSize: 13,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Tweaks</div>
        <button onClick={onClose} style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--cream-2)', display: 'grid', placeItems: 'center' }}>
          <Icon name="x" size={12}/>
        </button>
      </div>

      {/* Hue */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: 'var(--ink-2)' }}>Accent hue</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{state.accentHue}°</span>
        </div>
        <input type="range" min="0" max="360" value={state.accentHue}
               onChange={e => update('accentHue', +e.target.value)}
               style={{ width: '100%', accentColor: `oklch(0.68 0.17 ${state.accentHue})` }}/>
        <div style={{
          height: 8, borderRadius: 99, marginTop: 6,
          background: 'linear-gradient(90deg, oklch(0.68 0.17 0), oklch(0.68 0.17 60), oklch(0.68 0.17 120), oklch(0.68 0.17 180), oklch(0.68 0.17 240), oklch(0.68 0.17 300), oklch(0.68 0.17 360))',
        }}/>
      </div>

      {/* Glass */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: 'var(--ink-2)' }}>Glass blur</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{state.glass}px</span>
        </div>
        <input type="range" min="0" max="40" value={state.glass} onChange={e => update('glass', +e.target.value)} style={{ width: '100%', accentColor: 'var(--coral-500)' }}/>
      </div>

      {/* Radius */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: 'var(--ink-2)' }}>Corner radius</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{state.radius}px</span>
        </div>
        <input type="range" min="4" max="40" value={state.radius} onChange={e => update('radius', +e.target.value)} style={{ width: '100%', accentColor: 'var(--coral-500)' }}/>
      </div>

      {/* Serif */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--ink-2)' }}>Serif headings</span>
        <button onClick={() => update('serifHeadings', !state.serifHeadings)}
                style={{ width: 38, height: 22, borderRadius: 99, background: state.serifHeadings ? 'var(--coral-500)' : 'var(--ink-4)', position: 'relative' }}>
          <span style={{ position: 'absolute', top: 3, left: state.serifHeadings ? 19 : 3, width: 16, height: 16, borderRadius: 99, background: 'white', transition: 'left .15s' }}/>
        </button>
      </div>

      <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line)', fontSize: 11, color: 'var(--ink-3)' }}>
        Changes persist across reloads.
      </div>
    </div>
  );
};

// ===== Route history (for back button) =====
// We track our own stack because hashchange doesn't tell us direction.
// Each navigation pushes; "back" pops one and replaces the hash.
const ROUTE_HISTORY = [];

// ===== App root =====
const App = () => {
  const [route, setRoute] = useState(parseHash());
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // Apply tweaks to :root
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--coral-400', `oklch(0.75 0.14 ${tweaks.accentHue})`);
    r.setProperty('--coral-500', `oklch(0.68 0.17 ${tweaks.accentHue - 2})`);
    r.setProperty('--coral-600', `oklch(0.60 0.18 ${tweaks.accentHue - 4})`);
    r.setProperty('--coral-700', `oklch(0.50 0.16 ${tweaks.accentHue - 4})`);
    r.setProperty('--coral-800', `oklch(0.38 0.12 ${tweaks.accentHue})`);
    r.setProperty('--coral-100', `oklch(0.95 0.04 ${tweaks.accentHue + 5})`);
    r.setProperty('--coral-200', `oklch(0.89 0.075 ${tweaks.accentHue + 5})`);
    r.setProperty('--coral-50', `oklch(0.98 0.015 ${tweaks.accentHue})`);
    r.setProperty('--glass-blur', `${tweaks.glass}px`);
    r.setProperty('--r-lg', `${tweaks.radius}px`);
    r.setProperty('--r-md', `${tweaks.radius * 0.75}px`);
    r.setProperty('--r-xl', `${tweaks.radius * 1.3}px`);
    r.setProperty('--font-display', tweaks.serifHeadings ? `'Instrument Serif', 'Times New Roman', serif` : `'Inter Tight', 'Helvetica Neue', sans-serif`);
  }, [tweaks]);

  // Route listener
  useEffect(() => {
    const on = () => setRoute(parseHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [route]);

  // Tweak mode messaging
  useEffect(() => {
    const on = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', on);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', on);
  }, []);

  const go = (r) => {
    // Push current onto history stack before navigating away
    if (route && route !== r) ROUTE_HISTORY.push(route);
    window.location.hash = r;
  };

  // Smart back: pop our internal stack; fall back to a sensible parent route.
  const back = (fallback) => {
    if (ROUTE_HISTORY.length > 0) {
      const prev = ROUTE_HISTORY.pop();
      window.location.hash = prev;
      return;
    }
    // Inferred fallbacks based on current route depth
    if (fallback) { window.location.hash = fallback; return; }
    if (route.startsWith('/app/tenant')) { window.location.hash = '/app/tenant'; return; }
    if (route.startsWith('/app/landlord')) { window.location.hash = '/app/landlord'; return; }
    if (route.startsWith('/apply')) { window.location.hash = '/app/tenant'; return; }
    window.location.hash = '/';
  };

  const ctx = useMemo(() => ({ route, go, back }), [route]);

  const isApp = route.startsWith('/app/');
  let page;
  if (route === '/signup') page = <SignUpPage/>;
  else if (route === '/signin') page = <SignInPage/>;
  else if (route === '/for-tenants') page = <ForTenantsPage/>;
  else if (route === '/for-landlords') page = <ForLandlordsPage/>;
  else if (route === '/how-it-works') page = <HowItWorksPage/>;
  else if (route === '/pricing') page = <PricingPage/>;
  else if (route === '/about') page = <AboutPage/>;
  else if (route === '/contact') page = <ContactPage/>;
  else if (route === '/help') page = <HelpPage/>;
  else if (route === '/privacy') page = <LegalPage kind="privacy"/>;
  else if (route === '/terms') page = <LegalPage kind="terms"/>;
  else if (route === '/apply' || route === '/apply/') page = <ApplyIndex/>;
  else if (route.startsWith('/apply-mobile')) page = <ApplyMobilePage/>;
  else if (route.startsWith('/apply')) page = <ApplyFlow/>;
  else if (route.startsWith('/app/tenant')) page = <TenantApp/>;
  else if (route.startsWith('/app/landlord')) page = <LandlordApp/>;
  else page = <MarketingPage/>;

  return (
    <NavCtx.Provider value={ctx}>
      <main id="main">{page}</main>
      {tweaksOpen && <TweaksPanel state={tweaks} setState={setTweaks} onClose={() => setTweaksOpen(false)}/>}
      <A11yPanel/>
    </NavCtx.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
